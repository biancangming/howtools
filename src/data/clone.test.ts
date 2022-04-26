import { deepClone, shallowClone } from './clone';

const a = {
    x: 1,
    y: [1, 2, 3],
    z: {
        p: 10,
        q: 50
    }
}

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: "child",
    },
    field4: [2, 4, 8],
    empty: null,
    map: new Map([["a", "1"], ["b", "1"]]),
    set: new Set(["1", "2"]),
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error("测试错误"),
    func1: () => {
        let t = 0;
        console.log("coder", t++);
    },
    func2: function (a, b) {
        return a + b;
    },
    obj: {
        x: 1,
        y: [1, 2, 3],
        z: {
            p: 10,
            q: 50
        }
    }
};

const b = deepClone<any>(a)

b.x = 2
b.y[0] = 100

console.log(a)
console.log(b)

const deepTarget = deepClone(target)
target.map = new Map
console.log(deepTarget)
//===========测试浅克隆============
console.log('===========测试浅克隆============')
const sarr = [1, 2, 3, 5, 7, 8]
const csarr = shallowClone(sarr)

csarr[0] = 222
console.log(sarr)
console.log(csarr)