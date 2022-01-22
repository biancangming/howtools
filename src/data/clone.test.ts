import { deepClone, shallowClone } from './clone';

const a = {
    x: 1,
    y: [1, 2, 3],
    z: {
        p: 10,
        q: 50
    }
}
const b = deepClone<any>(a)

b.x = 2
b.y[0] = 100

console.log(a)
console.log(b)

//===========测试浅克隆============
console.log('===========测试浅克隆============')
const sarr = [1, 2, 3, 5, 7, 8]
const csarr = shallowClone(sarr)

csarr[0] = 222
console.log(sarr)
console.log(csarr)