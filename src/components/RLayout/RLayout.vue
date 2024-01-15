<script setup lang="ts">
defineOptions({
  name: 'RLayout',
})

const collapsed = ref(false)
</script>

<template>
  <NLayout class="h-100vh w-full">
    <NLayoutHeader
      bordered
      class="h-64px"
    >
      <slot name="header" />
    </NLayoutHeader>
    <NLayout
      has-sider
      position="absolute"
      class="!top-64px"
    >
      <NLayoutSider
        v-model:collapsed="collapsed"
        :width="240"
        :collapsed-width="72"
        collapse-mode="width"

        bordered show-trigger
        :native-scrollbar="false"
        trigger-class="!top-48px"
        collapsed-trigger-class="!top-48px"
      >
        <slot
          name="sider"
          :collapsed="collapsed"
        />
      </NLayoutSider>
      <NLayoutContent
        position="absolute"
        :native-scrollbar="false"
        :class="collapsed ? '!left-64px' : '!left-240px'"
        class="!bottom-64px !transition-left !duration-300"
      >
        <slot />
      </NLayoutContent>
      <NLayoutFooter
        bordered
        position="absolute"
        class="h-64px !left-240px"
      >
        <slot name="footer" />
      </NLayoutFooter>
    </NLayout>
  </NLayout>
</template>
