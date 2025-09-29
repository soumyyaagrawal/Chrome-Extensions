document.addEventListener("DOMContentLoaded", function () {
    let [tab] =  chrome.tabs.query({ active: true, currentWindow: true });


chrome.scripting.executeScript(
    {
        target: { tabId: tab.id },
        func:()=>

            document.title,
        
    },
    (results) => {
        if(results && results[0])
        document.getElementById("title").textContent = results[0].result;
    else
        document.getElementById("title").textContent = "No title found";
    }

);




});


