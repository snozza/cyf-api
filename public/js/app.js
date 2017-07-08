(() => {

  const sayButton = document.querySelector('.say-button');
  const textBox = document.querySelector('.text-box');

  function typeIntro() {
    const HEADER_SELECTOR = '.intro .highlight';
    let subtitle;

    function speed () {
      return Math.random() * 200 + 20;
    }

    function pushLetter () {
      const header = document.querySelector(HEADER_SELECTOR);
      const text = header.textContent;
      if (text.length === subtitle.length) {
        return;
      }
      header.textContent = text + subtitle[text.length];
      setTimeout(pushLetter, speed());
    }

    const header = document.querySelector(HEADER_SELECTOR);
    subtitle = header.textContent;
    header.textContent = '';
    setTimeout(pushLetter, speed());
  }

  function getTalk() {
    const request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          textBox.innerHTML = request.responseText;
        } else {
          textBox.innerHTML = `Something went wrong with your request: ${request.status} ${request.statusText}`;
        }
      }
    }
    const url = 'http://localhost:3000/chatroom?id=cyf';
    request.open('GET', url);
    request.setRequestHeader('Accepts', 'text/plain');
    request.send();
  }

  sayButton.addEventListener('click', getTalk);
  typeIntro();
})();
