document.addEventListener("DOMContentLoaded", () => {
  const highlightButton = document.getElementById("highlight");
  const input = document.getElementById("wordInput");
  const removeHighlightsButton = document.getElementById("removeHighlights");

  highlightButton.addEventListener("click", () => {
    const word = input.value;

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "highlight", word: word });
    });
  });

removeHighlightsButton.addEventListener("click", () => {
    // Reload the page to remove highlights
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "removeHighlights" });
    });
  });







});
