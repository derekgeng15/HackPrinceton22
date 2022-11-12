from enum import Enum
import json
import requests

class POSTTYPE(Enum):
    NEW = 1
    UPD = 2

BASE = 'http://127.0.0.1:5000/'

data = {'Derek': {'type': "New User", 'username' : 'Derek', 'mood': 3},
        'Charles': {'type': "New User", 'username' : 'Charles', 'mood': 3},
        'Nick' : {'type' : "New User", 'username' : 'Nick', 'mood': 3},
        'Emily' : {'type' : "New User", 'username' : 'Emily', 'mood': 0}}
for key, value in data.items():
    print(requests.post(BASE + 'database/' + key, json=value).json())

print(requests.post(BASE + 'database/' + 'Derek', json={'type':'Change Mood', 'mood' : 5}))