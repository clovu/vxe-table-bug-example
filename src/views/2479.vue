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

const currRowIndexDialog = () => {
  const grid = gridRef.value
  if (grid == void 0) return

  const curr = grid.getCurrentRecord()

  VxeUI.modal.alert({
    id: 'myUniqueAlert',
    content: `当前选中行的行号是 ${grid.getRowIndex(curr)}`,
    mask: false,
    lockView: false
  })
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
    获取当前选中行 RowIndex
  </VxeButton>

  <VxeButton style="margin-bottom: 10px;" @click="insertRowHandler">
    随便添加一行
  </VxeButton>

  <VxeGrid ref="gridRef" :columns="columns" :data="dataSource" keep-source
    :edit-config="{ showInsertStatus: true }" :row-config="{ isHover: true, isCurrent: true }">
  </VxeGrid>
</template>
