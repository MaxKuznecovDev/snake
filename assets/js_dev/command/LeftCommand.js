import Command from "./Command.js";
export default class LeftCommand extends Command {
    execute(commandPush, box) {
        this.left(commandPush, box);
    }
    left(commandPush, box) {
        if(box.state != "right"){
            box.state = commandPush;
        }
    }
}