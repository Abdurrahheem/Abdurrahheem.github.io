(() => {
  const DIFFUSE_ATTR = "data-diffuse-text";
  const DONE_ATTR = "data-diffuse-text-done";

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const randomAlphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:,.?/";
  const randomPunct = "!@#$%^&*()-_=+[]{};:,.?/";
  const randomEmoji = ["👋", "👀", "🧬", "🔥", "✨", "🌀", "🧠", "📌", "🔬", "🎲", "🫧", "🌌"];

  function shuffleInPlace(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function randomCharLike(targetChar) {
    if (/\s/.test(targetChar)) return targetChar;
    if (/[0-9]/.test(targetChar)) return "0123456789"[Math.floor(Math.random() * 10)];
    if (/[a-z]/.test(targetChar)) return "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
    if (/[A-Z]/.test(targetChar)) return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
    return randomAlphabet[Math.floor(Math.random() * randomAlphabet.length)];
  }

  function tokenize(text) {
    // Token-level (word-ish) diffusion: keep whitespace tokens as-is so layout doesn't jump.
    // Group runs of letters/digits, whitespace, and "everything else" (punctuation, emoji, etc).
    return text.match(/(\s+|[A-Za-z0-9]+|[^\sA-Za-z0-9]+)/g) ?? [text];
  }

  function looksLikeEmojiToken(token) {
    // Heuristic: no ascii letters/digits and contains at least one non-ascii codepoint.
    // This keeps punctuation like "," out, but includes emojis.
    if (/[A-Za-z0-9]/.test(token)) return false;
    for (const ch of token) {
      if (ch.codePointAt(0) > 0x7f) return true;
    }
    return false;
  }

  function randomTokenLike(targetToken) {
    if (/^\s+$/.test(targetToken)) return targetToken;

    if (looksLikeEmojiToken(targetToken)) {
      return randomEmoji[Math.floor(Math.random() * randomEmoji.length)];
    }

    if (/^[0-9]+$/.test(targetToken)) {
      return Array.from({ length: targetToken.length }, () => "0123456789"[Math.floor(Math.random() * 10)]).join(
        ""
      );
    }

    if (/^[A-Za-z]+$/.test(targetToken)) {
      // Keep token length to feel "vocab-like" while still random.
      const out = [];
      for (const ch of targetToken) out.push(randomCharLike(ch));
      return out.join("");
    }

    // Punctuation / mixed tokens: randomize per-char but keep the token boundary.
    const out = [];
    for (const ch of targetToken) {
      if (/\s/.test(ch)) out.push(ch);
      else if (looksLikeEmojiToken(ch)) out.push(randomEmoji[Math.floor(Math.random() * randomEmoji.length)]);
      else out.push(randomPunct[Math.floor(Math.random() * randomPunct.length)]);
    }
    return out.join("");
  }

  function buildRevealOrder(finalTokens) {
    const indices = [];
    for (let i = 0; i < finalTokens.length; i++) {
      if (!/^\s+$/.test(finalTokens[i])) indices.push(i);
    }
    return shuffleInPlace(indices);
  }

  function discretizeProgress(t, steps) {
    if (steps <= 1) return t;
    const step = Math.floor(t * steps);
    return Math.min(1, step / steps);
  }

  function createTextNodeSpans(root) {
    const spans = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.nodeValue) continue;
      if (!node.nodeValue.trim()) continue;
      if (!node.parentNode) continue;
      if (node.parentNode.nodeName === "SCRIPT") continue;
      if (node.parentNode.nodeName === "STYLE") continue;
      textNodes.push(node);
    }

    for (const textNode of textNodes) {
      const span = document.createElement("span");
      span.textContent = textNode.nodeValue;
      textNode.parentNode.replaceChild(span, textNode);
      spans.push(span);
    }

    return spans;
  }

  function animateElement(el) {
    if (!el || el.getAttribute(DONE_ATTR) === "1") return;

    const originalHtml = el.innerHTML;
    const spans = createTextNodeSpans(el);
    if (spans.length === 0) {
      el.setAttribute(DONE_ATTR, "1");
      return;
    }

    const segments = spans.map((span) => {
      const finalText = span.textContent ?? "";
      const finalTokens = tokenize(finalText);
      const revealOrder = buildRevealOrder(finalTokens);
      const revealRank = new Array(finalTokens.length).fill(Number.POSITIVE_INFINITY);
      for (let rank = 0; rank < revealOrder.length; rank++) {
        revealRank[revealOrder[rank]] = rank;
      }
      return { span, finalText, finalTokens, revealOrder, revealRank };
    });

    // Accessibility: ensure screen readers still get the final string.
    try {
      const finalLabel = el.textContent ?? "";
      if (finalLabel.trim()) el.setAttribute("aria-label", finalLabel);
    } catch {
      // ignore
    }

    // Faster defaults; still overridable per-element via data attributes.
    const durationMs = Number(el.getAttribute("data-diffuse-duration-ms")) || 1000;
    const steps = Number(el.getAttribute("data-diffuse-steps")) || 18;

    const start = performance.now();

    function render(progress) {
      for (const seg of segments) {
        const revealCount = Math.floor(progress * seg.revealOrder.length);
        const out = seg.finalTokens.map((tok, idx) =>
          seg.revealRank[idx] < revealCount ? tok : randomTokenLike(tok)
        );
        seg.span.textContent = out.join("");
      }
    }

    render(0);

    function tick(now) {
      const t = Math.min(1, (now - start) / durationMs);
      const p = discretizeProgress(t, steps);
      render(p);

      if (t < 1) {
        requestAnimationFrame(tick);
        return;
      }

      el.innerHTML = originalHtml;
      el.setAttribute(DONE_ATTR, "1");
    }

    requestAnimationFrame(tick);
  }

  function setup() {
    if (prefersReducedMotion) {
      document.querySelectorAll(`[${DIFFUSE_ATTR}]`).forEach((el) => el.setAttribute(DONE_ATTR, "1"));
      return;
    }

    const targets = Array.from(document.querySelectorAll(`[${DIFFUSE_ATTR}]`));
    if (targets.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(animateElement);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          animateElement(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }
})();
