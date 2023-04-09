// add a copy button to each chatGPT response 

// Define the callback function to be executed when changes are detected
const callback = function (mutationList, observer) {
  // Select all response elements on the page
  const boxes = document.querySelectorAll('.text-base');

  // Iterate through each response and add a copy button
  boxes.forEach(box => {
    // don't inject button if it already exists
    if (box.querySelector('.injected-button')) {
      return;
    }

    const icons = box.querySelector('.self-end');
    const button = document.createElement('button');
    button.classList.add('injected-button');
    button.innerText = 'Copy';
    // Taken from the icon GPT uses for copying code
    button.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
    button.addEventListener('click', () => {
      const elements = box.querySelectorAll("*");
      const textArray = [];
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].innerText) {
          textArray.push(elements[i].innerText);
        }
      }
      const uniqueTextArray = [...new Set(textArray)];
      const text = uniqueTextArray.join('\n');
      navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
      }).catch(error => {
        console.error('Error copying text: ', error);
      });
    });
    icons.appendChild(button);
  });
};

// Create a new MutationObserver object
const observer = new MutationObserver(callback);

// Define the options for the observer
const options = {
  childList: true, // Observe changes to the child nodes of the target node
  subtree: true // Observe changes to the descendants of the target node
};

// Start observing changes to the target node
observer.observe(document.body, options);
