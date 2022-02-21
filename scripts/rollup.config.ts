import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import type { RollupOptions } from 'rollup'
import path from 'path';

const utilPath = path.join(__dirname, '../src/utils/util.ts')

const configs: RollupOptions[] = []

const externals = [
    "resize-observer-polyfill"
]

const esbuildPlugin = esbuild({
    target: ["es6"]
})

const dtsPlugin = [
    dts(),
]

const esbuildMinifer = (options: ESBuildOptions) => {
    const { renderChunk } = esbuild(options)

    return {
        name: 'esbuild-minifer',
        renderChunk,
    }
}

const input = 'src/index.ts'
const iifeName = "howtools"
const iifeGlobals = {
    howtools: "HowTools"
}
configs.push(
    {
        input,
        output: [
            {
                file: `dist/index.mjs`,
                format: 'es',
            },
            {
                file: `dist/index.cjs`,
                format: 'cjs',
            },
            {
                file: `dist/index.iife.js`,
                format: 'iife',
                name: iifeName,
                extend: true,
                globals: iifeGlobals,
            },
            {
                file: `dist/index.iife.min.js`,
                format: 'iife',
                name: iifeName,
                extend: true,
                globals: iifeGlobals,
                plugins: [
                    esbuildMinifer({
                        minify: true,
                    }),
                ],
            }
        ],
        plugins: [
            esbuildPlugin
        ],
        moduleContext: (id: string) => {
            // 此处修复防抖节流函数的this原样输出，如果util this用于其它意图需要考虑修改此处
            if (id === utilPath) {
                return "this"
            }
        }
    },
    {
        input,
        output: {
            file: `dist/index.d.ts`,
            format: 'es',
        },
        plugins: dtsPlugin,
        external: {
            ...externals
        }
    }
)

export default configs