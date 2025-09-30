// background.js

// Helper that tries to store a title, with a console trace
function storeTitle(tabId, titleSource, title) {
  console.log("storeTitle()", { tabId, titleSource, title });
  if (title && title.trim()) {
    chrome.storage.local.set({ currentTitle: title });
  }
}

// Called when tab updates (navigation / load)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("onUpdated:", { tabId, changeInfo, tab });

  // We wait until load is complete (status === 'complete')
  if (changeInfo.status === "complete") {
    // Try to get the freshest tab info
    chrome.tabs.get(tabId, (freshTab) => {
      if (chrome.runtime.lastError) {
        console.warn("chrome.tabs.get error:", chrome.runtime.lastError);
        return;
      }

      const titleFromChange = changeInfo.title;
      const titleFromTab = freshTab && freshTab.title;

      if (titleFromChange) {
        storeTitle(tabId, "changeInfo.title", titleFromChange);
        return;
      }

      if (titleFromTab) {
        storeTitle(tabId, "tabs.get title", titleFromTab);
        return;
      }

      // Fallback: inject a tiny script to read document.title (requires host_permissions)
      chrome.scripting.executeScript(
        {
          target: { tabId },
          func: () => document.title
        },
        (results) => {
          const pageTitle = results && results[0] && results[0].result;
          storeTitle(tabId, "injected document.title", pageTitle);
        }
      );
    });
  }
});

// Called when user switches active tab
chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log("onActivated:", activeInfo);
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (chrome.runtime.lastError) {
      console.warn("chrome.tabs.get error (onActivated):", chrome.runtime.lastError);
      return;
    }

    const title = tab && tab.title;
    if (title) {
      storeTitle(activeInfo.tabId, "onActivated tabs.get title", title);
      return;
    }

    // fallback to injection if title missing
    chrome.scripting.executeScript(
      { target: { tabId: activeInfo.tabId }, func: () => document.title },
      (results) => {
        const pageTitle = results && results[0] && results[0].result;
        storeTitle(activeInfo.tabId, "onActivated injected", pageTitle);
      }
    );
  });
});
