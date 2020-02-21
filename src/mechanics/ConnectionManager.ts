import { Config } from "../Config"
import { defined } from "../util";

// ws = new WebSocket('ws://127.0.0.1:5050')

export class ConnectionManager {

    private ws: WebSocket
    private url: string;

    private testPhase: number;

    constructor() {
        this.url = 'ws://' + Config.getIP() + ":" + Config.getPort();
        this.ws = new WebSocket(this.url);

        this.ws.onmessage = this.messageHandler;

        this.ws.onopen = this.openHandler;

        this.testPhase = -1;

        defined(this.url);
        defined(this.ws);
    }

    openHandler(ev: Event) {
        this.ws.send('Hi');
        this.testPhase = 0;
    }

    messageHandler(e: MessageEvent) {
        if (this.testPhase && e.data == "Hello") {
            this.testPhase = 1;
            console.log("Successful Echo, Server is alive!");
        }
        console.log(e.data);
    }
}

const c = new ConnectionManager();
