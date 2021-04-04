import Command from "./Command.js";
export default class DownCommand extends Command {
    execute(commandPush, box) {
        this.down(commandPush, box);
    }
    down(commandPush, box) {
        if(box.state != "up"){
            box.state = commandPush;
        }
    }
}