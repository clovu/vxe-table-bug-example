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
interface RowVO {
  id: number
  parentId: number | null
  name: string
  type: string
  size: number
  date: string
  hasChild?: boolean
}
function useGrdid() {
  const gridRef = ref<VxeGridInstance>()
  const tableData = ref<RowVO[]>([
    {
      id: 10000,
      parentId: null,
      name: "test abc1",
      type: "mp3",
      size: 1024,
      date: "2020-08-01",
    },
    {
      id: 10050,
      parentId: null,
      name: "Test2",
      type: "mp4",
      size: 0,
      date: "2021-04-01",
      hasChild: true,
    },
    {
      id: 23666,
      parentId: null,
      name: "Test23",
      type: "mp4",
      size: 0,
      date: "2021-01-02",
      hasChild: true,
    },
    {
      id: 24555,
      parentId: null,
      name: "test abc9",
      type: "avi",
      size: 224,
      date: "2020-10-01",
    },
  ])
  /*表格配置*/
  const vxeGridProps = reactive<VxeGridProps<RowVO>>({
    keepSource: true,
    height: 600,
    rowConfig: {
      isCurrent: true,
    },
    editConfig: {
      showIcon: true,
      showStatus: true,
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
      rowField: "id",
      /*父id*/
      parentField: "parentId",
      /*是否有子级*/
      hasChildField: "hasChild",
      /*打开子级图标*/
      iconOpen: "vxe-icon-square-minus",
      /*关闭子级图标*/
      iconClose: "vxe-icon-square-plus",
      // 加载表格数据
      loadMethod({ row }) {
        // 异步加载子节点
        return fetchChildListApi(row)
      },
    },
    columns: [
      {
        field: "name",
        title: "name",
        treeNode: true,
      },
      {
        field: "size",
        title: "size",
      },
    ],
    data: tableData as any,
  })

  // 模拟后台
  const fetchChildListApi = (parentRow: RowVO) => {
    return new Promise<RowVO[]>((resolve) => {
      setTimeout(() => {
        const childs = [
          {
            id: parentRow.id + 1000000,
            parentId: parentRow.id,
            name: parentRow.name + "Test111111111111",
            type: "mp4",
            size: 0,
            date: "2021-10-03",
            hasChild: true,
          },
          {
            id: parentRow.id + 1500000,
            parentId: parentRow.id,
            name: parentRow.name + "Test222222222222",
            type: "mp3",
            size: 0,
            date: "2021-07-09",
            hasChild: false,
          },
        ]
        resolve(childs)
      }, 500)
    })
  }

  async function insertRow() {
    const grid = gridRef.value
    if (grid == void 0) return

    const curr = grid.getCurrentRecord()
    await grid.setTreeExpand(curr, true)

    await grid.insert({
      id: curr.id + 1500000,
      parentId: curr.id,
      name: curr.name + "Test222222222222",
      type: "mp3",
      size: 0,
      date: "2021-07-09",
      hasChild: false,
    })
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
