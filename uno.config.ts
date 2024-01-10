import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'

// https://github.com/antfu/unocss
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'transition-base': 'transition !duration-300',
    'wh-full': 'w-full h-full',
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
