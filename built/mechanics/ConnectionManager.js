define(["require", "exports", "../Config", "../util"], function (require, exports, Config_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // ws = new WebSocket('ws://127.0.0.1:5050')
    class ConnectionManager {
        constructor() {
            ConnectionManager.instance = this;
            this.url = 'ws://' + Config_1.Config.getIP() + ":" + Config_1.Config.getPort();
            this.ws = new WebSocket(this.url);
            this.ws.onmessage = function (e) {
                ConnectionManager.instance.onmessage(e);
            };
            this.ws.onopen = function (ev) {
                ConnectionManager.instance.onopen(ev);
            };
            this.testPhase = -1;
            util_1.defined(this.url);
            util_1.defined(this.ws);
        }
        ready() {
            // passed tests
            return this.testPhase == 2;
        }
        send(o) {
            const msg = JSON.stringify(o);
            this.ws.send(msg);
        }
        onopen(ev) {
            this.ws.send('Hi');
            this.testPhase = 0;
        }
        onmessage(e) {
            if (this.testPhase == 0 && e.data == "Hello") {
                this.testPhase = 1;
                console.log("Successful Echo, Server is alive!");
                this.send({ "test": "verify" });
            }
            else {
                try {
                    const obj = JSON.parse(e.data);
                    if (this.testPhase == 1 && "test" in obj && obj["test"] == "echo verified") {
                        this.testPhase = 2;
                        console.log("JSON echo success");
                    }
                    if ("update" in obj) {
                        // update
                        console.log("got msg");
                        console.log(obj);
                    }
                }
                catch (SyntaxError) {
                    // not json
                }
            }
        }
    }
    exports.ConnectionManager = ConnectionManager;
    const c = new ConnectionManager();
});
//# sourceMappingURL=ConnectionManager.js.map