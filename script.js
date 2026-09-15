// Small retro touch: type out the terminal line on load.
const line = document.getElementById("terminal-line");
const fullText = "> connecting... access: granted";

if (line) {
  line.textContent = "";
  let i = 0;
  function type() {
    if (i <= fullText.length) {
      line.textContent = fullText.slice(0, i);
      i++;
      setTimeout(type, 35);
    }
  }
  type();
}
