define(["require", "exports", "../Config", "../util"], function (require, exports, Config_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // ws = new WebSocket('ws://127.0.0.1:5050')
    class ConnectionManager {
        constructor() {
            this.url = 'ws://' + Config_1.Config.getIP() + ":" + Config_1.Config.getPort();
            this.ws = new WebSocket(this.url);
            this.ws.onmessage = this.messageHandler;
            this.ws.onopen = this.openHandler;
            this.testPhase = -1;
            util_1.defined(this.url);
            util_1.defined(this.ws);
        }
        openHandler(ev) {
            this.ws.send('Hi');
            this.testPhase = 0;
        }
        messageHandler(e) {
            if (this.testPhase && e.data == "Hello") {
                this.testPhase = 1;
                console.log("Successful Echo, Server is alive!");
            }
            console.log(e.data);
        }
    }
    exports.ConnectionManager = ConnectionManager;
    const c = new ConnectionManager();
});
//# sourceMappingURL=ConnectionManager.js.map