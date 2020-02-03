define(["require", "exports", "../dataTypes", "../util"], function (require, exports, dataTypes_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Biome {
        constructor(abundance, resource, color) {
            this.abundance = abundance;
            this.resource = resource;
            this.color = color;
        }
        getAbundance() {
            util_1.defined(this.abundance);
            return this.abundance;
        }
        getResourceType() {
            util_1.defined(this.resource);
            return this.resource;
        }
        getColor() {
            util_1.defined(this.color);
            return this.color;
        }
    }
    exports.Biome = Biome;
    exports.Desert = new (class Desert extends Biome {
        constructor() {
            super(1, dataTypes_1.ResourceType.NoResource, 'yellow');
        }
    })();
    exports.Grassland = new (class Grassland extends Biome {
        constructor() {
            super(4, dataTypes_1.ResourceType.Sheep, 'limegreen');
        }
    })();
    exports.Forest = new (class Forest extends Biome {
        constructor() {
            super(4, dataTypes_1.ResourceType.Lumber, 'forestgreen');
        }
    })();
    exports.Mountain = new (class Mountain extends Biome {
        constructor() {
            super(3, dataTypes_1.ResourceType.Ore, 'dimgray');
        }
    })();
    exports.Farmland = new (class Farmland extends Biome {
        constructor() {
            super(4, dataTypes_1.ResourceType.Wheat, 'goldenrod');
        }
    })();
    exports.Quarry = new (class Quarry extends Biome {
        constructor() {
            super(3, dataTypes_1.ResourceType.Brick, 'firebrick');
        }
    })();
    exports.biomes = [exports.Desert, exports.Grassland, exports.Forest, exports.Mountain, exports.Farmland, exports.Quarry];
    exports.biomeDistributionArray = function () {
        let tmp_biomeDistributionArray = [];
        exports.biomes.forEach((e) => {
            for (let i = 0; i < e.getAbundance(); i++) {
                tmp_biomeDistributionArray.push(e);
            }
        });
        return tmp_biomeDistributionArray;
    }();
});
//# sourceMappingURL=Biome.js.map