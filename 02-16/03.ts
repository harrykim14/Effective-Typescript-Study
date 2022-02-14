interface Square {
    width:number;
}
interface Rectangle extends Square {
    height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    // 'Rectangle' only refers to a type, but is being used as a value here.
    if (shape instanceof Rectangle) {
        // Property 'height' does not exist on type 'Shape'.
        return shape.width * shape.height;
    } else {
        return shape.width * shape.width;
    }
}

function calculateAreaWithParameterCheck(shape: Shape) {
    if('height' in shape) {
        shape; // (parameter) shape: Rectangle
        return shape.width * shape.height // ok
    } else {
        return shape.width * shape.width;
    } 
}