import { debounce } from "./util"

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