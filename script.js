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
  
  function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput === '') return;
  
    appendMessage(userInput, 'user');
  
    document.getElementById('userInput').value = '';
  
    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      appendMessage(botResponse, 'bot');
    }, 500);
  }
  
  function checkEnter(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
  
  function appendMessage(text, type) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
  
    // Automatically scroll to the bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  
  function getBotResponse(input) {
    const responses = {
      "🔨 Build AI chatbot": "Here is information on building an AI chatbot...",
      "Using ChatBot 👉": "Learn how to use the ChatBot with these steps...",
      "I have questions 😊": "Feel free to ask any questions you have!",
      "Just browsing 👀": "No worries! Feel free to browse around."
    };
  
    input = input.toLowerCase();
  
    if (input.includes("hello") || input.includes("hi")) {
      return "Hello there! 👋 It's nice to meet you! What brings you here today?";
    } else if (input.includes("build") || input.includes("ai chatbot")) {
      return responses["🔨 Build AI chatbot"];
    } else if (input.includes("using")) {
      return responses["Using ChatBot 👉"];
    } else if (input.includes("questions")) {
      return responses["I have questions 😊"];
    } else if (input.includes("browsing")) {
      return responses["Just browsing 👀"];
    } else {
      return "Sorry, I did not understand that option.";
    }
  }
  
  document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const option = event.target.textContent.trim();
      appendMessage(option, 'user');
      const botResponse = getBotResponse(option);
      setTimeout(() => {
        appendMessage(botResponse, 'bot');
      }, 500);
    });
  });
