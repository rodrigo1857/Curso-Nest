import { connectToServer } from './socket-client'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket- Client</h1>
    <span id = "server-status">offline</span>
    
    <ul id = "clients-ul"></ul>
    <form id = "message-form">
    <input id = "message-input" placeholder = "Escribe un mensaje"/>
    </form>

    <h3>Messages</h3>
     <ul id = "message-ul"></ul>
    </div>
    
`
connectToServer();
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
