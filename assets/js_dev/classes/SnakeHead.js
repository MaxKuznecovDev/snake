import Snake from "./Snake.js";
export default class SnakeHead extends Snake {
    constructor(gameConfig) {
        super(gameConfig);
        this.widthBorder = gameConfig.width,
            this.heightBorder = gameConfig.height,
            this.Xold,
            this.Yold,
            this.Xnew,
            this.Ynew,
            this.oldCoordinates = "",
            this.newCoordinates = "",
            this.state = "right";
        this.elemOld = "";
        this.elemNew = "";
        this.difficulty = gameConfig.difficulty;
    }
}