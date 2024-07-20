from flask import Flask, request, jsonify, send_from_directory
import json
import os
import random
from fuzzywuzzy import process

app = Flask(__name__)

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
    Match user input with the patterns in intents and return the corresponding tag using fuzzy matching.
    """
    user_input = user_input.lower()
    patterns = [pattern.lower() for intent in intents.get('intents', []) for pattern in intent.get('patterns', [])]
    
    # Use fuzzy matching to find the closest pattern
    best_match, score = process.extractOne(user_input, patterns)
    
    # Debugging print statements
    print(f"User input: {user_input}")
    print(f"Best match: {best_match} with score: {score}")

    # If the best match score is above a certain threshold (e.g., 80), return the corresponding intent
    if score >= 80:
        for intent in intents.get('intents', []):
            if best_match in (pattern.lower() for pattern in intent.get('patterns', [])):
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
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(debug=True)
