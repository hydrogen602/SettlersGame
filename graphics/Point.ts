import { Hex } from "./Hex";
import { Config } from "../Config";

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

// offset x = 1.5x-0.5

// offset of map on screen in order to move around the map
export var currLocation = new Point(
    window.innerWidth / 2 - Hex.getSideLength() * (1.5 * Config.getN() - 0.5), 
    window.innerHeight / 2 - Hex.getApothem() * Config.getN()); // in px

export const centerOfScreen = new Point(
    window.innerWidth / 2 - Hex.getSideLength() * (1.5 * Config.getN() - 0.5), 
    window.innerHeight / 2 - Hex.getApothem() * Config.getN()); // in px

export const maxDistance = Hex.getSideLength() * (1.5 * Config.getN() - 0.5) * 1.5;

export class HexPoint extends Point {
    constructor(x: number, y: number) {
        super(x, y);
    }

    toAbsPoint() {
        var p = Hex.hexGridToPxUnshifted(this.y, this.x);
        return new AbsPoint(p.x, p.y);
    }

    toRelPoint() {
        var p = Hex.hexGridToPx(this.y, this.x);
        return new RelPoint(p.x, p.y);
    }
}

export class AbsPoint extends Point {
    constructor(x: number, y: number) {
        super(x, y);
    }

    toRelPoint() {
        return new RelPoint(this.x + currLocation.x, this.y + currLocation.y);
    }
}

export class RelPoint extends Point {
    constructor(x: number, y: number) {
        super(x, y);
    }

    toAbsPoint() {
        return new AbsPoint(this.x - currLocation.x, this.y - currLocation.y);
    }
}

