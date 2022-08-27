let yourName;

whatsYourName();
function whatsYourName() {
    yourName = prompt('Qual é o seu lindo nome?');

    const nameLogin = {
        name: yourName
    };

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nameLogin);

    promise.then(enter);
    promise.catch(notEnter);
}

function enter() {
    fetchMessages();

    setInterval(keepConnected, 5000);

    setInterval(fetchMessages, 3000);
}

function notEnter(error) {
    if(error.reponse.status === 400) {
        alert('Esse usuário já existe. Digite um novo nome.');
    }
}

function keepConnected() {
    const nameLogin = {
        name: yourName
    };

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nameLogin);
}

function fetchMessages() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    promise.then(renderMessage);
}

function renderMessage(response) {

    const container = document.querySelector('.conteudo');
    const messages = response.data;

    container.innerHTML = "";

    for (let i = 0; i < messages.length; i++) {
        
        if (messages[i].type === 'status') {
            
            container.innerHTML += `
            <div class="status">
                <span class="time">${messages[i].time}</span>
                <span class="remetente">${messages[i].from}</span>
                <span class="message">${messages[i].text}</span>
            </div>
            `
        } 

        if (messages[i].type === 'message') {

            container.innerHTML += `
            <div class="public">
                <span class="time">${messages[i].time}</span>
                <span class="remetente">${messages[i].from}</span>para
                <span class="destinatario">${messages[i].to}</span>
                <span class="message">${messages[i].text}</span>
            </div>
            `
        }

        if (messages[i].type === 'private_message') {

            container.innerHTML += `
            <div class="reserved">
                <span class="time">${messages[i].time}</span>
                <span class="remetente">${messages[i].from}</span>para
                <span class="destinatario">${messages[i].to}</span>
                <span class="message">${messages[i].text}</span>
            </div>
            `
        }
    }

    const scroll = document.querySelector('.conteudo div:last-child').scrollIntoView();
}