<script setup lang="ts">
import { reactive, onErrorCaptured } from 'vue';
import { VxeGrid, VxeTablePropTypes, } from 'vxe-table';
import { VxeButton, VxeUI } from 'vxe-pc-ui';

const menuConfig = reactive<VxeTablePropTypes.MenuConfig>({
  enabled: true,
  body: {
    options: [[{ name: '删除', code: 'remove' }]],
  },
})

function toggleMenuEnabled() {
  menuConfig.enabled = !menuConfig.enabled
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
    <VxeButton @click="toggleMenuEnabled" v-if="menuConfig.enabled">禁止右键菜单</VxeButton>
    <VxeButton @click="toggleMenuEnabled" v-else>禁止右键菜单</VxeButton>

    <div style="height: 10px;"></div>
    
    <VxeGrid :menu-config></VxeGrid>
  </div>
</template>
