import BaseSocket from "@/base/base.socket";
import { EVENTS } from "@/constants/common.const";
import { Socket } from "socket.io";

class Notification extends BaseSocket {
  handler(socket: Socket, data: any) {
    socket.broadcast.emit(EVENTS.SEND_NOTIFY, data);
  }
}

const notification = new Notification(EVENTS.SEND_NOTIFY);

export { Notification, notification };
