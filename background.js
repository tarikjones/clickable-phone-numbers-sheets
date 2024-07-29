chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "makePhoneNumbersClickable",
    title: "Make Phone Numbers Clickable",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "makePhoneNumbersClickable") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: makeSelectedNumbersClickable,
      args: [info.selectionText]
    });
  }
});

function makeSelectedNumbersClickable(selectedText) {
  const selectedNumbers = selectedText.split('\n').map(text => text.replace(/[^\d]/g, ""));
  const activeElement = document.activeElement;
  
  if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
    const start = activeElement.selectionStart;
    const end = activeElement.selectionEnd;
    let selectedContent = activeElement.value.substring(start, end);
    
    selectedNumbers.forEach(number => {
      selectedContent = selectedContent.replace(number, `=HYPERLINK("https://call.ctrlq.org/${number}", "${number}")`);
    });
    
    activeElement.setRangeText(selectedContent, start, end, "select");
  } else {
    // Handle other elements
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    selectedNumbers.forEach(number => {
      const link = document.createElement('a');
      link.href = `https://call.ctrlq.org/${number}`;
      link.textContent = number;
      range.deleteContents();
      range.insertNode(link);
    });
  }
}
