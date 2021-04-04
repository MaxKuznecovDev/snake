import Snake from "./Snake.js";
export default class SnakeTail extends Snake {
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