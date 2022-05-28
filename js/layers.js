addLayer("r", {
    name: "rebirths", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0f57ff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "rebirths", // Name of prestige currency
    baseResource: "cash", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for rebirths", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    upgrades: {
        11: {
            title: "Begin farming BS:ED",
            description: "Double cash gain",
            cost: new Decimal(5),

        },

        12: {
            title: "More effective rebirths",
            description: "Gain more cash based on your rebirths",
            cost: new Decimal(18),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },

        },

        13: {
            title: "Effective cash",
            description: "Gain more rebirths based on your cash",
            cost: new Decimal(35),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            gainMult() {
                let mult = new Decimal(1)
                if (hasUpgrade('r', 13)) mult = mult.times(upgradeEffect('r', 13))
                return mult
            },

        },

    },

    layerShown(){return true}
})


addLayer("s", {
    name: "stone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4a4a4a",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "stone", // Name of prestige currency
    baseResource: "rebirths", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    effect() {
        return player.rebirths.points.add(2)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for stone", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    upgrades: {

    },
    branches: "rebirths",

    layerShown(){return true}
})
