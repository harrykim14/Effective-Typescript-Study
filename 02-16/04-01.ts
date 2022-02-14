class C {
    foo: string;
    // Object.prototype.constructor를 실행하기 때문에 d가 C 타입에 할당될수 있다
    constructor(foo: string){
        this.foo = foo;
    }
}

const c = new C('instance of C');
const d: C = { foo: 'object literal' };

/* --------------------------------------------------------------------- */

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