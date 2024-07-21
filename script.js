// Function to toggle chat widget visibility
function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatMinimized = document.getElementById('chatMinimized');

    if (chatWidget.style.display === 'none' || chatWidget.style.display === '') {
        chatWidget.style.display = 'flex';
        chatMinimized.style.display = 'none';
    } else {
        chatWidget.style.display = 'none';
        chatMinimized.style.display = 'flex';
    }
}

// Function to toggle fullscreen mode
function toggleFullscreen() {
    const chatWidget = document.getElementById('chatWidget');
    const toggleIcon = document.getElementById('toggle-icon');

    if (chatWidget.classList.contains('fullscreen')) {
        chatWidget.classList.remove('fullscreen');
        toggleIcon.classList.remove('fa-compress');
        toggleIcon.classList.add('fa-expand');
    } else {
        chatWidget.classList.add('fullscreen');
        toggleIcon.classList.remove('fa-expand');
        toggleIcon.classList.add('fa-compress');
    }
}

// Function to send a message
function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return; // Ignore empty messages

    // Add user message to chat
    const messages = document.getElementById('messages');
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.textContent = userInput;
    messages.appendChild(userMessage);

    // Clear the input field
    document.getElementById('userInput').value = '';

    // Simulate a response from the bot
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot');
        botMessage.textContent = data.response;
        messages.appendChild(botMessage);

        // Scroll to the bottom
        const chatBody = document.getElementById('chatBody');
        chatBody.scrollTop = chatBody.scrollHeight;
    })
    .catch(error => console.error('Error:', error));
}

// Function to check if Enter key is pressed
function checkEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents the default action
        sendMessage();
    }
}