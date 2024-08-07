<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';
import { VxeGrid, VxeTablePropTypes, } from 'vxe-table';
import { VxeButton, VxeUI } from 'vxe-pc-ui';

const menuConfig = ref<VxeTablePropTypes.MenuConfig | undefined>({
  enabled: true,
  body: {
    options: [[{ name: '删除', code: 'remove' }]],
  },
})

function toggleMenuEnabled() {
  menuConfig.value = undefined
}

onErrorCaptured((error) => {
  VxeUI.modal.message({
    id: 'myUniqueMsg',
    content: error.stack,
    status: 'error'
  })

  console.error(error)
  return false
})
</script>

<template>
  <div>
    <VxeButton @click="toggleMenuEnabled" v-if="menuConfig?.enabled">禁止右键菜单</VxeButton>
    <VxeButton @click="toggleMenuEnabled" v-else>开启右键菜单</VxeButton>

    <div style="height: 10px;"></div>

    <VxeGrid :menu-config></VxeGrid>
  </div>
</template>
