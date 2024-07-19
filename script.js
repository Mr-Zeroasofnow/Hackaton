document.getElementById('open-chatbot').addEventListener('click', () => {
  document.getElementById('chat-container').classList.add('active');
  document.getElementById('open-chatbot').style.display = 'none';
});

document.getElementById('send-button').addEventListener('click', async () => {
  const userInput = document.getElementById('user-input').value;
  if (!userInput) return;

  appendMessage(userInput, 'user-message');
  document.getElementById('user-input').value = '';

  const botResponse = await getBotResponse(userInput);
  appendMessage(botResponse, 'bot-message');
});

async function getBotResponse(userInput) {
  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_input: userInput })
    });
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    return 'Sorry, something went wrong. Please try again later.';
  }
}

function appendMessage(text, className) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${className}`;
  messageElement.textContent = text;
  document.getElementById('chat-window').appendChild(messageElement);
}

document.getElementById('fullscreen-toggle').addEventListener('click', () => {
  const chatContainer = document.getElementById('chat-container');
  if (chatContainer.classList.contains('fullscreen')) {
    chatContainer.classList.remove('fullscreen');
    document.getElementById('fullscreen-toggle').textContent = 'Expand';
  } else {
    chatContainer.classList.add('fullscreen');
    document.getElementById('fullscreen-toggle').textContent = 'Collapse';
  }
});
