import Command from "./Command.js";
export default class UpCommand extends Command {
    execute(commandPush, box) {
        this.up(commandPush, box);
    }
    up(commandPush, box) {
        if(box.state != "down"){
            box.state = commandPush;
        }
    }
}