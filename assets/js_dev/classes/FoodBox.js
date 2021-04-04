import GeneralFunction from "./GeneralFunction.js";

export default class FoodBox {
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