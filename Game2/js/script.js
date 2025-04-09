const elements = [
    "dog", "123", "!", "Sun", "flower", "relationship", "car", "#", "love",
    "Moon", "Xx", "7", "$", "password", "qwerty", "letmein"
  ];
  const explodingElements = ["password", "123", "qwerty", "letmein"];
  const fakeElements = ["love", "flower", "relationship"];
  let currentIndex = 0;
  let password = "";
  let timeLeft = 30;
  let gameOver = false;
  let interval1, interval2;
  
  const el = document.getElementById("scrolling-elements");
  const passwordEl = document.getElementById("password");
  const strengthText = document.getElementById("strength-level");
  const resultMessage = document.getElementById("result-message");
  const retryBtn = document.getElementById("retry-button");
  const addBtn = document.getElementById("add-button");
  const timerDisplay = document.getElementById("time-left");
  
  document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("rules-box").style.display = "none";
    document.getElementById("game-container").style.display = "flex";
    startGame();
  });
  
  function updateScrollingElement() {
    if (gameOver) return;
    el.textContent = elements[currentIndex];
    currentIndex = (currentIndex + 1) % elements.length;
  }
  
  function startGame() {
    interval1 = setInterval(updateScrollingElement, 1000);
    interval2 = setInterval(() => {
      if (gameOver) {
        clearInterval(interval2);
        return;
      }
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(interval2);
        checkWinLose();
      }
    }, 1000);
  }
  
  addBtn.addEventListener("click", () => {
    if (gameOver) return;
    let selected = elements[(currentIndex - 1 + elements.length) % elements.length];
  
    if (explodingElements.includes(selected)) {
      loseGame("💥 You clicked a dangerous word!");
      return;
    }
  
    password += selected;
    passwordEl.textContent = password;
    evaluateStrength(password);
  });
  
  function evaluateStrength(pw) {
    let hasUpper = /[A-Z]/.test(pw);
    let hasLower = /[a-z]/.test(pw);
    let hasNumber = /[0-9]/.test(pw);
    let hasSpecial = /[^A-Za-z0-9]/.test(pw);
    let isLong = pw.length >= 8;
  
    let score = 0;
    if (hasUpper) score++;
    if (hasLower) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;
    if (isLong) score++;
  
    fakeElements.forEach(fake => {
      if (pw.includes(fake)) score--;
    });
  
    if (score >= 4) {
      strengthText.textContent = "Strong";
      strengthText.style.color = "#55efc4";
    } else if (score === 2 || score === 3) {
      strengthText.textContent = "Moderate";
      strengthText.style.color = "#ffeaa7";
    } else {
      strengthText.textContent = "Weak";
      strengthText.style.color = "#ff7675";
    }
  }
  
  
  function loseGame(msg) {
    gameOver = true;
    clearInterval(interval1);
    el.textContent = msg;
    addBtn.disabled = true;
    resultMessage.textContent = "❌ You Lose!";
    resultMessage.classList.add("lose");
    retryBtn.style.display = "inline-block";
  }
  
  function winGame() {
    gameOver = true;
    clearInterval(interval1);
    resultMessage.textContent = "🎉 You Win! Strong password created!";
    resultMessage.classList.add("win");
    addBtn.disabled = true;
    retryBtn.style.display = "inline-block";
  }
  
  function checkWinLose() {
    if (strengthText.textContent === "Strong" && password.length >= 10) {
      winGame();
    } else {
      loseGame("⏱️ Time's up!");
    }
  }
  
  retryBtn.addEventListener("click", () => {
    location.reload();
  });
  