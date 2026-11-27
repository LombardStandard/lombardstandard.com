const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  scrollers.forEach((scroller) => {
    if (scroller.dataset.animated === "true") return;

    const inner = scroller.querySelector(".scroller__inner");
    if (!inner) return;

    scroller.dataset.animated = "true";

    Array.from(inner.children).forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      inner.appendChild(clone);
    });
  });
}
