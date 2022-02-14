interface Square {
    kind: 'square';
    width: number;
}

interface Rectangle {
    kind: 'rectangle'
    width: number;
    height: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    if (shape.kind === 'rectangle') { // 타입 가드
        shape; // (parameter) shape: Rectangle
        return shape.width * shape.height
    } else {
        shape; // (parameter) shape: Square
        return shape.width * shape.width
    }
}