<script setup lang="ts">
import { reactive, ref } from 'vue';
import { VxeGrid, VxeGridInstance, } from 'vxe-table';
import { Button } from 'vxe-pc-ui';

const data = reactive([
  { title: 'Rust', description: 'rust 描述' },
  { title: 'C++', description: 'C++ 描述' },
  { title: 'C#', description: 'C# 描述' },
  { title: 'TypeScript', description: 'TypeScript 描述' },
])

const gridRef = ref<VxeGridInstance | null>(null)

function onRemoveCurrentHandler() {
  gridRef.value?.removeCurrentRow()
}

async function onRevertRemoveData() {
  const list = gridRef.value?.getRemoveRecords() ?? []
  if (list.length === 0) return

  const result = await gridRef.value?.revertData(list)
  console.log(result)
}

function onRevertData() {
  gridRef.value?.revertData()
}
</script>

<template>
  <div>
    <Button @click="onRemoveCurrentHandler">移除当前行</Button>
    <Button @click="onRevertRemoveData">恢复删除行</Button>
    <Button @click="onRevertData">恢复表格数据</Button>

    <div style="height: 10px;"></div>

    <VxeGrid ref="gridRef" keep-source :row-config="{ isCurrent: true, isHover: true }"
      :edit-config="{ trigger: 'click', mode: 'row', showStatus: true, showIcon: true }" :data :columns="[
        { field: 'title', title: '标题', width: 200, editRender: { name: 'VxeInput' } },
        { field: 'description', title: '描述', editRender: { name: 'VxeInput' } },
      ]"></VxeGrid>
  </div>
</template>
