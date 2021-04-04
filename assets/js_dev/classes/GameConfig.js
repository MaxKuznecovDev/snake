import GeneralFunction from "./GeneralFunction.js";
export default class GameConfig {
    constructor() {
        this.width = 20;
        this.height = 20;
        this.difficulty = 1;
        this.walls = 70;
        this.speed = 700;
        this.parentField = "parent";
        this.root = ".game_snake";
        this.startField = GeneralFunction.getField(this.width, this.height);

    }
}