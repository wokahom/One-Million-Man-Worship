const canvas = document.getElementById("avatarCanvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("imageUpload");
const downloadBtn = document.getElementById("downloadBtn");

// NEW TEMPLATE (1280 × 1280)
const template = new Image();
template.src = "assets/images/canva1.png";

// NEW CIRCLE POSITION (adjust as needed)
const circleX = 640;   // center of canvas horizontally
const circleY = 640;   // center vertically
const radius = 350;    // circle radius (adjust if needed)

// Uploaded image variables
let img = null;
let imgX = circleX;
let imgY = circleY;
let scale = 1;

// Dragging controls
let isDragging = false;
let startX, startY;

// Mobile pinch zoom
let lastTouchDistance = null;

// Load the template
template.onload = () => {
    canvas.width = template.width;
    canvas.height = template.height;
    drawCanvas();
};

// Main draw function
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background template
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

        // Draw template ABOVE the clipped image
        ctx.drawImage(template, 0, 0);
    }
}

// Handle upload
upload.addEventListener("change", () => {
    const file = upload.files[0];
    if (!file) return;

    img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        scale = Math.max((radius * 2) / img.width, (radius * 2) / img.height);

        imgX = circleX;
        imgY = circleY;

        drawCanvas();
    };
});

// Mouse drag events
canvas.addEventListener("mousedown", (e) => {
    if (!img) return;
    isDragging = true;
    startX = e.offsetX - imgX;
    startY = e.offsetY - imgY;
});

canvas.addEventListener("mousemove", (e) => {
    if (isDragging && img) {
        imgX = e.offsetX - startX;
        imgY = e.offsetY - startY;
        drawCanvas();
    }
});

canvas.addEventListener("mouseup", () => (isDragging = false));
canvas.addEventListener("mouseleave", () => (isDragging = false));

// Mouse wheel zoom
canvas.addEventListener("wheel", (e) => {
    if (!img) return;

    e.preventDefault();

    const zoomSpeed = 0.1;
    if (e.deltaY < 0) scale += zoomSpeed;
    else scale = Math.max(0.2, scale - zoomSpeed);

    drawCanvas();
});

// Touch events
canvas.addEventListener("touchstart", (e) => {
    if (!img) return;

    if (e.touches.length === 1) {
        const t = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        startX = t.clientX - rect.left - imgX;
        startY = t.clientY - rect.top - imgY;
        isDragging = true;
    } else if (e.touches.length === 2) {
        lastTouchDistance = getDistance(e.touches[0], e.touches[1]);
    }
});

canvas.addEventListener("touchmove", (e) => {
    if (!img) return;

    e.preventDefault();
    const rect = canvas.getBoundingClientRect();

    // Drag
    if (e.touches.length === 1 && isDragging) {
        const t = e.touches[0];
        imgX = t.clientX - rect.left - startX;
        imgY = t.clientY - rect.top - startY;
        drawCanvas();
    }

    // Pinch zoom
    if (e.touches.length === 2) {
        const dist = getDistance(e.touches[0], e.touches[1]);

        if (lastTouchDistance) {
            const zoomFactor = dist / lastTouchDistance;
            scale *= zoomFactor;

            if (scale < 0.2) scale = 0.2;
            if (scale > 5) scale = 5;

            drawCanvas();
        }

        lastTouchDistance = dist;
    }
});

canvas.addEventListener("touchend", () => {
    isDragging = false;
    lastTouchDistance = null;
});

// Distance function
function getDistance(t1, t2) {
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// Download the avatar
downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "avatar.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
