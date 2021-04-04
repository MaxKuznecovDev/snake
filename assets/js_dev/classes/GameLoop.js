import GameBoxTail from "./SnakeTail.js";
import FoodBox from "./FoodBox.js";


export default class GameLoop {
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