document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chatWidget');
    const chatMinimized = document.getElementById('chatMinimized');
    const chatBody = document.getElementById('chatBody');
    const messages = document.getElementById('messages');
    const userInput = document.getElementById('userInput');
    const toggleIcon = document.getElementById('toggle-icon');

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        displayMessage(userMessage, 'user');
        userInput.value = '';

        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_input: userMessage }),
        })
        .then(response => response.json())
        .then(data => {
            const botMessage = data.response;
            displayMessage(botMessage, 'bot');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        messageElement.textContent = message;
        messages.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    window.sendMessage = sendMessage;

    window.checkEnter = function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    window.toggleChat = function() {
        if (chatWidget.style.display === 'none' || chatWidget.style.display === '') {
            chatWidget.style.display = 'flex';
            chatMinimized.style.display = 'none';
            toggleIcon.className = 'fas fa-compress';
        } else if (chatWidget.classList.contains('minimized')) {
            chatWidget.classList.remove('minimized');
            chatWidget.style.height = '400px';
            chatWidget.style.width = '300px';
            toggleIcon.className = 'fas fa-compress';
        } else if (chatWidget.classList.contains('fullscreen')) {
            chatWidget.classList.remove('fullscreen');
            chatWidget.style.height = '400px';
            chatWidget.style.width = '300px';
            toggleIcon.className = 'fas fa-expand';
        } else {
            chatWidget.classList.add('fullscreen');
            chatWidget.style.height = '100%';
            chatWidget.style.width = '100%';
            toggleIcon.className = 'fas fa-compress';
        }
    };
});
