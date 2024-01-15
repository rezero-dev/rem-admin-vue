import { emit } from 'process';
<script setup lang="ts">
const props = withDefaults(defineProps<{
  useHeader: boolean
  useSider: boolean
  useFooter: boolean
  inverted: boolean
  headerHeight: number
  siderWidth: number
  siderCollapsedWidth: number
  footerHeight: number
  siderCollapsed: boolean
  siderFixed: boolean
  siderFixedShow: boolean
}>(), {
  useHeader: true,
  useSider: true,
  useFooter: true,
  headerHeight: 64,
  siderWidth: 220,
  siderCollapsedWidth: 64,
  footerHeight: 64,
})

const emits = defineEmits<{
  'update:siderCollapsed': [val: boolean]
  'update:siderFixed': [val: boolean]
  'update:siderFixedShow': [val: boolean]
}>()

const siderWidthValue = computed(() => props.siderFixed ? 0 : props.siderCollapsed ? props.siderCollapsedWidth : props.siderWidth)

const { width } = useWindowSize()

watch(
  width,
  (val: number) => {
    if (val <= 768)
      emits('update:siderCollapsed', true)

    if (val <= 640) {
      emits('update:siderFixed', true)
      emits('update:siderFixedShow', false)
    }
    else {
      emits('update:siderFixed', false)
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="relative h-100vh w-full flex overflow-hidden dark:bg-#18181c dark:text-#ffffffd1">
    <template v-if="useSider">
      <div
        :style="{
          width: `${siderFixed ? 0 : siderWidthValue}px`,
          minWidth: `${siderWidthValue}px`,
        }"
        :class="{
          'bg-#001428': inverted,
        }"
        class="h-full transition-all transition-base"
      />
      <div
        :style="{
          left: siderFixed ? siderFixedShow ? 0 : `-${siderWidth}px` : 0,
          paddingTop: `${headerHeight}px`,
          width: `${siderFixed ? siderFixedShow ? siderWidth : siderWidthValue : siderWidthValue}px`,
        }"
        :class="{
          'text-#fff': inverted,
          '!bg-#001428': inverted,
        }"
        class="absolute top-0 z-998 h-full bg-#fff transition-all transition-base"
      >
        <slot name="sider" />
      </div>
    </template>
    <div class="h-full flex flex-1 flex-col">
      <template v-if="useHeader">
        <div
          :style="{
            height: `${headerHeight}px`,
          }"
          class="flex-shrink-0 overflow-hidden transition-all transition-base"
        />
        <div
          :style="{
            height: `${headerHeight}px`,
          }"
          :class="{
            'text-#fff': inverted,
            '!bg-#001428': inverted,
          }"
          class="absolute right-0 top-0 z-999 wh-full bg-#fff transition-all transition-base"
        >
          <slot name="header" />
        </div>
      </template>
      <div
        :class="{
          '!bg-#001428': inverted,
        }"
        class="flex flex-grow overflow-y-auto transition-colors transition-base"
      >
        <div
          :class="{
            'rd-tl-12px': siderFixed ? false : useHeader,
            'rd-bl-12px': siderFixed ? false : useFooter,
          }"
          class="wh-full overflow-hidden transition-all transition-base"
        >
          <div class="wh-full flex flex-col bg-#f3f3f5 dark:bg-#101014">
            <NScrollbar>
              <div
                class="p-16px"
                :style="{
                  height: `calc(100vh${!useHeader ? ` - ${headerHeight}` : ''}${!useFooter ? ` - ${footerHeight}` : ''})`,
                }"
              >
                <slot />
              </div>
            </NScrollbar>
          </div>
        </div>
      </div>
      <div
        v-if="useFooter"
        :style="{
          height: `${footerHeight}px`,
        }"
        :class="{
          'text-#fff': inverted,
          '!bg-#001428': inverted,
        }"
        class="wh-full flex-shrink-0 overflow-hidden bg-#fff transition-all transition-base"
      >
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
