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
    const Desert = new (class Desert extends Biome {
        constructor() {
            super(1, dataTypes_1.ResourceType.NoResource, 'yellow');
        }
    })();
    const Grassland = new (class Grassland extends Biome {
        constructor() {
            super(4, dataTypes_1.ResourceType.Sheep, 'limegreen');
        }
    })();
    const Forest = new (class Forest extends Biome {
        constructor() {
            super(4, dataTypes_1.ResourceType.Lumber, 'forestgreen');
        }
    })();
    const Mountain = new (class Mountain extends Biome {
        constructor() {
            super(3, dataTypes_1.ResourceType.Ore, 'dimgray');
        }
    })();
    const Farmland = new (class Farmland extends Biome {
        constructor() {
            super(4, dataTypes_1.ResourceType.Wheat, 'goldenrod');
        }
    })();
    const Quarry = new (class Quarry extends Biome {
        constructor() {
            super(3, dataTypes_1.ResourceType.Brick, 'firebrick');
        }
    })();
    exports.biomes = [Desert, Grassland, Forest, Mountain, Farmland, Quarry];
    var tmp_biomeDistributionArray = [];
    exports.biomes.forEach((e) => {
        for (var i = 0; i < e.getAbundance(); i++) {
            tmp_biomeDistributionArray.push(e);
        }
    });
    exports.biomeDistributionArray = tmp_biomeDistributionArray;
    tmp_biomeDistributionArray = undefined;
});
//# sourceMappingURL=Biome.js.map