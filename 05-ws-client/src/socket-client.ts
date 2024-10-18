import { Manager, Socket } from "socket.io-client"

export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');
    const socket = manager.socket('/')
    console.log({socket});
    addListeners(socket);

}

const addListeners = (socket:Socket) => {
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!;
    socket.on('connect', () => {
       console.log('Conectado al servidor') 
    })

    socket.on('disconnect', () => {
        console.log('Desconectado del servidor') 
     })

     socket.on('clients-updated', (clients:string[]) => {

        let clientsHtml = ''
        clients.forEach(clientId => {
            clientsHtml += `<li>${clientId}</li>`
        })

        clientsUl.innerHTML = clientsHtml;
    })
}

