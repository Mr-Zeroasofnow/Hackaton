document.getElementById('send-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        addMessageToChatBox('You', userInput);
        document.getElementById('user-input').value = '';
        fetchResponse(userInput);
    }
});

function addMessageToChatBox(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function fetchResponse(userInput) {
    fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => addMessageToChatBox('Bot', data.response))
    .catch(error => console.error('Error:', error));
}
