import path from 'node:path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'

// https://cn.vitejs.dev/config/
export default defineConfig({
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

  resolve: {
    alias: {
      '~@': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
  },
})
