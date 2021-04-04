class Field {
    constructor(gameConfig) {
        this.width = gameConfig.width;
        this.height = gameConfig.height;
        this.parent = gameConfig.parentField;
        this.startField = gameConfig.startField;
        this.walls = gameConfig.walls;
        this.root = gameConfig.root;
    }

    addListInParent() {
        let div = document.createElement("div");
        let root = document.querySelector(this.root);
        div.className = this.parent;
        div.append(...this.getListLine());
        root.append(div);
    }

    getListLine() {
        let arrLine = [];
        for (let i = 1; i <= this.height; i++) {
            let div = document.createElement("div");
            div.className = "line line-" + i;
            div.append(...this.getListBox(i));
            arrLine.push(div);
        }

        return arrLine;
    }

    getListBox(line) {
        let arrBox = [];
        for (let i = 1; i <= this.width; i++) {
            let div = document.createElement("div");
            let boxName = line + "-" + i;
            let wall = "";

            if(GeneralFunction.randomInteger(0,10) >8 && this.walls != 0){
                wall = " wall";
                this.walls--;
            }

            if (boxName == this.startField) {
                div.className = "box box-" + boxName + " paintUp";
            } else {
                div.className = "box box-" + boxName + wall;
            }
            arrBox.push(div);
        }

        return arrBox;
    }
}
class FoodBox {
    //паттерн синглтон--------------
    static food;

    constructor(gameConfig) {
        if (!(FoodBox.food instanceof FoodBox)) {
            FoodBox.getFoodInField(gameConfig);
            FoodBox.food = this;
        }
    }
    //--------------------------
    static getFoodInField(gameConfig) {
        let foodFieldCoordinat = GeneralFunction.getField(
            gameConfig.width,
            gameConfig.height
        );
        let foodElem = document.getElementsByClassName(
            "box-" + foodFieldCoordinat
        )[0];
        if (foodElem.classList.contains("paintUp") || foodElem.classList.contains("wall")) {
            FoodBox.getFoodInField(gameConfig);
            return;
        }
        foodElem.classList.add("food");
    }

    static eatFood(box) {
        if (box.elemNew.classList.contains("food")){
            return true;
        }
        return false;
    }
}
class GameConfig {
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

class GameLoop {
    static loop;
    static score = 0;
    static updateCoordinates(box) {
        if (box.checkNewAndOldCoordinates()) {
            box.updateNewCoordinates();
        } else {
            box.updateOldCoordinates();
        }
    }
    static eatFood(box) {
        if (box.elemNew.classList.contains("food")) {
            GameBoxTail.addTailInArr(box);
            GameLoop.score = GameLoop.score +100 * box.difficulty;
            box.elemNew.classList.remove("food");
            FoodBox.food = {};
        }
    }
    static checkDie(box) {

        if (box.elemNew.classList.contains("paintUp") || box.elemNew.classList.contains("wall")) {
            return true
        }
        return false
    }
}
class GeneralFunction {
    static randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    static getField(width, height) {
        return (
            GeneralFunction.randomInteger(1, height) +
            "-" +
            GeneralFunction.randomInteger(1, width)
        );
    }
}
class Render {

    static showOrRemoveField(field) {
        if (field.classList.contains("paintUp")) {
            field.classList.remove("paintUp");
        } else {
            field.classList.add("paintUp");
        }

    }
    static renderScope(scope){
        let display_score = document.querySelector(".display_score");
        display_score.innerText = scope;
    }
    static renderDieMessage(){
        let wrapper_die_message = document.querySelector(".wrapper_die_message");
        wrapper_die_message.classList.remove("hidden");
        setTimeout(function () {
            document.location.reload();
        },3000);
    }
}
class Snake {
    setStartСoordinates(elem) {
        this.elemOld = elem;
        this.oldCoordinates = this.elemOld.classList[1].slice(4);
        this.newCoordinates = this.oldCoordinates;
        this.arrOldXY = this.oldCoordinates.match(/(.*)-(.*)/);
        this.Yold = Number(this.arrOldXY[1]);
        this.Xold = Number(this.arrOldXY[2]);
    }

    getNewElemFromCoordinates() {
        this.elemNew = document.getElementsByClassName(
            "box-" + this.newCoordinates
        )[0];
    }
    getOldElemFromCoordinates() {
        this.elemOld = document.getElementsByClassName(
            "box-" + this.oldCoordinates
        )[0];
    }

    setNewCoordinates() {
        switch (this.state) {
            case "up":
                this.Xnew = this.Xold;
                this.Ynew = this.checkBorder(this.Yold, "min", this.heightBorder); //this.Yold + 1
                break;
            case "down":
                this.Xnew = this.Xold;
                this.Ynew = this.checkBorder(this.Yold, "plus", this.heightBorder); //this.Yold - 1
                break;
            case "right":
                this.Xnew = this.checkBorder(this.Xold, "plus", this.widthBorder); //this.Xold + 1
                this.Ynew = this.Yold;
                break;
            case "left":
                this.Xnew = this.checkBorder(this.Xold, "min", this.widthBorder); //this.Xold - 1
                this.Ynew = this.Yold;
                break;
        }

        this.newCoordinates = this.Ynew + "-" + this.Xnew;
    }
    setOldCoordinates() {
        this.Xold = this.Xnew;
        this.Yold = this.Ynew;
        this.oldCoordinates = this.Yold + "-" + this.Xold;
    }

    checkBorder(coordinate, operation, borderMax) {
        switch (operation) {
            case "plus":
                if (coordinate + 1 > borderMax) {
                    return 1;
                } else {
                    return coordinate + 1;
                }
                break;
            case "min":
                if (coordinate - 1 < 1) {
                    return borderMax;
                } else {
                    return coordinate - 1;
                }
                break;
        }
    }

