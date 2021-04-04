export default class Snake {
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