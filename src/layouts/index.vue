<script setup lang="ts">
import type { MenuOption } from 'naive-ui'

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

const dark = useDark()
const toggleDark = useToggle(dark)

const router = useRouter()
const dialog = useDialog()

function renderIcon(icon: string) {
  return () => h('div', { class: icon })
}

const menuSelected = ref('home')
const menuOptions: MenuOption[] = [
  {
    key: 'home',
    label: '首页',
    icon: renderIcon('i-icon-park-outline-home'),
  },
  {
    key: 'about',
    label: '关于',
    icon: renderIcon('i-icon-park-outline-info'),
  },
]
function handleSelectMenu(key: string) {
  router.push(`/${key}`)
}

const userOptions = ref([
  {
    key: 'person',
    label: '个人中心',
    icon: renderIcon('i-icon-park-outline-setting-one'),
  },
  {
    type: 'divider',
  },
  {
    key: 'logout',
    label: '退出登录',
    icon: renderIcon('i-icon-park-outline-logout'),
  },
])
function handleSelectUserOption(key: string | number) {
  switch (key) {
    case 'person':
      router.push('/person')
      break
    case 'logout': {
      const d = dialog.warning({
        autoFocus: false,
        title: '提示',
        content: '是否确认退出登录？',
        positiveText: '确认',
        negativeText: '取消',
        onPositiveClick: () => {
          d.loading = true
        },
      })
      break
    }
  }
}
</script>

<template>
  <RLayout>
    <template #header>
      <div class="mx-24px h-full flex justify-between">
        <div class="flex-center">
          <img
            src="/logo.svg"
            class="mr-8px h-28px"
          >
          <div class="text-18px font-medium">
            Rem Admin
          </div>
        </div>
        <NFlex
          :size="[4, 0]"
          class="h-full flex-center"
        >
          <NTooltip trigger="hover">
            <template #trigger>
              <div class="h-full py-8px">
                <NButton
                  quaternary
                  class="!h-full"
                  @click="toggleFullscreen"
                >
                  <div :class="isFullscreen ? 'i-icon-park-outline-off-screen' : 'i-icon-park-outline-full-screen'" />
                </NButton>
              </div>
            </template>
            {{ isFullscreen ? '取消全屏' : '全屏' }}
          </NTooltip>
          <NTooltip trigger="hover">
            <template #trigger>
              <div class="h-full py-8px">
                <NButton
                  quaternary
                  class="!h-full"
                  @click="toggleDark()"
                >
                  <div :class="dark ? 'i-icon-park-outline-moon' : 'i-icon-park-outline-sun-one'" />
                </NButton>
              </div>
            </template>
            {{ dark ? '浅色模式' : '深色模式' }}
          </NTooltip>
          <NDropdown
            trigger="hover"
            :options="userOptions"
            @select="handleSelectUserOption"
          >
            <div class="h-full py-8px">
              <NButton
                quaternary
                class="!h-full"
              >
                <NAvatar
                  round
                  class="mr-8px"
                >
                  R
                </NAvatar>
                <span>Rem</span>
              </NButton>
            </div>
          </NDropdown>
        </NFlex>
      </div>
    </template>
    <template #sider="{ collapsed }">
      <div class="m-4px">
        <NMenu
          v-model:value="menuSelected"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="20"
          :options="menuOptions"
          @update:value="handleSelectMenu"
        />
      </div>
    </template>
    <div class="wh-full px-42px py-24px">
      <RouterView #="{ Component, route }">
        <Transition
          appear
          mode="out-in"
          name="fade-slide"
        >
          <Component
            :is="Component"
            :key="route.path"
          />
        </Transition>
      </RouterView>
    </div>
    <template #footer>
      <div class="h-full flex-center">
        Copyright © 2024-present Re:Zero
      </div>
    </template>
  </RLayout>
</template>
