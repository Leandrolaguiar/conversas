var login_info = document.getElementsByClassName("login")[0];
var login_input = document.getElementsByClassName("login_input")[0];
var login_button = document.getElementsByClassName("input_button")[0];
var chat_info = document.getElementsByClassName("chat")[0];
var chat_txt = document.getElementsByClassName("chat_input")[0];
var chat_button = document.getElementsByClassName("chat_button")[0];
var chat_mensagem = document.getElementsByClassName("mensagens")[0];
var um = document.getElementsByClassName("recebida")[0];

let websocket;

const user = { id: "", nome: "" };


const criarmensagemenviada = (conteudo, username) => {
    
    if (username == login_input.value) {
        const div = document.createElement("div");
        div.classList.add("mensagemenviada")

        const teste = document.createElement("span");
        teste.classList.add("nome")
        teste.innerHTML = "você";

        div.innerHTML += `${teste.innerText}: ${conteudo}`;
        return div;
    }

    else {
        const div = document.createElement("div");
        const teste = document.createElement("span");

        div.classList.add("mensagemrecebida")
        teste.classList.add("nome")

        teste.innerHTML = username;
        console.log(teste)

        div.innerHTML += `${teste.innerText}: ${conteudo}`;
        return div;
    }
};



const Mensagem_processada = ({ data }) => {
    const { userid, username, conteudo } = JSON.parse(data);
    const element = criarmensagemenviada(conteudo, username);
    
    chat_mensagem.appendChild(element);
    
};


const handleSubmit = (event) => {
    event.preventDefault();
    user.id = crypto.randomUUID();
    user.nome = login_input.value;
    login_info.style.display = "none";
    chat_info.style.display = "flex";
    websocket = new WebSocket("ws://localhost:8080");
    websocket.onopen = () => websocket.send(`O usuário ${user.nome} entrou`);
    websocket.onmessage = Mensagem_processada;
    console.log(user);
};

const sendMensagem = (event) => {
    event.preventDefault();
    const mensagem = {
        userid: user.id,
        username: user.nome,
        conteudo: chat_txt.value
    };
    websocket.send(JSON.stringify(mensagem));
    console.log(`O usuário ${mensagem.username} enviou a mensagem "${mensagem.conteudo}"`);
    chat_txt.value = "";
};

login_button.addEventListener("click", handleSubmit);
chat_button.addEventListener("click", sendMensagem);