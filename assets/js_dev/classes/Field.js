import GeneralFunction from './GeneralFunction.js';

export default class Field {
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