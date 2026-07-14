// DFCE 2026 Quiz — app logic
(function () {
  "use strict";

  const LEADERBOARD_KEY = "dfce2026_leaderboard";
  const MAX_LEADERBOARD_ENTRIES = 50;
  const QUIZ_LENGTH = 10;

  const screens = {
    home: document.getElementById("screen-home"),
    quiz: document.getElementById("screen-quiz"),
    results: document.getElementById("screen-results"),
    leaderboard: document.getElementById("screen-leaderboard"),
  };

  const startForm = document.getElementById("start-form");
  const usernameInput = document.getElementById("username");
  const btnViewLeaderboard = document.getElementById("btn-view-leaderboard");

  const progressFill = document.getElementById("progress-fill");
  const progressLabel = document.getElementById("quiz-progress-label");
  const scoreLabel = document.getElementById("quiz-score-label");
  const questionCategory = document.getElementById("question-category");
  const questionText = document.getElementById("question-text");
  const optionsList = document.getElementById("options-list");
  const feedbackText = document.getElementById("feedback-text");
  const btnNext = document.getElementById("btn-next");

  const resultsHeadline = document.getElementById("results-headline");
  const scoreRing = document.getElementById("score-ring");
  const scoreRingText = document.getElementById("score-ring-text");
  const resultsMessage = document.getElementById("results-message");
  const resultsTime = document.getElementById("results-time");
  const btnGotoLeaderboard = document.getElementById("btn-goto-leaderboard");
  const btnPlayAgain = document.getElementById("btn-play-again");

  const leaderboardBody = document.getElementById("leaderboard-body");
  const leaderboardEmpty = document.getElementById("leaderboard-empty");
  const leaderboardMode = document.getElementById("leaderboard-mode");
  const btnBackHome = document.getElementById("btn-back-home");
  const btnClearLeaderboard = document.getElementById("btn-clear-leaderboard");

  const OPTION_LETTERS = ["A", "B", "C", "D"];

  let state = {
    username: "",
    order: [],       // shuffled question indices
    current: 0,
    score: 0,
    startTime: 0,
    answered: false,
  };

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  function shuffledIndices(n) {
    const arr = Array.from({ length: n }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function shuffledOptions(question) {
    const idx = question.options.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  }

  function startQuiz(username) {
    state = {
      username,
      order: shuffledIndices(QUESTIONS.length).slice(0, QUIZ_LENGTH),
      current: 0,
      score: 0,
      startTime: Date.now(),
      answered: false,
    };
    showScreen("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    const total = state.order.length;
    const qIndex = state.order[state.current];
    const question = QUESTIONS[qIndex];

    state.answered = false;
    feedbackText.textContent = "";
    btnNext.hidden = true;
    btnNext.disabled = false;

    progressFill.style.width = `${(state.current / total) * 100}%`;
    progressLabel.textContent = `Question ${state.current + 1} / ${total}`;
    scoreLabel.textContent = `Score: ${state.score}`;
    questionCategory.textContent = question.category;
    questionText.textContent = question.q;

    optionsList.innerHTML = "";
    const optionOrder = shuffledOptions(question);

    optionOrder.forEach((origIndex, displayIndex) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.innerHTML = `<span class="option-letter">${OPTION_LETTERS[displayIndex]}</span><span>${question.options[origIndex]}</span>`;
      btn.addEventListener("click", () => handleAnswer(btn, origIndex, question));
      optionsList.appendChild(btn);
    });
  }

  function handleAnswer(clickedBtn, chosenOrigIndex, question) {
    if (state.answered) return;
    state.answered = true;

    const isCorrect = chosenOrigIndex === question.answer;
    if (isCorrect) state.score += 1;

    const allBtns = Array.from(optionsList.querySelectorAll(".option-btn"));
    allBtns.forEach((btn) => (btn.disabled = true));

    clickedBtn.classList.add(isCorrect ? "correct" : "incorrect");

    if (!isCorrect) {
      // also highlight the correct answer
      const correctText = question.options[question.answer];
      allBtns.forEach((btn) => {
        if (btn.textContent.trim().endsWith(correctText)) {
          btn.classList.add("correct");
        }
      });
    }

    feedbackText.textContent = question.explanation;
    scoreLabel.textContent = `Score: ${state.score}`;

    const total = state.order.length;
    progressFill.style.width = `${((state.current + 1) / total) * 100}%`;

    btnNext.hidden = false;
    btnNext.textContent = state.current + 1 < total ? "Next Question" : "See Results";
  }

  btnNext.addEventListener("click", () => {
    if (btnNext.hidden || btnNext.disabled) return;
    btnNext.disabled = true;
    btnNext.hidden = true;

    state.current += 1;
    if (state.current >= state.order.length) {
      finishQuiz();
    } else {
      renderQuestion();
      btnNext.disabled = false;
    }
  });

  function finishQuiz() {
    const elapsedMs = Date.now() - state.startTime;
    const elapsedSec = Math.round(elapsedMs / 1000);

    // Save in the background so the results screen shows instantly even on a slow connection.
    saveScore(state.username, state.score, elapsedSec).catch((err) => {
      console.warn("[DFCE Quiz] Failed to save score", err);
    });
    showResults(state.score, elapsedSec);
  }

  function showResults(score, elapsedSec) {
    const total = QUIZ_LENGTH;
    const pct = Math.round((score / total) * 100);

    scoreRing.style.setProperty("--pct", pct);
    scoreRingText.textContent = `${score}/${total}`;
    resultsTime.textContent = formatTime(elapsedSec);

    let headline, message;
    if (pct === 100) {
      headline = "Perfect score!";
      message = "You clearly know your way around cybersecurity and data protection. Well done!";
    } else if (pct >= 70) {
      headline = "Great job!";
      message = "Solid grasp of cybersecurity and PDPO essentials — just a couple to brush up on.";
    } else if (pct >= 40) {
      headline = "Good effort!";
      message = "You're on the right track. Visit our booth to learn more about staying safe and PDPO-compliant.";
    } else {
      headline = "Thanks for playing!";
      message = "Cybersecurity and data protection can be tricky — come chat with us to learn more.";
    }
    resultsHeadline.textContent = headline;
    resultsMessage.textContent = message;

    showScreen("results");
  }

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  function isCloudMode() {
    return !!window.QUIZ_DB;
  }

  function loadLeaderboardLocal() {
    try {
      const raw = localStorage.getItem(LEADERBOARD_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveScoreLocal(entry) {
    const entries = loadLeaderboardLocal();
    entries.push(entry);
    entries.sort((a, b) => b.score - a.score || a.time - b.time);
    localStorage.setItem(
      LEADERBOARD_KEY,
      JSON.stringify(entries.slice(0, MAX_LEADERBOARD_ENTRIES))
    );
  }

  async function saveScore(name, score, timeSec) {
    const entry = {
      name: name.trim().slice(0, 24) || "Anonymous",
      score,
      time: timeSec,
      date: new Date().toISOString(),
    };

    if (isCloudMode()) {
      try {
        await window.QUIZ_DB.collection("scores").add(entry);
        return;
      } catch (err) {
        console.warn("[DFCE Quiz] Firestore save failed, saving locally instead.", err);
      }
    }
    saveScoreLocal(entry);
  }

  async function loadLeaderboard() {
    if (isCloudMode()) {
      try {
        const snap = await window.QUIZ_DB
          .collection("scores")
          .orderBy("score", "desc")
          .limit(50)
          .get();
        const entries = snap.docs.map((doc) => doc.data());
        entries.sort((a, b) => b.score - a.score || a.time - b.time);
        return entries;
      } catch (err) {
        console.warn("[DFCE Quiz] Firestore read failed, showing local scores instead.", err);
        return loadLeaderboardLocal();
      }
    }
    return loadLeaderboardLocal();
  }

  async function renderLeaderboard() {
    leaderboardBody.innerHTML = "";
    leaderboardEmpty.hidden = true;
    leaderboardMode.textContent = isCloudMode()
      ? "Live — synced across all devices"
      : "Local only on this device (Firebase not configured)";
    btnClearLeaderboard.hidden = isCloudMode();

    const entries = await loadLeaderboard();

    if (entries.length === 0) {
      leaderboardEmpty.hidden = false;
      return;
    }

    entries.slice(0, 10).forEach((entry, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${escapeHtml(entry.name)}</td>
        <td>${entry.score}/${QUIZ_LENGTH}</td>
        <td>${formatTime(entry.time)}</td>
      `;
      leaderboardBody.appendChild(tr);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // Event wiring
  startForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = usernameInput.value.trim();
    if (!name) {
      usernameInput.focus();
      return;
    }
    startQuiz(name);
  });

  btnViewLeaderboard.addEventListener("click", () => {
    showScreen("leaderboard");
    renderLeaderboard();
  });

  btnGotoLeaderboard.addEventListener("click", () => {
    showScreen("leaderboard");
    renderLeaderboard();
  });

  btnPlayAgain.addEventListener("click", () => {
    usernameInput.value = "";
    showScreen("home");
    usernameInput.focus();
  });

  btnBackHome.addEventListener("click", () => {
    showScreen("home");
  });

  btnClearLeaderboard.addEventListener("click", () => {
    if (isCloudMode()) return; // shared leaderboard: clear from the Firebase console instead
    if (confirm("Clear all leaderboard scores? This cannot be undone.")) {
      localStorage.removeItem(LEADERBOARD_KEY);
      renderLeaderboard();
    }
  });

  showScreen("home");
})();
