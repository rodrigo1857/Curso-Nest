import { connectToServer } from './socket-client'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket- Client</h1>
    <input id = 'jwt-token' placeholder ="Json Web Token" />
    <button id = "btn-connect">Connect</button>
    <span id = "server-status">offline</span>
    
    <ul id = "clients-ul"></ul>
    <form id = "message-form">
    <input id = "message-input" placeholder = "Escribe un mensaje"/>
    </form>
    
    <h3>Messages</h3>
     <ul id = "message-ul"></ul>
    </div>
    
`
const jwtToken= document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect= document.querySelector<HTMLInputElement>('#btn-connect')!;
//connectToServer();
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const inputToken = document.querySelector<HTMLInputElement>('#jwt-token')!;

btnConnect.addEventListener('click', () => {

  if(jwtToken.value.trim().length <= 0) return alert('Token is required');
  connectToServer(jwtToken.value.trim());
})