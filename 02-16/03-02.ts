class Square {
    constructor(public width: number) {}
}
class Rectangle extends Square {
    constructor(public width: number, public height: number) {
        super(width);
    }
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    if (shape instanceof Rectangle) { // 타입 가드
        shape; // (parameter) shape: Rectangle
        return shape.width * shape.height
    } else {
        shape; // (parameter) shape: Square
        return shape.width * shape.width
    }
}