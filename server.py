from flask import Flask, request, jsonify
import json
import random
import re

app = Flask(__name__)

# Load intents data
with open('intents.json') as file:
    intents = json.load(file)

def get_intent(user_input):
    """
    Match user input with the patterns in intents and return the corresponding tag.
    """
    user_input = user_input.lower()
    for intent in intents['intents']:
        for pattern in intent['patterns']:
            if re.search(pattern.lower(), user_input):
                return intent['tag']
    return "noanswer"

def get_response(intent_tag):
    """
    Get a random response for the given intent tag.
    """
    for intent in intents['intents']:
        if intent['tag'] == intent_tag:
            return random.choice(intent['responses'])
    return "Sorry, I don't understand."

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get('user_input', '')
    intent_tag = get_intent(user_input)
    response = get_response(intent_tag)
    return jsonify({'response': response})

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)
