// 01. --noImplicitAny 
// function add(a: any, b: any): any
function add(a, b) {
    return a+b
}
add(10, null)

/**
 * 02.ts:1:14 - error TS7006: Parameter 'a' implicitly has an 'any' type.
 * 02.ts:1:17 - error TS7006: Parameter 'b' implicitly has an 'any' type.
 */

// 02. --strictNullChecks
const x: number = null;
// true: Type 'null' is not assignable to type 'number
// false: Cannot redeclare block-scoped variable 'x'
const y: number | null = null; // ok

// DOM 객체에 관한 함수
const el = document.getElementById('status')
el.textContent = 'Ready'
// true: const el: HTMLElement | null, Object is possibly 'null'
// false: const el: HTMLElement

