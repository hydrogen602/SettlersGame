import { HexPoint, RelPoint } from "../graphics/Point";
import { Tile } from "./Tile";
import { defined } from "../util";
import { Settlement } from "./Settlement";
import { canvas } from "../graphics/Screen";
import { Road } from "./Road";

export class GameMap {
    private sz: number;
    private tilesArr: Array<Tile>;
    private settlementsArr: Array<Settlement>;
    private roadsArr: Array<Road>;
    private ctx: CanvasRenderingContext2D;

    // offset of map on screen in order to move around the map
    // currLocation: RelPoint;

    constructor(size: number, ctx: CanvasRenderingContext2D) {
        this.sz = size;
        this.ctx = ctx;

        defined(this.sz);
        defined(this.ctx);

        const nP: number = (size - 1) / 2;
        const nP2: number = (size - 2) / 2;

        this.tilesArr = [];
        
        for (let j = 0; j < size; j++) {

            const addition: number = - Math.abs(j - nP) + nP;
            
            for (let i = -addition; i < size + addition; i++) {
                this.tilesArr.push(new Tile(new HexPoint(2*j, 2*i)));
            }
        }

        for (let j = 0; j < size - 1; j++) {

            const addition: number = - Math.abs(j - nP2) + nP2;

            for (let i = -addition; i <= size + addition; i++) {
                this.tilesArr.push(new Tile(new HexPoint(2*j + 1, 2*i - 1)));
            }
        }

        defined(this.tilesArr);

        this.settlementsArr = [];
        this.roadsArr = [];
    }

    getTiles() {
        return this.tilesArr;
    }

    getSettlements() {
        return this.settlementsArr;
    }

    getRoads() {
        return this.roadsArr;
    }

    getCtx() {
        return this.ctx;
    }

    isAllowedSettlement(h: HexPoint): boolean {
        // console.log("new?", h)
        const conflicts = this.settlementsArr.filter(s => {
            // console.log("check", s.getHexPoint())
            const hp = s.getHexPoint();
            return h.isNeighbor(hp) || h.isEqual(hp);
        });

        return conflicts.length == 0; // allowed if no conflicts
    }

    isAllowedRoad(p1: HexPoint, p2: HexPoint): boolean {
        if (!p1.isNeighbor(p2) || p1.isEqual(p2)) {
            // if the points aren't adjacent or are the same, do not allow
            return false;
        }

        const conflicts = this.roadsArr.filter(r => {
            return r.isEqual(p1, p2);
        });

        return conflicts.length == 0;
    }

    addSettlement(s: Settlement) {
        defined(s);
        this.settlementsArr.push(s);
    }

    addRoad(r: Road) {
        defined(r)
        this.roadsArr.push(r);
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.tilesArr.forEach(e => {
            e.draw(this.ctx);
        })

        this.tilesArr.forEach(e => {
            e.highlightIfActive(this.ctx);
        })

        this.roadsArr.forEach(r => {
            r.draw(this.ctx);
        })

        this.settlementsArr.forEach(s => {
            s.draw(this.ctx);
        })
    }
}
