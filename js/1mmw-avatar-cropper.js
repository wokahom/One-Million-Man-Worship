
let cropper;
const upload = document.getElementById("upload");
const cropImage = document.getElementById("cropImage");
const finalCanvas = document.getElementById("finalCanvas");
const templateOverlay = document.getElementById("templateOverlay");

upload.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  cropImage.src = URL.createObjectURL(file);
  cropImage.style.display = "block";

  if (cropper) cropper.destroy();

  cropper = new Cropper(cropImage, {
    viewMode: 1,
    dragMode: "move",
    aspectRatio: 1,
    autoCropArea: 1,
    background: false,
    guides: false,
    movable: true,
    zoomable: true,
    responsive: true,
  });
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  if (!cropper) {
    alert("Upload an image first!");
    return;
  }

  const ctx = finalCanvas.getContext("2d");

  ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);

  const croppedCanvas = cropper.getCroppedCanvas({
    width: 1080,
    height: 1080,
  });

  ctx.drawImage(croppedCanvas, 0, 0, 1080, 1080);

  const template = new Image();
  template.src = templateOverlay.src;

  template.onload = () => {
    ctx.drawImage(template, 0, 0, 1080, 1080);

    const link = document.createElement("a");
    link.download = "avatar.png";
    link.href = finalCanvas.toDataURL("image/png");
    link.click();
  };
});
