import UpCommand from "./UpCommand.js";
import DownCommand from "./DownCommand.js";
import RightCommand from "./RightCommand.js";
import LeftCommand from "./RightCommand.js";

export default class InputHandler {
    handlerInput(commandPush, box) {
        let cls;
        switch (commandPush) {
            case "down":
                cls = new DownCommand();
                cls.execute(commandPush, box);
                break;
            case "up":
                cls = new UpCommand();
                cls.execute(commandPush, box);
                break;
            case "right":
                cls = new RightCommand();
                cls.execute(commandPush, box);
                break;
            case "left":
                cls = new LeftCommand();
                cls.execute(commandPush, box);
                break;
        }
    }
}