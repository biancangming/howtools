import { deepClone } from './clone';

const a = {
    x: 1,
    y: [1, 2, 3],
    z: {
        p: 10,
        q: 50
    }
}
const b = deepClone<any>(a)

a.x = 2
a.y[0] = 100

console.log(a)
console.log(b)