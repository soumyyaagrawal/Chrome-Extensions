function highlightWord(word) {
  if (!word) return;

  const regex = new RegExp(word, "gi");

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;

  while ((node = walker.nextNode())) {
    if (regex.test(node.nodeValue)) {
      const span = document.createElement("span");
      span.innerHTML = node.nodeValue.replace(
        regex,
        `<span class="my-highlight" style="background-color: yellow;">$&</span>`
      );
      node.parentNode.replaceChild(span, node);
    }
  }
}

function removeHighlights() {
  const highlights = document.querySelectorAll("span.my-highlight");
  highlights.forEach((span) => {
    // Replace the <span> with just its text
    span.replaceWith(span.textContent);
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "highlight") {
    highlightWord(message.word);
  }
  if (message.action === "removeHighlights") {
    removeHighlights();
  }
});
