<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { VxeTag, VxeTagPropTypes } from 'vxe-pc-ui';
import { VxeGrid, VxeGridPropTypes } from 'vxe-table';

const columns = reactive<VxeGridPropTypes.Columns>([
  { title: 'Issue', width: 70, slots: { default: 'github-issue-url' }},
  { title: 'Issue Status',width: 110, slots: { default: 'status' }},
  { title: 'PR', width: 70, slots: { default: 'github-pr-url' }},
  { title: 'Description', field: 'desc'},
  { title: 'Action', slots: { default: 'action' } },
])

enum IssueStatus {
  Wontfix,
  Fix
}

const dataSource = reactive([
  {issue: 2320, status: IssueStatus.Fix, pr: 2428, desc: "TreeTable 懒加载数据首次新增行时出现重复数据 (4.7.56 修复)", },
  {issue: 2479, status: IssueStatus.Wontfix, pr: null, desc: "如果存在新增数据, getRowIndex 函数返回的序号错误" },
])

const router = useRouter()

const goto = (path: string) => router.push({ path })

const MatchStatus: Record<IssueStatus, VxeTagPropTypes.Status> = {
  [IssueStatus.Wontfix]: "error",
  [IssueStatus.Fix]: "success",
}

const MatchStatusText = {
  [IssueStatus.Wontfix]: "Wontfix",
  [IssueStatus.Fix]: "Fix",
}
</script>

<template>
  <router-view />

  <div style="margin-top: 20px; margin-bottom: 20px;">ISSUE 列表</div>
  
  <VxeGrid :columns="columns" :data="dataSource">
    <template #status="{ row }">
      <VxeTag :status="MatchStatus[row.status as IssueStatus]">
        {{ MatchStatusText[row.status as IssueStatus] }}
      </VxeTag>
    </template>

    <template #action="{ row }">
      <VxeButton @click="goto(row.issue.toString())">Go to Demo</VxeButton>
    </template>

    <template #github-issue-url="{ row }">
      <a :href="`https://github.com/x-extends/vxe-table/issues/${row.issue}`" target="_blank">
        #{{ row.issue }}
      </a>
    </template>

    <template #github-pr-url="{ row }">
      <a v-if="row.pr" :href="`https://github.com/x-extends/vxe-table/pull/${row.pr}`"
        target="_blank"
      >
        #{{ row.pr }}
      </a>
    </template>
  </VxeGrid>
</template>
