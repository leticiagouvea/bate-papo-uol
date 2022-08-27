let yourName;
let receiver = "Todos";
let typeText = "message";

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

    if (error.reponse.status === 400) {
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
                <p class="time">(${messages[i].time})</p>
                <p class="from">${messages[i].from}</p>
                <p class="message">${messages[i].text}</p>
            </div>
            `
        } 

        if (messages[i].type === 'message') {

            container.innerHTML += `
            <div class="public">
                <p class="time">(${messages[i].time})</p>
                <p class="from">${messages[i].from}</p>para
                <p class="to">${messages[i].to}</p>
                <p class="message">${messages[i].text}</p>
            </div>
            `
        }

        if (messages[i].type === 'private_message') {

            container.innerHTML += `
            <div class="reserved">
                <p class="time">(${messages[i].time})</p>
                <p class="from">${messages[i].from}</p>para
                <p class="to">${messages[i].to}</p>
                <p class="message">${messages[i].text}</p>
            </div>
            `
        }
    }
    scrollBack();
}

function scrollBack() {
    const scroll = document.querySelector('.conteudo div:last-child').scrollIntoView();
}

function sendMessage() {

    const chat = document.querySelector('.send-message textarea').value;
    const clean = document.querySelector('textarea');

    const postChat = {
        from: yourName,
        to: receiver,
        text: chat,
        type: typeText
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', postChat);
    promise.catch(offline) 

    clean.value = "";
}

function offline() {
    alert('Você está offline. Faça o login novamente')
    window.location.reload()
}

document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {

        const button = document.querySelector('.enter-icon');
        button.click();
    }
});