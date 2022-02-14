interface Vector2D {
    x: number;
    y: number;
}

function calculateLength(v: Vector2D) {
    return Math.sqrt(v.x * v.x + v.y * v.y)
}

interface NamedVector {
    name: string;
    x: number;
    y: number;
}

const v: NamedVector = { x: 3, y: 4, name: 'Zee' };
// NamedVector는 x와 y속성이 있기 때문에 Vector2D 타입으로도 호출 가능하다
console.log(calculateLength(v)) // 5

// ---------------------------------------------------------------------------- //

interface Vector3D {
    x: number;
    y: number;
    z: number;
}

function normalize(v: Vector3D) {
    // function calculateLength(v: Vector2D): number
    const length = calculateLength(v)
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length,
    }
}
console.log(normalize({x: 3, y: 4, z: 5})) // { x: 0.6, y: 0.8, z: 1 }

function calculateLengthL1(v: Vector3D) {
    let length = 0;
    for (const axis of Object.keys(v)) {
        const coord = v[axis];
        // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Vector3D'.
        // No index signature with a parameter of type 'string' was found on type 'Vector3D'.
        length += Math.abs(coord);
    }
    return length;
}
const vec3D = {x: 3, y: 4, z: 1, address: '123 Broadway'}
console.log(calculateLengthL1(vec3D)) // NaN

// v[axis]가 불확실하므로 for 루프보다 각 속성을 더하는 것이 확실함
function calculateLengthL2(v: Vector3D) {
    return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z)
}

