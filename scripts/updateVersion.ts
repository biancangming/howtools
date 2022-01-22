/**
 * 处理package.json文件为例,提交前更新package.json 版本
 * 版本号示例 正式版 0.0.1 测试版 0.0.1-bate.1
 */
import { readFileSync, writeFileSync } from "fs"
import path from 'path';
import consola from 'consola';

const input = process.argv
consola.warn(input)
const arg = input[2]
const RELEASE = 'release'
const BATE = 'bate'

const packageJsonPath = path.resolve(__dirname, "../package.json")
const releaseJsonPath = path.resolve(__dirname, "../dist/package.json")

const packageJson = JSON.parse(readFileSync(packageJsonPath).toString())

const version: string = packageJson.version

consola.success("当前版本号:", version)

const [main, secondary, correct, bate, bateNumber] = version.split(/\.|-/) as [number, number, number, string, number]


consola.log(arg, BATE === 'bate')
function createPackage() {
    const pkg = { ...packageJson }
    //正式版逻辑, 如果为测试版本直接移除测试版本号
    if (arg === RELEASE) {
        let [newMain, newSecondary, newCorrect] = [Number(main), Number(secondary), Number(correct)]
        // 修改版本号，每10个次要版本，一个主版本
        if (correct < 10) {
            newCorrect = Number(correct) + 1
        } else {
            newCorrect = 0
            if (secondary < 10) {
                newSecondary = Number(secondary) + 1
            } else {
                newSecondary = 0
                newMain = Number(main) + 1
            }
        }
        pkg.version = [newMain, newSecondary, newCorrect].join('.')
    } else if (arg === BATE) {
        let [newMain, newSecondary, newCorrect, newBateNumber] = [main, secondary, correct, bateNumber]

        newBateNumber = Number(newBateNumber || 0) + 1
        pkg.version = [newMain, newSecondary, newCorrect].join('.') + `-${BATE}.${newBateNumber}`
    } else {
        consola.error(`错误的选项${arg}, 只能指定`, BATE, RELEASE)
        return null
    }

    return pkg
}


//更新package.json
function release(pkg) {
    if (!pkg) return
    writeFileSync(packageJsonPath, JSON.stringify(pkg, null, '  ')); //更新package.json
    writeFileSync(releaseJsonPath, JSON.stringify(pkg, null, '  ')); //更新发布的package.json
    consola.warn(`已更新版本号为===> ${pkg.version}`)
}

const pkg = createPackage()
release(pkg)
