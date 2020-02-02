// https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas

const PIXEL_RATIO = (function () {
    const ctx: any = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr: any = ctx["webkitBackingStorePixelRatio"] ||
              ctx["mozBackingStorePixelRatio"] ||
              ctx["msBackingStorePixelRatio"] ||
              ctx["oBackingStorePixelRatio"] ||
              ctx["backingStorePixelRatio"] || 1;

    return dpr / bsr;
})();


function createHiDPICanvas(w: number, h: number, ratio: number) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    const can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);

    can.id = "main";
    return can;
}

const windowWidth = window.innerWidth //-18-25
const windowHeight = window.innerHeight // -6 //-18-10

//Create canvas with the device resolution.
const myCanvas = createHiDPICanvas(windowWidth, windowHeight, undefined);

const box = document.getElementById("box");

box.appendChild(myCanvas);

export const canvas = myCanvas;

export const ctx = myCanvas.getContext("2d");

// end of stackoverflow code