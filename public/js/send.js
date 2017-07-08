(() => {

  const sayButton = document.querySelector('.say-button');
  const textBox = document.querySelector('.text-box');
  const msgInput = document.querySelector('input[name=message]');

  function sendTalk(e) {
    e.preventDefault();
    const request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          textBox.innerHTML = request.responseText;
        } else {
          console.log(request);
          textBox.innerHTML = `Something went wrong with your request:
          ${request.status} ${request.statusText}<br>${request.responseText}`;
        }
      }
    }
    const url = '/chatroom?id=cyf';
    const params = msgInput.value;
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'text/plain');
    request.send(params);
  }

  sayButton.addEventListener('click', sendTalk);
})();
