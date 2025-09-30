  document.addEventListener("DOMContentLoaded", () => {
    // Get the saved title from storage
    chrome.storage.local.get("currentTitle", (data) => {
      const titleDiv = document.getElementById("title");
      titleDiv.textContent = data.currentTitle || "No title found.";
    });

    const saveButton = document.getElementById("savetitle");
    saveButton.addEventListener("click", () => {
      chrome.storage.local.get(["titlearray", "currentTitle"], (data) => {
        const titleToSave = data.currentTitle || "No title found.";
        const titlearray= data.titlearray || [];
        titlearray.push(titleToSave);
        console.log("titlearray:", titlearray);


        // Save the title to storage
        chrome.storage.local.set({ titlearray: titlearray }, () => {
          console.log("Title saved:", titleToSave);
          const titleArrayDiv = document.getElementById("titlearray");

          chrome.storage.local.get("titlearray", (data) => {
            const titlearray = data.titlearray || [];
            titleArrayDiv.textContent = "Saved Titles: " + titlearray.join(", ");
          });
        });
      });
    });




  });
