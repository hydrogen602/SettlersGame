
import grid = require("./grid");
import screen = require("./screen");
var ctx = screen.ctx;

var x: number = 4;
var y: number = 4;

function assert(condition: boolean, message: string) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

//import { strokeHex } from "./grid"
//import { ctx } from "./screen"

enum ResourceType {
    Desert = 1,
    Grassland,
    Forest,
    Mountain,
    Farmland,
    Quarry
}

class Tile {
    p: grid.Point;
    resourceType: ResourceType;
    diceValue: number;

    constructor(location: grid.Point, resource: ResourceType, diceValue: number) {
        assert(parseInt(diceValue.toString()) == diceValue, "diceValue should be an integer")

        this.p = location;
        this.resourceType = resource;
        this.diceValue = diceValue;
    }

    strokeTile(ctx: CanvasRenderingContext2D) {
        if (this.resourceType == ResourceType.Forest) {
            ctx.strokeStyle = "green";
        }
        if (this.resourceType == ResourceType.Quarry) {
            ctx.strokeStyle = "red";
        }
        grid.strokeHex(this.p.y + y, this.p.x + x, ctx);
    }
}

class GameMap {
    sz: number;

    constructor(size: number) {
        this.sz = size;
    }
}

function generateMap(n: number, ctx: CanvasRenderingContext2D): Array<Tile> {

    n = 4;

    var nP: number = (n - 1) / 2;
    var nP2: number = (n - 2) / 2;

    var tiles = []
    
    ctx.strokeStyle = "red"
    for (var j = 0; j < n; j++) {

        var addition: number = - Math.abs(j - nP) + nP;
        
        for (var i = -addition; i < n + addition; i++) {
            tiles.push(new Tile(new grid.Point(2*j, 2*i), ResourceType.Forest, 0));

            //grid.strokeHex(2*i + y, 2*j + x, ctx);
        }
    }

    ctx.strokeStyle = "green"
    for (var j = 0; j < n - 1; j++) {

        var addition: number = - Math.abs(j - nP2) + nP2;

        for (var i = -addition; i <= n + addition; i++) {
            tiles.push(new Tile(new grid.Point(2*j + 1, 2*i - 1), ResourceType.Quarry, 0));

            //grid.strokeHex(2*i - 1 + y, 2*j + 1 + x, ctx);
        }
    }


    return tiles;
}

export function main() {
    var ls = generateMap(3, ctx);
    ls.forEach(e => {
        e.strokeTile(ctx);
    });
    //ctx.fillStyle = 'rgb(255, 0, 0)'
    //grid.strokeHex(1, 4, ctx);
    
}
main();
