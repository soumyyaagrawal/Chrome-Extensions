import crxLogo from '@/assets/crx.svg'
import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.svg'
import HelloWorld from '@/components/HelloWorld'
import Tesseract from 'tesseract.js';
import './App.css'

// App.jsx
export default function App() {
  async function handleExtractClick() {
    console.log("Extract button clicked ✅");

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("Active tab:", tab);

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: extractTextFromPage,
      },
      (results) => {
        console.log("Execution results:", results);
        if (results && results[0] && results[0].result) {
          document.getElementById("output").textContent = results[0].result;
        } else {
          document.getElementById("output").textContent =
            "⚠️ No text extracted.";
        }
      }
    );
  }

  function extractTextFromPage() {
    console.log("Running extractTextFromPage inside webpage ✅");
   const canvas = document.querySelector("canvas");
  if (!canvas) {
    return "⚠️ No canvas found on this page.";
  }

  const dataUrl = canvas.toDataURL("image/png");

  // IMPORTANT: This needs to be async
  return new Promise((resolve) => {
    Tesseract.recognize(
      dataUrl,
      'eng',
      { logger: info => console.log(info) }
    ).then(({ data: { text } }) => {
      resolve(text);
    });
  });
}

  return (
    <div>
      <button onClick={handleExtractClick}>Extract Text</button>
      <pre id="output"></pre>
    </div>
  );
}
  