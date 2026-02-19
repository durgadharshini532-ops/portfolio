const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = index =>
  `frames/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Preload images
const images = [];
let img = new Image();
img.src = currentFrame(1);
images.push(img);

for (let i = 2; i <= frameCount; i++) {
  const image = new Image();
  image.src = currentFrame(i);
  images.push(image);
}

// Draw image
function drawImage(img) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = (canvas.width - img.width * scale) / 2;
  const y = (canvas.height - img.height * scale) / 2;

  ctx.drawImage(
    img,
    x,
    y,
    img.width * scale,
    img.height * scale
  );
}

// Scroll animation
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => drawImage(images[frameIndex]));
});

// Initial render
images[0].onload = () => {
  drawImage(images[0]);
};

// Resize support
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
