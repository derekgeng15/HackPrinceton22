import os
from flask import Flask, request, send_file
from werkzeug.utils import secure_filename
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'jtpdoerenjaraedsk'

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

socketio = SocketIO(app)
db = SQLAlchemy(app)

currQuestion = ""
class User(db.Model):
    username = db.Column(db.String(12), primary_key=True)
    mood = db.Column(db.Integer, primary_key=False)

    def __repr__(self):
        return f'"username": "{self.username}", "mood": "{self.mood}"'


with app.app_context():
    db.create_all()
post_parser = reqparse.RequestParser()

post_parser.add_argument(
    'type', type=str, help='No post type given', required=True)
post_parser.add_argument('name', type=str, help='No name given')
post_parser.add_argument('mood', type=int, help='No mood given')
post_parser.add_argument('question', type=str, help='No question given')

resource_fields = {
    'username': fields.String,
    'mood': fields.String
}


@socketio.on('send question')
def handle_my_custom_event(data):
    emit('my response', data, broadcast=True)


class DataBase(Resource):
    @marshal_with(resource_fields)
    def get(self, usn):
        result = User.query.filter_by(username=usn).first()
        if not result:
            abort(404, message='Address does not exists')
        return result

    @marshal_with(resource_fields)
    def post(self, usn):
        args = post_parser.parse_args()
        print(args)
        result = User.query.filter_by(username=usn).first()
        if args['type'] == "New User":
            if result:
                abort(409, message='user already exists')
            user = User(username=usn, mood=3)
            db.session.add(user)
            result = user
        if args['type'] == 'Change Mood':
            if not result:
                abort(404, message='user does not exists')
            result.mood = args['mood']
        db.session.commit()
        return result

    @marshal_with(resource_fields)
    def delete(self, usn):
        result = User.query.filter_by(username=usn).first()
        if not result:
            abort(404, message='user does not exists')
        db.session.delete(result)
        db.session.commit()


api.add_resource(DataBase, '/database/<string:usn>')


@app.route('/question', methods=['POST', 'GET'])
def question():
    global currQuestion
    if request.method == 'POST':
        data = request.get_json()
        currQuestion = data['question']
        socketio.emit('sending question', {'question': currQuestion})
        return data
    if request.method == 'GET':
        return {'question': currQuestion}

@app.route('/video/<string:usn>', methods=['POST', 'GET'])
def video(usn):
    if request.method == 'POST':
        if 'upload_file' not in request.files:
            abort(404, message='no file')
        file = request.files['upload_file']
        filename = secure_filename(usn)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        print('file saved')
        return request.get_json()
    if request.method == 'GET':
        if not os.path.exists('uploads/' + usn):
            abort(404, message='no file')
        try:
            return send_file('uploads/' + usn)
        except Exception as e:
            return str(e)


if __name__ == '__main__':
    socketio.run(app, debug=True)
