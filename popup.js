document.getElementById('makeClickable').addEventListener('click', () => {
    chrome.scripting.executeScript({
      target: { allFrames: true },
      files: ['content.js']
    });
  });
  