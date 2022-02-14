## ITEM 1. 타입스크립트와 자바스크립트의 관계 이해하기

#### Javascript로 쓴 TypeScript 코드
```js
// 01.js
function greet(who: string) {
    console.log(who)
}

/**
 * function greet(who: string) {
 *                   ^
 * SyntaxError: Unexpected token ':'
 */
```

#### TypeScript 코드 실행하기

1. `tsconfig.json`의 생성
```ts
tsc --init
```
2. 타입스크립트의 파일을 변환하고 node로 실행
```ts
tsc 01.ts
node 01.js
```
<details>
<summary>원본 코드와 생성된 코드</summary>

```ts
// TypeScript
function greet(who: string) {
    console.log(who)
}
```

```js
// Javascript
function greet(who) {
    console.log(who);
}

```

</details>

#### 타입스크립트의 타입 체커

```ts
let city = 'new york city'
console.log(city.toUppercase())
// Property 'toUppercase' does not exist on type 'string'. 
// Did you mean 'toUpperCase'?

const states = [
    {name: 'Alabama', capital: 'Montgomery'},
    {name: 'Alaska', capital: 'Juneau'},
    {name: 'Arizona', capital: 'Phoenix'},
];
for (const state of states) {
    console.log(state.capitol)
}
// Property 'capitol' does not exist on type '{ name: string; capital: string; }'. 
// Did you mean 'capital'?

const states_spellmiss = [
    {name: 'Alabama', capitol: 'Montgomery'},
    {name: 'Alaska', capitol: 'Juneau'},
    {name: 'Arizona', capitol: 'Phoenix'},
];
for (const state of states_spellmiss) {
    console.log(state.capital)
}
// Property 'capital' does not exist on type '{ name: string; capitol: string; }'. 
// Did you mean 'capitol'?
```

#### 명시적으로 states를 선언하기
```ts
interface State {
    name: string;
    capital: string;
}

const states_interface: State[] = [
    {name: 'Alabama', capitol: 'Montgomery'},
    {name: 'Alaska', capitol: 'Juneau'},
    {name: 'Arizona', capitol: 'Phoenix'}
]
/**
 * Type '{ name: string; capitol: string; }' is not assignable to type 'State'.
 * Object literal may only specify known properties, 
 * but 'capitol' does not exist in type 'State'. 
 * Did you mean to write 'capital'?
 */
for (const state of states_interface) {
    console.log(state.capital)
}
```

#### 타입 체커가 변수의 타입을 자동으로 정적 분석
```ts
const x = 2 + '3'; // const x: string
const y = '2' + 3; // const y: string

const a = null + 7;
// Object is possibly 'null'.
const b = [] + 12;
// Operator '+' cannot be applied to types 'never[]' and 'number'
alert('Hello', 'TypeScript')
//Expected 0-1 arguments, but got 2.
```

#### 타입 체커를 맹신하지 말 것
```ts
const names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());
// Cannot read properties of undefined (reading 'toUpperCase') 
```

#### 요약
- 타입스크립트는 문법적으로도 자바스크립트의 상위집합
- 확장자는 `.ts(tsx)`를 사용한다
- `main.js` 파일을 `main.ts`로 바꿔도 달라지는 것은 없음 -> 마이그레이션이 매우 빠름
- 타입스크립트는 자바스크립트 런타임 동작을 모델링하는 타입 시스템을 가지고 있음
- 런타임 오류를 발생시키는 코드를 찾아내려고 함
- 타입 체커를 통과하는 런타임 오류도 충분히 존재 할 수 있다

## ITEM 2. 타입스크립트 설정 이해하기

#### `--noImplicitAny`
```ts
function add(a, b) {
    return a+b
}
add(10, null)
```

```ts
// 자바스크립트 코드로 컴파일(트랜스파일)하기
tsc --noImplicitAny 02.ts
// 02.ts:1:14 - error TS7006: Parameter 'a' implicitly has an 'any' type.
// 02.ts:1:17 - error TS7006: Parameter 'b' implicitly has an 'any' type.
```

#### `--strictNullChecks`
```ts
const x: number = null;
// true: Type 'null' is not assignable to type 'number
// false: Cannot redeclare block-scoped variable 'x'
const y: number | null = null; // ok

// DOM 객체에 관한 함수
const el = document.getElementById('status')
el.textContent = 'Ready'
// true: const el: HTMLElement | null, Object is possibly 'null'
// false: const el: HTMLElement
```

#### 요약
- `tsconfig.json`은 `tsc --init`으로 생성할 수 있다
- `--noImplicitAny`나 `--strictNullChecks` 설정으로 더 깐깐한 타입 체크가 가능하다
- 타입스크립트의 장점을 활용하려면 strict 설정을 고려해야 함

## ITEM 3. 코드 생성과 타입이 관계없음을 이해하기

<details>
<summary>1. 사각형의 너비를 구해보자</summary>

1) 인터페이스를 이용해 정사각형과 직사각형의 너비를 구하기

```ts
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
```

2) 인터페이스에 파라미터가 있는지 체크하는 법
```ts
function calculateAreaWithParameterCheck(shape: Shape) {
    if('height' in shape) { // <- 파라미터가 있는지 여기서 체크 (타입 가드와는 다름)
        shape; // (parameter) shape: Rectangle
        return shape.width * shape.height // ok
    } else {
        return shape.width * shape.width;
    } 
}
```

