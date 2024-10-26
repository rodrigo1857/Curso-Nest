import { Manager, Socket } from "socket.io-client"

let socket:Socket;
export const connectToServer = (token: string) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js',{
        extraHeaders: {
            hola : 'mundo',
            authentication : token
        }
    });

    socket?.removeAllListeners();
    
    socket = manager.socket('/')
    console.log({socket});
    addListeners();

}

const addListeners = () => {
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!;

    const  messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messageUl = document.querySelector('#message-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'connected'
    })

    socket.on('disconnect', () => {
        console.log('Desconectado del servidor') 
        serverStatusLabel.innerHTML = 'disconnected'
     })

     socket.on('clients-updated', (clients:string[]) => {
        console.log(({clients}))

        let clientsHtml = ''
        clients.forEach(clientId => {
            clientsHtml += `<li>${clientId}</li>`
        })

        clientsUl.innerHTML = clientsHtml;
    })

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if( messageInput.value.trim().length <= 0 ) return;
        socket.emit('message-from-client', { 
            id: 'YO!!', 
            message: messageInput.value 
        });

        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: {fullName:string, message: string }) => {
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span> ${payload.message} </span>
            </li> 
        `;

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messageUl.append(li);
    })
}

