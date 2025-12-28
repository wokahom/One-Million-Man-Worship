 type="module"
import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const form = document.getElementById("testimonyForm");
const popup = document.getElementById("successPopup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const testimony = document.getElementById("testimony").value;

  const imageFile = document.getElementById("imageUpload").files[0];
  const videoFile = document.getElementById("videoUpload").files[0];

  let imageURL = "";
  let videoURL = "";

  // Upload image
  if (imageFile) {
    const imgRef = ref(storage, "testimonies/images/" + imageFile.name);
    await uploadBytes(imgRef, imageFile);
    imageURL = await getDownloadURL(imgRef);
  }

  // Upload video
  if (videoFile) {
    const vidRef = ref(storage, "testimonies/videos/" + videoFile.name);
    await uploadBytes(vidRef, videoFile);
    videoURL = await getDownloadURL(vidRef);
  }

  await addDoc(collection(db, "testimonies"), {
    name,
    location,
    testimony,
    imageURL,
    videoURL,
    approved: false,
    createdAt: Date.now()
  });

  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);

  form.reset();
});
