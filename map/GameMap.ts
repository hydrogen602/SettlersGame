import { HexPoint, RelPoint } from "../graphics/Point";
import { Tile } from "./Tile";
import { defined, assert } from "../util";
import { Settlement } from "./Settlement";
import { canvas } from "../graphics/Screen";
import { Player } from "../mechanics/Player";

export class GameMap {
    private sz: number;
    private tilesArr: Array<Tile>;
    private settlementsArr: Array<Settlement>;
    private ctx: CanvasRenderingContext2D;

    // offset of map on screen in order to move around the map
    currLocation: RelPoint;

    constructor(size: number, ctx: CanvasRenderingContext2D) {
        this.sz = size;
        this.ctx = ctx;

        defined(this.sz);
        defined(this.ctx);

        var nP: number = (size - 1) / 2;
        var nP2: number = (size - 2) / 2;

        var tiles: Array<Tile> = []
        
        for (var j = 0; j < size; j++) {

            var addition: number = - Math.abs(j - nP) + nP;
            
            for (var i = -addition; i < size + addition; i++) {
                tiles.push(new Tile(new HexPoint(2*j, 2*i)));
            }
        }

        for (var j = 0; j < size - 1; j++) {

            var addition: number = - Math.abs(j - nP2) + nP2;

            for (var i = -addition; i <= size + addition; i++) {
                tiles.push(new Tile(new HexPoint(2*j + 1, 2*i - 1)));
            }
        }

        this.tilesArr = tiles;
        defined(this.tilesArr);

        this.settlementsArr = [];
    }

    getTiles() {
        return this.tilesArr;
    }

    getSettlements() {
        return this.settlementsArr;
    }

    isAllowedSettlement(h: HexPoint): boolean {
        console.log("new?", h)
        var conflicts = this.settlementsArr.filter(s => {
            console.log("check", s.getHexPoint())
            var hp = s.getHexPoint();
            if (hp.x == h.x && hp.y == h.y) {
                return true;
            }
            if (hp.x == h.x && hp.y == h.y + 1) {
                return true;
            }
            if (hp.x == h.x && hp.y == h.y - 1) {
                return true;
            }
            if (h.x % 2 == h.y % 2) {
                // check right
                if (hp.x == h.x + 1 && hp.y == h.y) {
                    return true;
                }
            }
            else {
                // check left
                if (hp.x == h.x - 1 && hp.y == h.y) {
                    return true;
                }
            }
            return false;
        });

        return conflicts.length == 0; // allowed if no conflicts
    }

    addSettlement(s: Settlement) {
        defined(s);
        this.settlementsArr.push(s);
    }

    drawMap() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        this.tilesArr.forEach(e => {
            e.fillTile(this.ctx);
        });

        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.tilesArr.forEach(e => {
            e.strokeTile(this.ctx);
        })

        this.settlementsArr.forEach(s => {
            s.draw(this.ctx);
        })
    }
}
