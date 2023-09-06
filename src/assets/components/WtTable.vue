<template>
  <div class="w-table">
    <el-table :data="tableData">
      <el-table-column
        :label="column.label"
        v-for="(column, index) in props.columns"
        :key="`${index}`"
        :prop="column.prop"
      ></el-table-column>
    </el-table>
    <div class="w-teble-pagination">
      <el-pagination
        v-model:current-page="fetchParams.currentPage"
        v-model:page-size="fetchParams.pageSize"
        :page-sizes="[100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
interface ITable {
  columns: {
    prop: string
    label: string
  }[]
  action: string
  method: string
}
interface IParams {
  currentPage: number
  pageSize: number
}
const props = defineProps<ITable>()
const { action, method } = props

const formatGetParams = (action: string | URL, params: IParams) => {
  if (!action) return
  action = new URL(action)
  const payload = new URLSearchParams(action.search.slice(1))
  Object.entries(params).forEach(([k, v]) => {
    payload.append(k, v)
  })
}

const fetchRequest = async (params: IParams) => {
  const payload = { method, mode: 'cors', credentials: 'include' }
  method === 'POST' && Object.assign(payload, { body: params })
  method === 'GET' && formatGetParams(action, params)
  const res = await fetch(action, { method, mode: 'cors', credentials: 'include' })
  console.log(res)
}
const tableData = ref([])
const fetchParams = ref<IParams>({
  currentPage: 1,
  pageSize: 100
})
const total = ref(0)
watch(
  fetchParams,
  (value) => {
    fetchRequest(value)
  },
  { immediate: true }
)
</script>

<style lang="less">
.w-teble-pagination {
  text-align: right;
  padding: 8px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
