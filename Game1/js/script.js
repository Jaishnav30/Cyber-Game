const emails = [
    {
      sender: "Netflix",
      subject: "Your subscription has expired",
      snippet: "Click here to renew.",
      timestamp: "03/20/25",
      isPhish: true,
    },
    {
      sender: "IT Support",
      subject: "Urgent Password Reset",
      snippet: "Reset your password here: http://itreset.me",
      timestamp: "03/19/25",
      isPhish: true,
    },
    {
      sender: "PayPal",
      subject: "Unusual activity on your account",
      snippet: "Click to secure your account.",
      timestamp: "03/18/25",
      isPhish: true,
    },
    {
      sender: "Slack",
      subject: "Free giveaway – claim your gift",
      snippet: "User invited you to join a new project.",
      timestamp: "03/15/25",
      isPhish: false,
    },
    {
      sender: "Facebook",
      subject: "System error - action required",
      snippet: "New sign-in alert from an unrecognized device.",
      timestamp: "03/26/25",
      isPhish: false,
    },
    {
      sender: "GitHub",
      subject: "Token Expired",
      snippet: "Your access token has expired, click here to refresh.",
      timestamp: "03/28/25",
      isPhish: true,
    },
    {
      sender: "University Admin",
      subject: "Student Portal Maintenance",
      snippet: "Your login might be affected.",
      timestamp: "03/29/25",
      isPhish: true,
    },
    {
      sender: "Amazon",
      subject: "Your monthly subscription invoice",
      snippet: "Your payment was successful. View receipt.",
      timestamp: "03/10/25",
      isPhish: false,
    },
    {
      sender: "LinkedIn",
      subject: "You have unread notifications",
      snippet: "Click to confirm your email address.",
      timestamp: "03/12/25",
      isPhish: false,
    },
  ];
  
  let current = 0;
  let score = 0;
  
  const emailText = document.getElementById("email-text");
  const feedback = document.getElementById("feedback");
  const scoreDisplay = document.getElementById("score");
  
  function showEmail() {
    if (current >= emails.length) {
      document.getElementById("sender").textContent = "🎉 Game Over!";
      document.getElementById("subject").textContent = "";
      document.getElementById("snippet").textContent = `Final Score: ${score}/${emails.length * 2}`;
      document.getElementById("timestamp").textContent = "";
      disableButtons();
      return;
    }
  
    const email = emails[current];
    document.getElementById("sender").textContent = email.sender;
    document.getElementById("subject").textContent = email.subject;
    document.getElementById("snippet").textContent = email.snippet;
    document.getElementById("timestamp").textContent = email.timestamp;
  
    const box = document.getElementById("message-box");
    box.classList.remove("fade-down");
    void box.offsetWidth;
    box.classList.add("fade-down");
  
    feedback.textContent = "";
    resetSwipe();
    updateProgressBar();
  }
  
  function handleAnswer(userAnswer) {
    const correctAnswer = emails[current].isPhish;
  
    if (userAnswer === "undecided") {
      feedback.textContent = "🤔 Fair enough. Moving on.";
    } else if (
      (userAnswer === "phish" && correctAnswer) ||
      (userAnswer === "real" && !correctAnswer)
    ) {
      feedback.textContent = "✅ Correct!";
      score += 2;
    } else {
      feedback.textContent = "❌ Oops, wrong!";
      score -= 1;
    }
  
    scoreDisplay.textContent = `Score: ${score}`;
    scoreDisplay.classList.remove("score-update");
    void scoreDisplay.offsetWidth;
    scoreDisplay.classList.add("score-update");
  
    current++;
    setTimeout(showEmail, 1000);
  }
  
  function updateProgressBar() {
    const progress = (current / emails.length) * 100;
    const bar = document.getElementById("progress-bar");
    const text = document.getElementById("progress-text");

    bar.style.width = `${progress}%`;
    text.textContent = `${Math.round(progress)}%`;
    text.style.left = `calc(${progress}% - 30px)`; // keeps the text inside the bar
}

  
  function disableButtons() {
    document.getElementById("phish-btn").disabled = true;
    document.getElementById("real-btn").disabled = true;
    document.getElementById("undecided-btn").disabled = true;
  }
  
  document.getElementById("phish-btn").onclick = () => {
    animateSwipe("left");
    handleAnswer("phish");
  };
  document.getElementById("real-btn").onclick = () => {
    animateSwipe("right");
    handleAnswer("real");
  };
  document.getElementById("undecided-btn").onclick = () => {
    animateSwipe("down");
    handleAnswer("undecided");
  };
  
  document.addEventListener("keydown", (e) => {
    if (current >= emails.length) return;
    if (e.key === "ArrowLeft") {
      animateSwipe("left");
      handleAnswer("phish");
    } else if (e.key === "ArrowRight") {
      animateSwipe("right");
      handleAnswer("real");
    } else if (e.key === "ArrowDown") {
      animateSwipe("down");
      handleAnswer("undecided");
    }
  });
  
  function animateSwipe(dir) {
    const box = document.getElementById("message-box");
    let transform = "";
    if (dir === "left") transform = "translateX(-100%) rotateZ(-10deg)";
    if (dir === "right") transform = "translateX(100%) rotateZ(10deg)";
    if (dir === "down") transform = "translateY(100%)";
    box.style.transform = transform;
    box.style.opacity = 0;
  }
  
  function resetSwipe() {
    const box = document.getElementById("message-box");
    box.style.transform = "translateX(0)";
    box.style.opacity = 1;
  }
  
  // Start the game
  showEmail();
  