3) 클래스로 인스턴스를 구분하기
```ts
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
```

</details>

2. 타입 단언(type assertion)을 사용하면 타입 체커의 엄격함을 빠져나갈 수 있다
```ts
function asNumber(val: number | string): number {
    return val as number;
}
```

```js
function asNumber(val){
    return val
}
```

```ts
function asNumber(val: number | string): number {
    return typeof(val) === 'string' 
            ? Number(val) 
            : val;
}
```

3. 런타임 타입은 선언된 타입과 다를 수 있다
```ts
function setLightSwitch(value: boolean) {
    switch (value) {
        case true:
            turnLightOn();
            break;
        case false:
            turnLightOff();
            break;
        default:
            console.log("실행되지 않을까봐 걱정됩니다.")
    }
}
```

```ts
interface LightApiResponse {
    lightSwitchValue: boolean; 
    // API의 결과가 항상 boolean일지 아닐지 모른다 (추후 변경된다던가...)
}
async function setLight() {
    const response = await fetch('/light');
    const result: LightApiResponse = await response.json();
    setLightSwitch(result.lightSwitchValue);
}
```

4. 타입스크립트 타입으로는 함수를 오버로드 할 수 없다
```java
// 자바 코드의 함수 오버로드
public static void main(String[ ] args) {
    System.out.println(add("a", "b"));
    System.out.println(add(1, 2));
}

public static String add(String a, String b) {
    String result = a + b;
    return result;
}

public static int add(int a, int b) {
    int result = a + b;
    return result;
}
```

```ts
function add(a: number, b: number) { return a + b }
// Duplicate function implementation.
function add(a: string, b: string) { return a + b }
// Duplicate function implementation.
```

#### 요약
- 타입스크립트는 '런타임' 오버헤드가 없는 대신 '빌드타임' 오버헤드가 있다 (트랜스파일)
- 코드 생성은 타입 시스템과 무관하고 타입스크립트 타입은 런타임 동작이나 성능에 영향을 주지 않는다
- 타입 오류가 존재하더라도 코드 생성은 가능
- 런타임에 타입을 지정하려면 별도의 방법이 존재함 -> 태그된 유니온과 속성 체크 방법을 사용

## ITEM 4. 구조적 타이핑에 익숙해지기

<details>
<summary>(부록) 덕타이핑이란?</summary>

> "만약 어떤 새가 오리처럼 걷고, 헤엄치고, 꽥꽥거리는 소리를 낸다면 나는 그 새를 오리라고 부를 것이다." 

```js
interface Quackable {
  sound: 'quack';
  cry: () => Quackable['sound'];
}

class Duck implements Quackable {
  sound: 'quack';
  cry() {
    return this.sound;
  }
}

class Pig {
  sound: 'quack';
  cry() {
    return this.sound;
  }
}

function cryQuack(Quackable: Quackable): void {
  Quackable.cry();
}

cryQuack(new Duck()); 
cryQuack(new Pig());
```

</details>

<details>
<summary>1. 벡터 타입을 다뤄보자</summary>

```ts
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
// NamedVector는 x와 y속성이 있기 때문에 Vector2D 타입으로도 호출 가능하다: "구조적 타이핑"
console.log(calculateLength(v)) // 5
```

```ts
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
```
</details>

<details>
<summary>2. 클래스에서의 구조적 타이핑</summary>

```ts
class C {
    foo: string;
    // Object.prototype.constructor를 실행하기 때문에 d가 C 타입에 할당될수 있다
    constructor(foo: string){
        this.foo = foo;
    }
}

const c = new C('instance of C');
const d: C = { foo: 'object literal' };
```

</details>

<details>
<summary>3. 테스트 작성의 구조적 타이핑</summary>

```ts
interface Author {
    first: string;
    last: string;
}

function getAuthors(database: PostgresDB): Author[] {
    const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
    // 이 부분의 authorRows가 배열인지 알 수 없다
    return authorRows.map(row => ({first: row[0], last: row[1]}))
}

// 배열임을 명시하기 위해 DB의 메서드 타입을 정의
interface PostgresDB {
    runQuery: (sql: string) => any[];
}
```

```ts
// 테스트 코드 작성 예
test('getAuthors', () => {
    const authors = getAuthors({
        runQuery(sql: string) {
            return [['Tony', 'Morrison'], ['Maya', 'Angelou']];
        }
    });
    expect(authors).toEqual([
        {first: 'Tony', last: 'Morrison'},
        {first: 'Maya', last: 'Angelou'}
    ])
})
```

</details>

#### 요약
- 자바스크립트가 덕타이핑 기반이기 때문에 타입스크립트가 이를 모델링 하기 위해 구고적 타이핑을 사용
- 클래스 역시 구조적 타이핑 규칙을 따르므로 클래스의 인스턴스가 예상과 다를 수 있다
- 구조적 타이핑으로 유닛 테스팅이 쉬워짐

## ITEM 5. any 타입 지양하기

- any 타입에는 타입 안전성이 없음
- any는 함수 시그니처를 무시함
- any 타입에는 언어 서비스가 적용되지 않음 (배열 메서드의 자동완성 등)
- any 타입은 코드 리팩터링 때 버그를 감춤
- any는 타입 설계를 감춰버림
- any는 타입시스템의 신뢰도를 떨어뜨립니다