    checkNewAndOldCoordinates() {
        return this.oldCoordinates == this.newCoordinates ? true : false;
    }

    //паттерн обновление-------------------------
    updateNewCoordinates() {
        this.setNewCoordinates();
        this.getNewElemFromCoordinates();
    }

    updateOldCoordinates() {
        this.setOldCoordinates();
        this.getOldElemFromCoordinates();
    }
    //-------------------------------------------
}
class SnakeHead extends Snake {
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
class SnakeTail extends Snake {
    static tailArr = [];
    static currentTail;

    constructor(box) {
        super();
        this.oldCoordinates = box.oldCoordinates;
        this.newCoordinates = box.newCoordinates;
        this.elemOld = box.elemOld;
        this.elemNew = box.elemNew;
        this.delay = true;
        this.delayRender = true;
    }
    setNewCoordinates() {
        this.newCoordinates =
            SnakeTail.tailArr[SnakeTail.currentTail - 1].oldCoordinates;
    }
    setOldCoordinates() {
        if (this.delay) {
            this.newCoordinates = this.oldCoordinates;
            this.delay = false;
            return;
        }
        this.oldCoordinates = this.newCoordinates;
    }

    static addTailInArr(box) {
        if (SnakeTail.checkTailIsEmpty()) {
            SnakeTail.tailArr.push(new SnakeTail(box));
            return;
        }
        SnakeTail.tailArr.push(
            new SnakeTail(SnakeTail.tailArr[SnakeTail.tailArr.length - 1])
        );
    }

    static checkTailIsEmpty() {
        if (SnakeTail.tailArr.length == 0) {
            return true;
        }
        return false;
    }


}
class Command {
    execute() {}
}
class DownCommand extends Command {
    execute(commandPush, box) {
        this.down(commandPush, box);
    }
    down(commandPush, box) {
        if(box.state != "up"){
            box.state = commandPush;
        }
    }
}
class InputHandler {
    handlerInput(commandPush, box) {
        let cls;
        switch (commandPush) {
            case "down":
                cls = new DownCommand();
                cls.execute(commandPush, box);
                break;
            case "up":
                cls = new UpCommand();
                cls.execute(commandPush, box);
                break;
            case "right":
                cls = new RightCommand();
                cls.execute(commandPush, box);
                break;
            case "left":
                cls = new LeftCommand();
                cls.execute(commandPush, box);
                break;
        }
    }
}
class LeftCommand extends Command {
    execute(commandPush, box) {
        this.left(commandPush, box);
    }
    left(commandPush, box) {
        if(box.state != "right"){
            box.state = commandPush;
        }
    }
}
class RightCommand extends Command {
    execute(commandPush, box) {
        this.right(commandPush, box);
    }
    right(commandPush, box) {
        if(box.state != "left"){
            box.state = commandPush;
        }
    }
}
class UpCommand extends Command {
    execute(commandPush, box) {
        this.up(commandPush, box);
    }
    up(commandPush, box) {
        if(box.state != "down"){
            box.state = commandPush;
        }
    }
}
//-------------------------------

let gameConfig = new GameConfig();
let field = new Field(gameConfig);
field.addListInParent();

let startBox = document.getElementsByClassName("paintUp")[0];
let snake = new SnakeHead(gameConfig);
    snake.setStartСoordinates(startBox);
    SnakeTail.tailArr.push(snake);
new FoodBox(gameConfig);
setCommandPattern(snake);
setBtnHandler();

//-------------------------------

function setCommandPattern(box) {
    document.addEventListener("keydown", function (event) {
        let input = new InputHandler();
        let commandPush = event.code.slice(5).toLowerCase();
        input.handlerInput(commandPush, box);
    });
}
function mainGameLoop() {
    new FoodBox(gameConfig);
    SnakeTail.tailArr.forEach(function (tail, i) {
        SnakeTail.currentTail = i;
        GameLoop.updateCoordinates(tail);

        if(GameLoop.checkDie(snake)){
            clearInterval(GameLoop.loop);
            Render.renderDieMessage();
        }
        if (tail.delayRender) {
            tail.delayRender = false;
            return;
        }
        Render.showOrRemoveField(tail.elemOld);
    });

    if(FoodBox.eatFood(snake)){
        changeSnakeAndScore();
    }

    SnakeTail.tailArr.forEach(function (tail, i) {
        SnakeTail.currentTail = i;
        GameLoop.updateCoordinates(tail);
        if (tail.delayRender) {
            return;
        }
        Render.showOrRemoveField(tail.elemNew);
    });


}
function changeSnakeAndScore(){
    SnakeTail.addTailInArr(snake);
    GameLoop.score = GameLoop.score +100 * snake.difficulty;
    snake.elemNew.classList.remove("food");
    FoodBox.food = {};
    Render.renderScope(GameLoop.score);
}
function setBtnHandler(){
    let btn_start = document.querySelector(".btn_start");
    let btn_stop = document.querySelector(".btn_stop");
    let btn_reset = document.querySelector(".btn_reset");
    let btn_about = document.querySelector(".btn_about");

    btn_start.addEventListener("click",function () {
        GameLoop.loop = setInterval(mainGameLoop, gameConfig.speed);
    });
    btn_stop.addEventListener("click",function () {
        clearInterval(GameLoop.loop);
    });
    btn_reset.addEventListener("click",function () {
        document.location.reload();
    });
    btn_about.addEventListener("click",function () {
        let wrapper_about = document.querySelector(".wrapper_about");
        wrapper_about.classList.toggle("hidden");
    })
}

