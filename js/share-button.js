document.getElementById("shareBtn").addEventListener("click", async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: "Create Your Avatar",
                text: "Try this amazing avatar generator!",
                url: window.location.href
            });
            console.log("Shared successfully!");
        } catch (error) {
            console.log("Share cancelled or failed", error);
        }
    } else {
        alert("Your browser does not support sharing.");
    }
});
