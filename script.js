// ── QA overlay toggle ────────────────────────────────────────
const qaToggle = document.getElementById("qaToggle");
const qaLabel = qaToggle.querySelector(".qa-toggle__label");

function setQA(on) {
  document.body.classList.toggle("qa-on", on);
  qaToggle.setAttribute("aria-pressed", String(on));
  qaLabel.textContent = on ? "QA: ON" : "Run QA";
}

qaToggle.addEventListener("click", () => {
  setQA(!document.body.classList.contains("qa-on"));
});

// share a link with QA mode on: ?qa=1
if (new URLSearchParams(location.search).get("qa") === "1") setQA(true);

// keyboard shortcut: Q (ignored while typing in a field)
document.addEventListener("keydown", (e) => {
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  if (e.key === "q" || e.key === "Q") {
    setQA(!document.body.classList.contains("qa-on"));
  }
});

// ── Reveal on scroll ─────────────────────────────────────────
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-in"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
}

// ── Footer year ──────────────────────────────────────────────
document.getElementById("year").textContent = new Date().getFullYear();
