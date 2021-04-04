import GameConfig from './classes/GameConfig.js';
import InputHandler from './command/InputHandler.js';
import Field from './classes/Field.js';
import SnakeHead from './classes/SnakeHead.js';
import SnakeTail from './classes/SnakeTail.js';
import FoodBox from './classes/FoodBox.js';
import Render from './classes/Render.js';
import GameLoop from './classes/GameLoop.js';


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
