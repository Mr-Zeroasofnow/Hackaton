from flask import Flask, request, jsonify, send_from_directory
import json
import random
import re
import os

app = Flask(__name__)

# Load intents data with error handling
def load_intents(filename='intents.json'):
    if not os.path.isfile(filename):
        raise FileNotFoundError(f"{filename} not found.")
    with open(filename) as file:
        return json.load(file)

try:
    intents = load_intents()
except FileNotFoundError as e:
    print(e)
    intents = {'intents': []}

def get_intent(user_input):
    """
    Match user input with the patterns in intents and return the corresponding tag.
    """
    user_input = user_input.lower()
    for intent in intents.get('intents', []):
        for pattern in intent.get('patterns', []):
            if re.search(re.escape(pattern.lower()), user_input):
                return intent['tag']
    return "noanswer"

def get_response(intent_tag):
    """
    Get a random response for the given intent tag.
    """
    for intent in intents.get('intents', []):
        if intent['tag'] == intent_tag:
            return random.choice(intent.get('responses', []))
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
    return send_from_directory('.', 'chatbot.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(debug=True)