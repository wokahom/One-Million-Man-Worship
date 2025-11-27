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

// Drag control
let isDragging = false;
let startX, startY;

// Pinch-zoom control
let lastTouchDistance = null;

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
        scale = Math.max(
            (radius * 2) / img.width,
            (radius * 2) / img.height
        );

        imgX = circleX;
        imgY = circleY;

        draw();
    };
});

// Mouse drag events
canvas.addEventListener("mousedown", (e) => startDrag(e));
canvas.addEventListener("mousemove", (e) => drag(e));
canvas.addEventListener("mouseup", () => stopDrag());
canvas.addEventListener("mouseleave", () => stopDrag());

// Touch events (drag + pinch)
canvas.addEventListener("touchstart", (e) => handleTouchStart(e));
canvas.addEventListener("touchmove", (e) => handleTouchMove(e));
canvas.addEventListener("touchend", () => {
    isDragging = false;
    lastTouchDistance = null;
});

// Zoom with mouse wheel
canvas.addEventListener("wheel", function (e) {
    if (!img) return;

    e.preventDefault();
    const zoomSpeed = 0.1;

    if (e.deltaY < 0) {
        scale += zoomSpeed;
    } else {
        scale = Math.max(0.2, scale - zoomSpeed);
    }

    draw();
});

// ---------------------------
// DRAG CONTROL
// ---------------------------
function startDrag(e) {
    if (!img) return;
    isDragging = true;
    startX = e.offsetX - imgX;
    startY = e.offsetY - imgY;
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

// ---------------------------
// TOUCH + PINCH CONTROL
// ---------------------------

function getDistance(t1, t2) {
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function handleTouchStart(e) {
    if (!img) return;

    if (e.touches.length === 1) {
        // Single finger → drag
        const t = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        startX = t.clientX - rect.left - imgX;
        startY = t.clientY - rect.top - imgY;
        isDragging = true;
    } else if (e.touches.length === 2) {
        // Two fingers → pinch
        lastTouchDistance = getDistance(e.touches[0], e.touches[1]);
    }
}

function handleTouchMove(e) {
    if (!img) return;

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    if (e.touches.length === 1 && isDragging) {
        const t = e.touches[0];
        imgX = t.clientX - rect.left - startX;
        imgY = t.clientY - rect.top - startY;
        draw();
    }

    if (e.touches.length === 2) {
        const newDistance = getDistance(e.touches[0], e.touches[1]);

        if (lastTouchDistance) {
            const zoomFactor = newDistance / lastTouchDistance;
            scale *= zoomFactor;

            if (scale < 0.2) scale = 0.2;
            if (scale > 5) scale = 5;

            draw();
        }

        lastTouchDistance = newDistance;
    }
}

// Download
downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "avatar.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
