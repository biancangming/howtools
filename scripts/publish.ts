import { execSync } from 'child_process'
import path from 'path'
import consola from 'consola'
import { readFileSync } from 'fs'

const packageJsonPath = path.resolve(__dirname, "../package.json")
const packageJson = JSON.parse(readFileSync(packageJsonPath).toString())
const version = packageJson.version

execSync('npm run build', { stdio: 'inherit' })

let command = 'npm publish --access public'

if (version.includes('beta'))
    command += ' --tag beta'

execSync(command, { stdio: 'inherit', cwd: path.resolve(__dirname, '../dist') })
consola.success("发布成功")