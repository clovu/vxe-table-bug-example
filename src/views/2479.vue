<!-- 出现 BUG 版本 4.7.0 --- 4.7.53 -->
<script setup lang="ts">
import { reactive, ref } from 'vue';
import VxeUI from 'vxe-pc-ui';
import { VxeGrid, VxeGridInstance, VxeGridPropTypes } from 'vxe-table';

const columns = reactive<VxeGridPropTypes.Columns>([
  { title: 'name', field: 'name' }
])

const dataSource = reactive([
  { name: 'clover you' },
  { name: 'clover you' },
  { name: 'clover you' },
  { name: 'clover you' },
])

const gridRef = ref<VxeGridInstance>()

const dialog = (index?: number) => {
  VxeUI.modal.alert({
    id: 'myUniqueAlert',
    content: `当前选中行的行号是 ${index}`,
    mask: false,
    lockView: false
  })
}

const currRowIndexDialog = () => {
  const grid = gridRef.value
  if (grid == void 0) return

  const curr = grid.getCurrentRecord()
  dialog(grid.getRowIndex(curr))
}

const getVMRowIndex = () => {
  const grid = gridRef.value
  if (grid == void 0) return

  const curr = grid.getCurrentRecord()
  dialog(grid.getVMRowIndex(curr))
}

const getVTRowIndex = () => {
  const grid = gridRef.value
  if (grid == void 0) return

  const curr = grid.getCurrentRecord()
  dialog(grid.getVTRowIndex(curr))
}

const insertRowHandler = () => {
  const grid = gridRef.value
  if (grid == void 0) return

  const curr = grid.getCurrentRecord()

  grid.insertNextAt({}, curr)
}
</script>

<template>
  <VxeButton style="margin-bottom: 10px;" @click="currRowIndexDialog">
    通过 getRowIndex 获取当前选中行
  </VxeButton>

  <VxeButton style="margin-bottom: 10px;" @click="getVMRowIndex">
    通过 getVMRowIndex 获取当前选中行
  </VxeButton>
  
  <VxeButton style="margin-bottom: 10px;" @click="getVTRowIndex">
    通过 getVTRowIndex 获取当前选中行
  </VxeButton>

  <VxeButton style="margin-bottom: 10px;" @click="insertRowHandler">
    随便添加一行
  </VxeButton>

  <VxeGrid ref="gridRef" :columns="columns" :data="dataSource" keep-source :edit-config="{ showInsertStatus: true }"
    :row-config="{ isHover: true, isCurrent: true }">
  </VxeGrid>
</template>
