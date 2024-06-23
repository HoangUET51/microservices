import { Config } from "@/configs/common";
import { io } from "socket.io-client";

class _NotificationService {
  fireEvent(event: string, data: any) {
    const url = Config.APP_HOST;
    const socket = io(url);
    socket.emit(event, data);
  }
}

const NotificationService = new _NotificationService();

export default NotificationService;
