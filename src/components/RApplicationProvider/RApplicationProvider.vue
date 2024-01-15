<script setup lang="ts">
defineOptions({
  name: 'RApplicationProvider',
})
</script>

<template>
  <NDialogProvider>
    <NLoadingBarProvider>
      <NMessageProvider>
        <NNotificationProvider>
          <NGlobalStyle />
          <slot />
        </NNotificationProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NDialogProvider>
</template>
