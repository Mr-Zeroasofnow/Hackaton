document.addEventListener('DOMContentLoaded', function() {
  const chatWidget = document.getElementById('chatWidget');
  const chatBody = document.getElementById('chatBody');
  const messages = document.getElementById('messages');
  const userInput = document.getElementById('userInput');

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
      chatWidget.classList.toggle('fullscreen');
  };
});
