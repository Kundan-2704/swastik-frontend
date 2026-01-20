export const flyToCart = (img: HTMLImageElement | null) => {
  const cartIcon = document.getElementById("cart-icon");
  if (!img || !cartIcon) return;

  const imgRect = img.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  const flyingImg = img.cloneNode(true) as HTMLImageElement;

  flyingImg.style.position = "fixed";
  flyingImg.style.left = `${imgRect.left}px`;
  flyingImg.style.top = `${imgRect.top}px`;
  flyingImg.style.width = `${imgRect.width}px`;
  flyingImg.style.height = `${imgRect.height}px`;
  flyingImg.style.borderRadius = "14px";
  flyingImg.style.pointerEvents = "none";
  flyingImg.style.zIndex = "2147483647";
  flyingImg.style.opacity = "1";
  flyingImg.style.filter = "blur(0.3px)";
  flyingImg.style.willChange = "transform, opacity";

  const duration = window.innerWidth < 640 ? 1.1 : 1.0;

  flyingImg.style.transition = `
    transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1),
    opacity ${duration}s ease-out
  `;

  document.body.appendChild(flyingImg);

  const translateX =
    cartRect.left + cartRect.width / 2 -
    (imgRect.left + imgRect.width / 2);

  const translateY =
    cartRect.top + cartRect.height / 2 -
    (imgRect.top + imgRect.height / 2);

  const scale = window.innerWidth < 640 ? 0.4 : 0.3;

  requestAnimationFrame(() => {
    flyingImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    flyingImg.style.opacity = "0.35";

    setTimeout(() => {
      cartIcon.classList.add("cart-bounce");
      setTimeout(() => cartIcon.classList.remove("cart-bounce"), 420);
    }, duration * 700);
  });

  setTimeout(() => {
    flyingImg.remove();
  }, duration * 1000 + 120);
};
