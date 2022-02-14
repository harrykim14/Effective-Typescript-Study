function greet(who: string) {
    console.log(who)
}

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

const x = 2 + '3'; // const x: string
const y = '2' + 3; // const y: string

const a = null + 7;
// Object is possibly 'null'.
const b = [] + 12;
// Operator '+' cannot be applied to types 'never[]' and 'number'
alert('Hello', 'TypeScript')
//Expected 0-1 arguments, but got 2.

const names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());
// Cannot read properties of undefined (reading 'toUpperCase') 