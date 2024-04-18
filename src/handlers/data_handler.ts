import { Server, Socket } from "socket.io";
import { Events } from "../constants/Events";

export function dataHandler (io: Server, socket : Socket) {

    const sendMessage = (payload: any) => {
        try {
            console.log(payload);
            io.emit(Events.SEND_MESSAGE, payload);
        } catch (error : any ) {
            throw new Error(error.message);
        }
    }
    socket.on(Events.SEND_DATA, sendMessage);
}