import path from 'node:path'
import process from 'node:process'
import type { ConfigEnv } from 'vite'
import dayjs from 'dayjs'
import { readPackageJSON } from 'pkg-types'
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'

/**
 * 创建全局常量
 * @param root 根目录
 * @returns 创建的全局常量
 */
async function createDefine(root: string) {
  try {
    const pkgJson = await readPackageJSON(root)
    const { dependencies, devDependencies, name, version } = pkgJson
    const __APP_INFO__ = {
      pkg: { dependencies, devDependencies, name, version },
      lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
    return {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    }
  }
  catch (error) {
    return {}
  }
}

// https://cn.vitejs.dev/config/
export default defineConfig(async ({ mode }: ConfigEnv) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const { VITE_BASE, VITE_SERVER_PORT } = env

  return {
    root,

    base: VITE_BASE,

    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    define: await createDefine(root),

    server: {
      host: true,
      port: Number(VITE_SERVER_PORT),
      open: true,
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },

    plugins: [
    // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'pinia',
          'vitest',
          '@vueuse/core',
        ],
        dts: 'src/types/auto-imports.d.ts',
        dirs: [
          'src/composables/**',
          'src/hooks/**',
          'src/stores/**',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/types/components.d.ts',
        dirs: [
          'src/components/**',
        ],
      }),

      // https://github.com/antfu/unocss
      Unocss(),

      // https://cn.vuejs.org
      Vue(),

      // https://github.com/webfansplz/vite-plugin-vue-devtools
      VueDevTools(),

      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'src/locales/**')],
      }),

      // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx
      VueJsx(),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
    },
  }
})
