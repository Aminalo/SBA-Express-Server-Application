// Simple client-side filtering of board cards
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#boardFilter");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? "" : "none";
    });
  });
});