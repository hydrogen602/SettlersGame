define(["require", "exports", "./mechanics/Inventory", "./util", "./dataTypes"], function (require, exports, Inventory_1, util_1, dataTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log("test start");
    function inventoryTest() {
        let inv = new Inventory_1.Inventory();
        util_1.defined(inv);
        util_1.assert(Boolean(inv));
        util_1.assert(inv.get(dataTypes_1.ResourceType.Brick) == 0);
        util_1.assert(inv.get(dataTypes_1.ResourceType.Lumber) == 0);
        util_1.assert(inv.get(dataTypes_1.ResourceType.Ore) == 0);
        util_1.assert(inv.get(dataTypes_1.ResourceType.Sheep) == 0);
        util_1.assert(inv.get(dataTypes_1.ResourceType.Wheat) == 0);
        inv.set(dataTypes_1.ResourceType.Brick, 5);
        for (let index = 0; index <= 5; index++) {
            util_1.assert(inv.hasEnough(dataTypes_1.ResourceType.Brick, index));
        }
        util_1.assert(!inv.purchase([dataTypes_1.ResourceType.Lumber], [1]));
        util_1.assert(!inv.purchase([dataTypes_1.ResourceType.Brick, dataTypes_1.ResourceType.Lumber], [3, 1]));
        inv.update(dataTypes_1.ResourceType.Lumber, 1);
        util_1.assert(inv.get(dataTypes_1.ResourceType.Brick) == 5);
        util_1.assert(inv.get(dataTypes_1.ResourceType.Lumber) == 1);
        util_1.assert(inv.purchase([dataTypes_1.ResourceType.Brick, dataTypes_1.ResourceType.Lumber], [3, 1]));
        util_1.assert(inv.get(dataTypes_1.ResourceType.Brick) == 2);
        util_1.assert(inv.get(dataTypes_1.ResourceType.Lumber) == 0);
        console.log("done with tests");
    }
    inventoryTest();
});
//# sourceMappingURL=test.js.map