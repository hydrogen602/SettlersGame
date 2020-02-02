// https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PIXEL_RATIO = (function () {
        var ctx = document.createElement("canvas").getContext("2d"), dpr = window.devicePixelRatio || 1, bsr = ctx["webkitBackingStorePixelRatio"] ||
            ctx["mozBackingStorePixelRatio"] ||
            ctx["msBackingStorePixelRatio"] ||
            ctx["oBackingStorePixelRatio"] ||
            ctx["backingStorePixelRatio"] || 1;
        return dpr / bsr;
    })();
    var createHiDPICanvas = function (w, h, ratio) {
        if (!ratio) {
            ratio = PIXEL_RATIO;
        }
        var can = document.createElement("canvas");
        can.width = w * ratio;
        can.height = h * ratio;
        can.style.width = w + "px";
        can.style.height = h + "px";
        can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
        can.id = "main";
        return can;
    };
    var windowWidth = window.innerWidth; //-18-25
    var windowHeight = window.innerHeight; // -6 //-18-10
    //Create canvas with the device resolution.
    var myCanvas = createHiDPICanvas(windowWidth, windowHeight, undefined);
    var box = document.getElementById("box");
    box.appendChild(myCanvas);
    exports.canvas = myCanvas;
    exports.ctx = myCanvas.getContext("2d");
});
// end of stackoverflow code
//# sourceMappingURL=Screen.js.map