const canvas = document.getElementById("avatarCanvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("imageUpload");
const downloadBtn = document.getElementById("downloadBtn");

// Template
const template = new Image();
template.src = "assets/images/template_transparent_1.png";

// Circle coordinates
const circleX = 400;
const circleY = 531;
const radius = 288;

// Uploaded image controls
let img = null;
let imgX = circleX;
let imgY = circleY;
let scale = 1;

// Dragging control
let isDragging = false;
let startX, startY;

template.onload = () => {
    canvas.width = template.width;
    canvas.height = template.height;
    draw();
};

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(template, 0, 0);

    if (img) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
        ctx.clip();

        const displayWidth = img.width * scale;
        const displayHeight = img.height * scale;

        ctx.drawImage(
            img,
            imgX - displayWidth / 2,
            imgY - displayHeight / 2,
            displayWidth,
            displayHeight
        );

        ctx.restore();
        ctx.drawImage(template, 0, 0);
    }
}

// Handle image upload
upload.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        // Scale image to fit circle
        scale = Math.max(
            (radius * 2) / img.width,
            (radius * 2) / img.height
        );

        // Center it initially
        imgX = circleX;
        imgY = circleY;

        draw();
    };
});

// Mouse events
canvas.addEventListener("mousedown", (e) => startDrag(e));
canvas.addEventListener("mousemove", (e) => drag(e));
canvas.addEventListener("mouseup", () => stopDrag());
canvas.addEventListener("mouseleave", () => stopDrag());

// Touch events
canvas.addEventListener("touchstart", (e) => startDrag(e.touches[0]));
canvas.addEventListener("touchmove", (e) => {
    drag(e.touches[0]);
    e.preventDefault();
});
canvas.addEventListener("touchend", () => stopDrag());

function startDrag(e) {
    if (!img) return;

    const dx = e.offsetX;
    const dy = e.offsetY;

    // Allow dragging anywhere inside canvas
    isDragging = true;
    startX = dx - imgX;
    startY = dy - imgY;
}

function drag(e) {
    if (!isDragging || !img) return;

    imgX = e.offsetX - startX;
    imgY = e.offsetY - startY;

    draw();
}

function stopDrag() {
    isDragging = false;
}

// Download
downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "avatar.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
