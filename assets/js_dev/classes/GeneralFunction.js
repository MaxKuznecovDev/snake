export default class GeneralFunction {
    static randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    static getField(width, height) {
        return (
            GeneralFunction.randomInteger(1, height) +
            "-" +
            GeneralFunction.randomInteger(1, width)
        );
    }
}