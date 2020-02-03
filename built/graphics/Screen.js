// https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const PIXEL_RATIO = (function () {
        const ctx = document.createElement("canvas").getContext("2d"), dpr = window.devicePixelRatio || 1, bsr = ctx["webkitBackingStorePixelRatio"] ||
            ctx["mozBackingStorePixelRatio"] ||
            ctx["msBackingStorePixelRatio"] ||
            ctx["oBackingStorePixelRatio"] ||
            ctx["backingStorePixelRatio"] || 1;
        return dpr / bsr;
    })();
    function createHiDPICanvas(w, h, ratio) {
        if (!ratio) {
            ratio = PIXEL_RATIO;
        }
        const can = document.createElement("canvas");
        can.width = w * ratio;
        can.height = h * ratio;
        can.style.width = w + "px";
        can.style.height = h + "px";
        let context = function () {
            const tmp = can.getContext("2d");
            if (tmp == null) {
                throw "CanvasRenderingContext2D is null";
            }
            return tmp;
        }();
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        can.id = "main";
        return can;
    }
    const windowWidth = window.innerWidth; //-18-25
    const windowHeight = window.innerHeight; // -6 //-18-10
    //Create canvas with the device resolution.
    const myCanvas = createHiDPICanvas(windowWidth, windowHeight, 0);
    const box = function () {
        const tmp = document.getElementById("box");
        if (tmp == null) {
            throw "Could not find element with id box";
        }
        return tmp;
    }();
    box.appendChild(myCanvas);
    exports.canvas = myCanvas;
    exports.ctx = function () {
        const tmp = myCanvas.getContext("2d");
        if (tmp == null) {
            throw "CanvasRenderingContext2D is null";
        }
        return tmp;
    }();
});
// end of stackoverflow code
//# sourceMappingURL=Screen.js.map