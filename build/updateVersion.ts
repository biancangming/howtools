/**
 * 处理package.json文件为例,提交前更新package.json 版本
 */
import { readFileSync, writeFileSync } from "fs"
import path from 'path';

const packageJsonPath = path.resolve(__dirname, "../package.json")

const packageJson = JSON.parse(readFileSync(packageJsonPath).toString())

const version: string = packageJson.version

const [main, secondary, correct] = version.split(".").map(Number)

let [newMain, newSecondary, newCorrect] = [main, secondary, correct]

//修改版本号，每10个次要版本，一个主版本
if (correct < 10) {
    newCorrect = correct + 1
} else {
    newCorrect = 0
    if (secondary < 10) {
        newSecondary = secondary + 1
    } else {
        newSecondary = 0
        newMain = main + 1
    }
}

packageJson.version = [newMain, newSecondary, newCorrect].join('.')

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, '  '));

console.warn(`\x1B[33m 已更新版本号为===> ${packageJson.version} \x1B[0m`)