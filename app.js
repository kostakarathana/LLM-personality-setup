// app.js — Application logic for Your LLM Flavor

(function () {
  "use strict";

  // ── State ──────────────────────────────────────────────────────────────────
  let currentIndex = 0;
  const answers = {};

  // ── DOM refs ───────────────────────────────────────────────────────────────
  const landing        = document.getElementById("landing");
  const questionScreen = document.getElementById("question-screen");
  const resultsScreen  = document.getElementById("results-screen");
  const startBtn       = document.getElementById("start-btn");
  const backBtn        = document.getElementById("back-btn");
  const nextBtn        = document.getElementById("next-btn");
  const categoryEl     = document.getElementById("question-category");
  const questionEl     = document.getElementById("question-text");
  const optionsEl      = document.getElementById("options-container");
  const textareaWrap   = document.getElementById("textarea-container");
  const longAnswer     = document.getElementById("long-answer");
  const progressFill   = document.getElementById("progress-fill");
  const progressText   = document.getElementById("progress-text");
  const outputXml      = document.getElementById("output-xml");
  const copyBtn        = document.getElementById("copy-btn");
  const downloadBtn    = document.getElementById("download-btn");
  const restartBtn     = document.getElementById("restart-btn");
  const copyFeedback   = document.getElementById("copy-feedback");

  // ── Helpers ────────────────────────────────────────────────────────────────
  function showScreen(screen) {
    [landing, questionScreen, resultsScreen].forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
  }

  function updateProgress() {
    const pct = ((currentIndex) / questions.length) * 100;
    progressFill.style.width = pct + "%";
    progressText.textContent = currentIndex + " / " + questions.length;
    progressText.classList.toggle("visible", currentIndex > 0);
  }

  function renderQuestion() {
    const q = questions[currentIndex];
    categoryEl.textContent = q.category;
    questionEl.textContent = q.text;

    // Back button visibility
    backBtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";

    // Next button label
    nextBtn.textContent = currentIndex === questions.length - 1 ? "Finish" : "Next";

    if (q.type === "mc") {
      optionsEl.style.display = "flex";
      textareaWrap.style.display = "none";
      optionsEl.innerHTML = "";

      q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        if (answers[q.id] === i) btn.classList.add("selected");
        btn.addEventListener("click", () => {
          answers[q.id] = i;
          optionsEl.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
          updateNextState();
        });
        optionsEl.appendChild(btn);
      });
    } else {
      optionsEl.style.display = "none";
      textareaWrap.style.display = "block";
      longAnswer.value = answers[q.id] || "";
      longAnswer.focus();
    }

    updateNextState();
  }

  function updateNextState() {
    const q = questions[currentIndex];
    if (q.type === "mc") {
      nextBtn.disabled = answers[q.id] === undefined;
    } else {
      // Long answer: allow skipping (not required but encouraged)
      nextBtn.disabled = false;
    }
  }

  function saveCurrent() {
    const q = questions[currentIndex];
    if (q.type === "long") {
      const val = longAnswer.value.trim();
      if (val) {
        answers[q.id] = val;
      } else {
        delete answers[q.id];
      }
    }
  }

  // ── XML Output Generation ─────────────────────────────────────────────────
  function escapeXml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function generateProfile() {
    // Group answers by category / trait area
    const personality = [];
    const learning = [];
    const communication = [];
    const work = [];
    const values = [];
    const longAnswers = [];

    questions.forEach(q => {
      if (answers[q.id] === undefined) return;

      if (q.type === "mc") {
        const chosen = q.options[answers[q.id]];
        const entry = { trait: q.trait, question: q.text, answer: chosen };

        if (q.id <= 12) personality.push(entry);
        else if (q.id <= 27) learning.push(entry);
        else if (q.id <= 37) communication.push(entry);
        else if (q.id <= 45) work.push(entry);
        else if (q.id <= 50) values.push(entry);
      } else {
        longAnswers.push({ trait: q.trait, question: q.text, answer: answers[q.id] });
      }
    });

    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<user-profile>\n`;
    xml += `  <meta>\n`;
    xml += `    <generated>${new Date().toISOString().split("T")[0]}</generated>\n`;
    xml += `    <version>1.0</version>\n`;
    xml += `    <source>Your LLM Flavor</source>\n`;
    xml += `  </meta>\n\n`;

    // Personality
    if (personality.length) {
      xml += `  <personality>\n`;
      xml += `    <!-- Big Five inspired: openness, conscientiousness, extraversion, agreeableness, emotional-stability -->\n`;
      personality.forEach(p => {
        xml += `    <trait name="${escapeXml(p.trait)}">\n`;
        xml += `      <question>${escapeXml(p.question)}</question>\n`;
        xml += `      <answer>${escapeXml(p.answer)}</answer>\n`;
        xml += `    </trait>\n`;
      });
      xml += `  </personality>\n\n`;
    }

    // Learning style
    if (learning.length) {
      xml += `  <learning-style>\n`;
      xml += `    <!-- Based on VARK, Kolb, Felder-Silverman, Bloom's taxonomy -->\n`;
      learning.forEach(p => {
        xml += `    <preference name="${escapeXml(p.trait)}">\n`;
        xml += `      <question>${escapeXml(p.question)}</question>\n`;
        xml += `      <answer>${escapeXml(p.answer)}</answer>\n`;
        xml += `    </preference>\n`;
      });
      xml += `  </learning-style>\n\n`;
    }

    // Communication
    if (communication.length) {
      xml += `  <communication-preferences>\n`;
      communication.forEach(p => {
        xml += `    <preference name="${escapeXml(p.trait)}">\n`;
        xml += `      <question>${escapeXml(p.question)}</question>\n`;
        xml += `      <answer>${escapeXml(p.answer)}</answer>\n`;
        xml += `    </preference>\n`;
      });
      xml += `  </communication-preferences>\n\n`;
    }

    // Work style
    if (work.length) {
      xml += `  <work-style>\n`;
      work.forEach(p => {
        xml += `    <preference name="${escapeXml(p.trait)}">\n`;
        xml += `      <question>${escapeXml(p.question)}</question>\n`;
        xml += `      <answer>${escapeXml(p.answer)}</answer>\n`;
        xml += `    </preference>\n`;
      });
      xml += `  </work-style>\n\n`;
    }

    // Values
    if (values.length) {
      xml += `  <values-and-priorities>\n`;
      values.forEach(p => {
        xml += `    <value name="${escapeXml(p.trait)}">\n`;
        xml += `      <question>${escapeXml(p.question)}</question>\n`;
        xml += `      <answer>${escapeXml(p.answer)}</answer>\n`;
        xml += `    </value>\n`;
      });
      xml += `  </values-and-priorities>\n\n`;
    }

    // Long-form answers
    if (longAnswers.length) {
      xml += `  <open-responses>\n`;
      longAnswers.forEach(p => {
        xml += `    <response topic="${escapeXml(p.trait)}">\n`;
        xml += `      <question>${escapeXml(p.question)}</question>\n`;
        xml += `      <answer>${escapeXml(p.answer)}</answer>\n`;
        xml += `    </response>\n`;
      });
      xml += `  </open-responses>\n`;
    }

    xml += `</user-profile>`;
    return xml;
  }

  // ── Event Handlers ─────────────────────────────────────────────────────────
  startBtn.addEventListener("click", () => {
    currentIndex = 0;
    updateProgress();
    showScreen(questionScreen);
    renderQuestion();
  });

  nextBtn.addEventListener("click", () => {
    saveCurrent();
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      updateProgress();
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Finish
      updateProgress();
      const xml = generateProfile();
      outputXml.textContent = xml;
      showScreen(resultsScreen);
      progressFill.style.width = "100%";
      progressText.textContent = questions.length + " / " + questions.length;
    }
  });

  backBtn.addEventListener("click", () => {
    saveCurrent();
    if (currentIndex > 0) {
      currentIndex--;
      updateProgress();
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  copyBtn.addEventListener("click", () => {
    const text = outputXml.textContent;
    navigator.clipboard.writeText(text).then(() => {
      copyFeedback.textContent = "Copied to clipboard";
      setTimeout(() => { copyFeedback.textContent = ""; }, 2500);
    }).catch(() => {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      copyFeedback.textContent = "Copied to clipboard";
      setTimeout(() => { copyFeedback.textContent = ""; }, 2500);
    });
  });

  downloadBtn.addEventListener("click", () => {
    const text = outputXml.textContent;
    const blob = new Blob([text], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "llm-profile.xml";
    a.click();
    URL.revokeObjectURL(url);
  });

  restartBtn.addEventListener("click", () => {
    Object.keys(answers).forEach(k => delete answers[k]);
    currentIndex = 0;
    updateProgress();
    showScreen(landing);
    progressText.classList.remove("visible");
    progressFill.style.width = "0%";
  });

  // Long answer input tracking
  longAnswer.addEventListener("input", updateNextState);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !nextBtn.disabled && questionScreen.classList.contains("active")) {
      // Only trigger on Enter if it's a MC question or if shift isn't held (for textareas)
      const q = questions[currentIndex];
      if (q.type === "mc") {
        nextBtn.click();
      } else if (e.metaKey || e.ctrlKey) {
        nextBtn.click();
      }
    }
  });

  // Init
  updateProgress();
})();
