  document.addEventListener("DOMContentLoaded", () => {
    // Get the saved title from storage
   const notesDiv = document.getElementById("notesinput");
   const clrButton = document.getElementById("clr");

   
   notesDiv.addEventListener("input", () => {
   const text= notesDiv.value;
   chrome.storage.local.set({ currentNotes: text });
    chrome.storage.local.get("currentNotes", (data) => {
           const arr= data.savedNotes || [];
           arr.push(data.currentNotes);
              chrome.storage.local.set({ savedNotes: arr });
    });
   });
   clrButton.addEventListener("click", () => {
       chrome.storage.local.set({ savedNotes: [] });
       notesDiv.value = "";
   });

   chrome.storage.local.get("savedNotes", (data) => {
       notesDiv.value = data.savedNotes || "No notes found.";
       });
      
  });


