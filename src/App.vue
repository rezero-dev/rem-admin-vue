<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'

const dark = useDark()

const theme = computed(() => unref(dark) ? darkTheme : null)

const themeOverrides = computed<GlobalThemeOverrides>(() => {
  let primaryColor = '#165dff'

  if (unref(dark))
    primaryColor = '#91bef0'

  return {
    common: {
      primaryColor,
      borderRadius: '8px',
    },
  }
})

const configProviderProps = ref({
  theme,
  themeOverrides,
  locale: zhCN,
  dateLocale: dateZhCN,
})
</script>

<template>
  <NConfigProvider v-bind="configProviderProps">
    <RApplicationProvider>
      <RouterView />
    </RApplicationProvider>
  </NConfigProvider>
</template>
