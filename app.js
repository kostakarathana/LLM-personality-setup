// app.js — V2 Application logic for Your LLM Flavor

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
  const answerArea     = document.getElementById("answer-area");
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

  function updateNextState() {
    const q = questions[currentIndex];
    const a = answers[q.id];
    switch (q.type) {
      case "mc":
      case "scenario":
      case "dichotomy":
      case "modality":
        nextBtn.disabled = a === undefined;
        break;
      case "tradeoff":
        nextBtn.disabled = a === undefined;
        break;
      case "rank":
        nextBtn.disabled = !a || a.length !== q.items.length;
        break;
      case "short":
        nextBtn.disabled = false; // optional
        break;
      default:
        nextBtn.disabled = false;
    }
  }

  // ── Renderers ──────────────────────────────────────────────────────────────

  function renderMC(q) {
    const wrap = document.createElement("div");
    wrap.className = "options-container";
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = typeof opt === "string" ? opt : opt.label;
      if (answers[q.id] === i) btn.classList.add("selected");
      btn.addEventListener("click", () => {
        answers[q.id] = i;
        wrap.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        updateNextState();
      });
      wrap.appendChild(btn);
    });
    return wrap;
  }

  function renderDichotomy(q) {
    const wrap = document.createElement("div");
    wrap.className = "dichotomy-container";
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "dichotomy-btn";
      btn.textContent = opt;
      if (answers[q.id] === i) btn.classList.add("selected");
      btn.addEventListener("click", () => {
        answers[q.id] = i;
        wrap.querySelectorAll(".dichotomy-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        updateNextState();
      });
      wrap.appendChild(btn);
    });
    return wrap;
  }

  function renderModality(q) {
    const wrap = document.createElement("div");
    wrap.className = "modality-container";
    q.options.forEach((opt, i) => {
      const card = document.createElement("button");
      card.className = "modality-card";
      if (answers[q.id] === i) card.classList.add("selected");
      const label = document.createElement("span");
      label.className = "modality-label";
      label.textContent = opt.label;
      const desc = document.createElement("span");
      desc.className = "modality-desc";
      desc.textContent = opt.desc;
      card.appendChild(label);
      card.appendChild(desc);
      card.addEventListener("click", () => {
        answers[q.id] = i;
        wrap.querySelectorAll(".modality-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        updateNextState();
      });
      wrap.appendChild(card);
    });
    return wrap;
  }

  function renderTradeoff(q) {
    const wrap = document.createElement("div");
    wrap.className = "tradeoff-container";

    const poleLeft = document.createElement("p");
    poleLeft.className = "tradeoff-pole left";
    poleLeft.textContent = q.poles[0];
    wrap.appendChild(poleLeft);

    const track = document.createElement("div");
    track.className = "tradeoff-track";
    for (let i = 0; i < 5; i++) {
      const dot = document.createElement("button");
      dot.className = "tradeoff-dot";
      dot.setAttribute("data-value", i);
      if (answers[q.id] === i) dot.classList.add("selected");
      dot.addEventListener("click", () => {
        answers[q.id] = i;
        track.querySelectorAll(".tradeoff-dot").forEach(d => d.classList.remove("selected"));
        dot.classList.add("selected");
        updateNextState();
      });
      track.appendChild(dot);
    }
    wrap.appendChild(track);

    const poleRight = document.createElement("p");
    poleRight.className = "tradeoff-pole right";
    poleRight.textContent = q.poles[1];
    wrap.appendChild(poleRight);

    return wrap;
  }

  function renderRank(q) {
    const wrap = document.createElement("div");
    wrap.className = "rank-container";

    const instruction = document.createElement("p");
    instruction.className = "rank-instruction";
    instruction.textContent = "Click items in order of preference (1st = most important)";
    wrap.appendChild(instruction);

    const saved = answers[q.id] || [];

    q.items.forEach((item, i) => {
      const row = document.createElement("button");
      row.className = "rank-item";
      row.setAttribute("data-index", i);

      const rankNum = document.createElement("span");
      rankNum.className = "rank-num";
      const pos = saved.indexOf(i);
      if (pos !== -1) {
        rankNum.textContent = pos + 1;
        row.classList.add("ranked");
        row.setAttribute("data-rank", pos + 1);
      }

      const text = document.createElement("span");
      text.className = "rank-text";
      text.textContent = item;

      row.appendChild(rankNum);
      row.appendChild(text);

      row.addEventListener("click", () => {
        let current = answers[q.id] ? [...answers[q.id]] : [];
        const idx = current.indexOf(i);
        if (idx !== -1) {
          // Unrank this and everything after it
          current = current.slice(0, idx);
        } else {
          current.push(i);
        }
        answers[q.id] = current;
        // Re-render rank numbers
        wrap.querySelectorAll(".rank-item").forEach(r => {
          const ri = parseInt(r.getAttribute("data-index"));
          const p = current.indexOf(ri);
          const num = r.querySelector(".rank-num");
          if (p !== -1) {
            num.textContent = p + 1;
            r.classList.add("ranked");
            r.setAttribute("data-rank", p + 1);
          } else {
            num.textContent = "";
            r.classList.remove("ranked");
            r.removeAttribute("data-rank");
          }
        });
        updateNextState();
      });

      wrap.appendChild(row);
    });

    return wrap;
  }

  function renderShort(q) {
    const wrap = document.createElement("div");
    wrap.className = "short-container";
    const input = document.createElement("input");
    input.type = "text";
    input.className = "short-input";
    input.placeholder = q.placeholder || "Type your answer...";
    input.maxLength = 200;
    input.value = answers[q.id] || "";
    input.addEventListener("input", () => {
      const val = input.value.trim();
      answers[q.id] = val || undefined;
      updateNextState();
    });
    wrap.appendChild(input);
    setTimeout(() => input.focus(), 50);
    return wrap;
  }

  // ── Master render ──────────────────────────────────────────────────────────

  function renderQuestion() {
    const q = questions[currentIndex];
    categoryEl.textContent = q.category;
    questionEl.textContent = q.text;
    answerArea.innerHTML = "";

    backBtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";
    nextBtn.textContent = currentIndex === questions.length - 1 ? "Finish" : "Next";

    let el;
    switch (q.type) {
      case "mc":
      case "scenario":
        el = renderMC(q);
        break;
      case "dichotomy":
        el = renderDichotomy(q);
        break;
      case "modality":
        el = renderModality(q);
        break;
      case "tradeoff":
        el = renderTradeoff(q);
        break;
      case "rank":
        el = renderRank(q);
        break;
      case "short":
        el = renderShort(q);
        break;
      default:
        el = renderMC(q);
    }
    answerArea.appendChild(el);
    updateNextState();
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
    // Group interpreted results by category
    const sections = {};
    const sectionOrder = [];

    questions.forEach(q => {
      const a = answers[q.id];
      if (a === undefined) return;

      const result = q.interpret(a);
      if (!result) return;

      if (!sections[q.category]) {
        sections[q.category] = [];
        sectionOrder.push(q.category);
      }
      sections[q.category].push({
        trait: q.trait,
        label: result.label,
        score: result.score,
        note: result.note
      });
    });

    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<!--\n`;
    xml += `  YOUR LLM FLAVOR — Personality & Learning Profile\n`;
    xml += `  Generated: ${new Date().toISOString().split("T")[0]}\n`;
    xml += `  \n`;
    xml += `  INSTRUCTIONS FOR THE AI:\n`;
    xml += `  This profile was generated from a research-backed questionnaire.\n`;
    xml += `  Each <trait> contains an interpreted result — not the raw answer.\n`;
    xml += `  Use the "note" field as your primary guide for how to interact.\n`;
    xml += `  Adapt your tone, depth, format, and approach based on this profile.\n`;
    xml += `-->\n`;
    xml += `<llm-profile version="2.0">\n\n`;

    sectionOrder.forEach(cat => {
      const tag = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
      xml += `  <section name="${escapeXml(cat)}">\n`;
      sections[cat].forEach(t => {
        xml += `    <trait name="${escapeXml(t.trait)}">\n`;
        xml += `      <label>${escapeXml(t.label)}</label>\n`;
        xml += `      <score>${escapeXml(String(t.score))}</score>\n`;
        xml += `      <note>${escapeXml(t.note)}</note>\n`;
        xml += `    </trait>\n`;
      });
      xml += `  </section>\n\n`;
    });

    xml += `</llm-profile>`;
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

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!questionScreen.classList.contains("active")) return;
    if (e.key === "Enter" && !nextBtn.disabled) {
      const q = questions[currentIndex];
      if (q.type === "short") {
        if (e.metaKey || e.ctrlKey) nextBtn.click();
      } else {
        nextBtn.click();
      }
    }
  });

  // Init
  updateProgress();
})();
