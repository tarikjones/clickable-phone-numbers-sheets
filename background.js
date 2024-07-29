chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: makePhoneNumbersClickable
    });
  });
  
  function makePhoneNumbersClickable() {
    let phoneColumnIndex = 4; // E column is index 4 (zero-based index)
    let sheet = document.querySelector('.waffle');
    if (!sheet) return;
  
    let rows = sheet.querySelectorAll('tr');
    rows.forEach(row => {
      let cells = row.querySelectorAll('td');
      if (cells.length > phoneColumnIndex) {
        let phoneCell = cells[phoneColumnIndex];
        let phoneNumber = phoneCell.textContent.replace(/[^\d]/g, "");
        if (phoneNumber) {
          phoneCell.innerHTML = `<a href="tel:${phoneNumber}">${phoneCell.textContent}</a>`;
        }
      }
    });
  }
  