import { typeOf, isRegExp, isNumber, isEmpty } from './type';
import { debounce } from './util';
import { md5 } from './md5';
import { Base64 } from './base64'
import { getCalendarByDate } from './calendar'

//测试防抖函数

function log() {
    console.log(new Date())
}

const target = debounce(log, 0)

target()
target()
target()
target()
target()
target()
target()
target()
target()

// 函数类型
console.log("===================函数类型测试=============================")
console.log("0 is", typeOf(0))
console.log("NaN is", typeOf(NaN))
console.log("false is", typeOf(false))
console.log("undefined is", typeOf(undefined))
console.log("null is", typeOf(null))
console.log("Symbol() is", typeOf(Symbol()))
console.log("() => ({}) is", typeOf(() => ({})))
console.log("[] is", typeOf([]))
console.log("{} is", typeOf({}))
console.log("/.*?/ is", typeOf(/.*?/))

console.log(isRegExp(/.*?/))
console.log(isNumber(0))
console.log("===================空对象验证测试=============================")
console.log("[] is == >", isEmpty([]))
console.log("{} is == >", isEmpty({}))
console.log("0 is == >", isEmpty(0))
console.log("\" \" is == >", isEmpty(" "))
console.log("\"\" is == >", isEmpty(""))
console.log("null is == >", isEmpty(null))
console.log("undefined is == >", isEmpty(undefined))

//MD5 校验
console.log("===================MD5 校验测试=============================")
console.log(md5("123456"))

//Base64 编码
console.log("===================Base64 校验测试=============================")
let base64 = new Base64()
const imgUrl = 'M00/00/7A/rBABFWIEx1OAAMRSAAAgbEov6ck276.jpg'
console.log(base64.encode(imgUrl))


// 日历
console.log("===================日历 校验测试=============================")
getCalendarByDate("2023-11-14")
getCalendarByDate("2023-11-14", { startByMonday: true })