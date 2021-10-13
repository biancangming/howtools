"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
//测试防抖函数
function log() {
    console.log(new Date());
}
var target = util_1.debounce(log, 0);
target();
target();
target();
target();
target();
target();
target();
target();
target();
