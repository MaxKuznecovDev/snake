import Command from "./Command.js";
export default class RightCommand extends Command {
    execute(commandPush, box) {
        this.right(commandPush, box);
    }
    right(commandPush, box) {
        if(box.state != "left"){
            box.state = commandPush;
        }
    }
}