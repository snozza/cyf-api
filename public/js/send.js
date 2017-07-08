(() => {

  const sayButton = document.querySelector('.say-button');
  const textBox = document.querySelector('.text-box');
  const msgInput = document.querySelector('input[name=message]');

  function sendTalk(e) {
    e.preventDefault();
    const params = msgInput.value;
    if (!params) {
      return;
    }
    const request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          textBox.innerText = request.responseText;
        } else {
          textBox.innerText = `Something went wrong with your request:
          ${request.status} ${request.statusText}
          ${request.responseText}`;
        }
      }
    }
    const url = '/chatroom?id=cyf';
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'text/plain');
    request.send(params);
  }

  sayButton.addEventListener('click', sendTalk);
})();
