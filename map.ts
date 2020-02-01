
import grid = require("./grid");
import screen = require("./screen");
//import { Biomes, ResourceType } from "./dataTypes";
import { GameMap } from "./map/GameMap";
var ctx = screen.ctx;

export function main() {
    var ls = new GameMap(3);
    
    ls.drawMap(ctx);
}
main();
