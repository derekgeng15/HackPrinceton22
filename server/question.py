#generates random question to send
import requests
import random
BASE = 'http://127.0.0.1:5000/'


questionList = ['What is something you are looking forward to this week?',
                'How are you doing today?',
                'Is there something bothering you today']
requests.post(BASE + '/' + 'question', json={'question' : random.choice(questionList)})
