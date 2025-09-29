document.addEventListener("DOMContentLoaded", () => {
  // Get the saved title from storage
  chrome.storage.local.get("currentTitle", (data) => {
    const titleDiv = document.getElementById("title");
    if (data.currentTitle) {
      titleDiv.textContent = data.currentTitle;
    } else {
      titleDiv.textContent = "No title found.";
    }
  });
});
