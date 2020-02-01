
export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

// offset of map on screen in order to move around the map
export var currLocation = new Point(100, 100); // in px

