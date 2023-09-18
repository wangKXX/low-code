<template>
  <template v-for="(key, index) in Object.keys(schemaCurrent)" :key="`props-setting-${index}`">
    <el-row :gutter="24" style="margin-bottom: 8px">
      <el-col :span="24"
        ><div class="props-item-label">{{ schemaCurrent[key].title }}</div></el-col
      >
      <el-col :span="24"
        ><el-input
          v-if="schemaCurrent[key].type === 'INPUT'"
          v-model="schemaCurrent[key].value"
          placeholder="请输入"
          clearable
        ></el-input>
        <el-select
          v-model="schemaCurrent[key].value"
          placeholder="请选择"
          v-if="schemaCurrent[key].type === 'SELECT'"
        >
          <el-option v-for="(opt, idx) in schemaCurrent[key].options" :key="idx" :value="opt">{{
            opt
          }}</el-option>
        </el-select>
        <el-checkbox
          v-if="schemaCurrent[key].type === 'CHECKBOX'"
          v-model="schemaCurrent[key].value"
        ></el-checkbox>
        <PropsSettingList
          v-if="schemaCurrent[key].type === 'LIST'"
          :value="schemaCurrent[key].value"
        ></PropsSettingList>
      </el-col>
    </el-row>
  </template>
</template>

<script setup lang="ts">
import type { ISchema } from '@/stores'
import PropsSettingList from './PropsSettingList.vue'
const { schemaCurrent } = defineProps<{ schemaCurrent: ISchema }>()
</script>

<style lang="less" scoped>
.props-item-label {
  color: #a7b1bd;
  line-height: 32px;
}
:deep(.el-select) {
  width: 100%;
}
</style>
