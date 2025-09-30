function highlightWord(word) {
  if (!word) return;

  const regex = new RegExp(word, "gi");

  function walk(node) {
    // Only work with text nodes
    if (node.nodeType === 3) {
      const matches = node.nodeValue.match(regex);
      if (matches) {
        const span = document.createElement("span");
        span.innerHTML = node.nodeValue.replace(regex, (match) => {
          return `<span style="background-color: yellow;">${match}</span>`;
        });
        node.replaceWith(...span.childNodes);
      }
    } else if (node.nodeType === 1 && node.tagName !== "SCRIPT" && node.tagName !== "STYLE") {
      // Go deeper into child nodes
      for (let i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i]);
      }
    }
  }

  walk(document.body);
}





function removeHighlights() {
  const highlights = document.querySelectorAll("span[style='background-color: yellow;']");
  highlights.forEach((span) => {
    const parent = span.parentNode;
    parent.replaceChild(document.createTextNode(span.innerText), span);
  });
}

// Listen for popup.js sending highlight request
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "highlight") {
    highlightWord(message.word);
  }
    if (message.action === "removeHighlights") {
    removeHighlights();
  }
});
