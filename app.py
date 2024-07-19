from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

app = Flask(__name__)

# Load pre-trained model and tokenizer
model_name = "gpt2"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data['message']
    
    # Tokenize input and generate response
    inputs = tokenizer.encode(user_message, return_tensors='pt')
    outputs = model.generate(inputs, max_length=100, num_return_sequences=1, pad_token_id=tokenizer.eos_token_id)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
