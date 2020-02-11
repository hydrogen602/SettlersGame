define(["require", "exports", "../dataTypes", "../util"], function (require, exports, dataTypes_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // my own inventory system cause map is limited
    // requirements - map based/ like
    // get - set - update
    // verify enough resources
    class Inventory {
        constructor() {
            this.content = new Map();
            for (let i in dataTypes_1.ResourceType) {
                if (Number(i).toString() != "NaN" && i != '0') { // '0' is Desert -> NoResource
                    // js is retarded    /\
                    // for thinking that ||
                    // NaN == NaN is false
                    //
                    this.content.set(Number(i), 0);
                }
            }
        }
        keys() {
            return this.content.keys();
        }
        get(k) {
            const tmp = this.content.get(k);
            util_1.defined(tmp);
            return tmp;
        }
        set(k, n) {
            util_1.assertInt(n);
            this.content.set(k, n);
        }
        update(k, n) {
            // adds n
            util_1.assertInt(n);
            const currValue = this.get(k);
            this.set(k, n + currValue);
        }
        hasEnough(k, min) {
            util_1.assertInt(min);
            const currValue = this.get(k);
            return currValue >= min;
        }
        // attempts to purchase some good
        // returns true on success and false on failure
        //
        // given a list of resources and how many of each are required,
        // it checks if there are enough resources
        // if there are not enough resources, it returns false
        // if there are enough, it removes from the inventory and returns true
        purchase(kArr, costArr) {
            util_1.assert(kArr.length == costArr.length);
            costArr.forEach(c => util_1.assertInt(c));
            // check if enough resources
            for (let i = 0; i < kArr.length; i++) {
                // console.log(kArr[i], costArr[i]);
                if (!this.hasEnough(kArr[i], costArr[i])) {
                    return false;
                }
            }
            // remove stuff
            for (let i = 0; i < kArr.length; i++) {
                this.update(kArr[i], -costArr[i]);
            }
            return true;
        }
    }
    exports.Inventory = Inventory;
});
//# sourceMappingURL=Inventory.js.map