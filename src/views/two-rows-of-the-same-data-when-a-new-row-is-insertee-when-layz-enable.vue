<template>
  <div>
    <Button @click="insertRow">新增一行</Button>
    <Button @click="getCurerntData">获取当前数据</Button>

    <VxeGrid ref="gridRef" v-bind="vxeGridProps"></VxeGrid>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { Button, VxeGrid, VxeGridInstance, VxeGridProps } from "vxe-table"

const { gridRef, vxeGridProps, insertRow, getCurerntData } = useGrdid()

function useGrdid() {
  const gridRef = ref<VxeGridInstance>()

  /*表格配置*/
  const vxeGridProps = reactive<VxeGridProps>({
    keepSource: true,
    height: 600,
    rowConfig: {
      isCurrent: true,
    },
    treeConfig: {
      /*是否懒加载*/
      lazy: true,
      /*转换为树列表*/
      transform: true,
      /*是否显示连线*/
      line: false,
      /*对于同一级的节点，每次只能展开一个*/
      accordion: false,
      /*id*/
      rowField: "markingId",
      /*父id*/
      parentField: "parentId",
      /*是否有子级*/
      hasChild: "hasChild",
      /*打开子级图标*/
      iconOpen: "vxe-icon-square-minus",
      /*关闭子级图标*/
      iconClose: "vxe-icon-square-plus",
      // 加载表格数据
      loadMethod,
    },
    columns: [
      {
        field: "id",
        title: "id",
        visible: false,
      },
      {
        field: "name",
        title: "name",
        treeNode: true,
      },
    ],
    data: [
      {
        parentId: "",
        id: 0,
        markingId: "0",
        name: "订购",
        isChild: true,
        hasChild: false,
        maType: "A",
        type: 0,
      },
      {
        hasChild: true,
        markingId: "0-0",
        isChild: true,
        name: "0-0",
        id: "0-0",
        parentId: "0",
        type: 1,
        seqNo: null,
        assortSeq: null,
      },
    ],
  })

  function loadMethod() {
    return Promise.resolve([
      {
        hasChild: true,
        markingId: "0-0-0",
        isChild: true,
        name: Date.now(),
        id: 2022,
        parentId: "0-0",
        type: 2,
        seqNo: 1,
        assortSeq: null,
      },
    ])
  }

  function insertRow() {
    const grid = gridRef.value
    if (grid == void 0) return

    const curr = grid.getCurrentRecord()

    grid.insertNextAt(
      {
        hasChild: false,
        markingId: "2022-1-1",
        isChild: false,
        name: Date.now().toString(),
        id: 2022,
        parentId: "2022-1",
        type: 3,
        seqNo: 1,
        assortSeq: 1,
      },
      curr
    )
  }

  function getCurerntData() {
    const grid = gridRef.value
    if (grid == void 0) return

    console.log(grid.getTableData())

    const curr = grid.getCurrentRecord()

    console.log(curr)
  }

  return { gridRef, vxeGridProps, insertRow, getCurerntData }
}
</script>

<style scoped></style>
