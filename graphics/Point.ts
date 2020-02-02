import { Hex } from "./Hex";
import { Config } from "../Config";
import { assert } from "../util";

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
    constructor(col: number, row: number) {
        assert(parseInt(col + '') == col && parseInt(row + '') == row, "Must be integers");
        super(col, row);
    }

    toAbsPoint() {
        var p = Hex.hexGridToPxUnshifted(this.y, this.x);
        return new AbsPoint(p.x, p.y);
    }

    toRelPoint() {
        var p = Hex.hexGridToPx(this.y, this.x);
        return new RelPoint(p.x, p.y);
    }

    isNeighbor(other: HexPoint): boolean {
        if (other.x == this.x && other.y == this.y + 1) {
            return true;
        }
        if (other.x == this.x && other.y == this.y - 1) {
            return true;
        }
        if (Math.abs(this.x % 2) == Math.abs(this.y % 2)) {
            // check right
            if (other.x == this.x + 1 && other.y == this.y) {
                return true;
            }
        }
        else {
            // check left
            if (other.x == this.x - 1 && other.y == this.y) {
                return true;
            }
        }

        return false;
    }

    isEqual(other: HexPoint): boolean {
        return (other.x == this.x && other.y == this.y);
    }
}

export class AbsPoint extends Point {
    constructor(x: number, y: number) {
        super(x, y);
    }

    toRelPoint() {
        return new RelPoint(this.x + currLocation.x, this.y + currLocation.y);
    }

    toAbsPoint() {
        return new AbsPoint(this.x, this.y);
    }

    toHexPoint() {
        return Hex.pxUnshiftedToHexGrid(this.x, this.y);
    }
}

export class RelPoint extends Point {
    constructor(x: number, y: number) {
        super(x, y);
    }

    toRelPoint() {
        return new RelPoint(this.x, this.y);
    }

    toAbsPoint() {
        return new AbsPoint(this.x - currLocation.x, this.y - currLocation.y);
    }

    toHexPoint() {
        var p = this.toAbsPoint();
        return Hex.pxUnshiftedToHexGrid(p.x, p.y);
    }

    toDualHexPoint(): Array<HexPoint> {
        var p = this.toAbsPoint();
        var h = Hex.pxUnshiftedToDualHexGrid(p.x, p.y);

        return h;
    }
}

