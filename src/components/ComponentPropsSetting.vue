<template>
  <div v-if="!currentComponentId" class="props-setting-tips">请在左侧画布选中节点</div>
  <div class="props-setting" v-else :key="currentComponentId" @click="handlerClick">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="属性" name="1" v-if="Object.keys(current.schema).length">
        <ComponentPropsEidtor :schemaCurrent="current.schema || {}"></ComponentPropsEidtor>
      </el-collapse-item>
      <el-collapse-item title="事件" name="2" v-if="current.events">
        <ComponentEventEditor :component="current"></ComponentEventEditor>
      </el-collapse-item>
      <el-collapse-item title="样式" name="3">
        <ComponentSheetsEditer @code="saveSheetsCode" :component="current"></ComponentSheetsEditer>
      </el-collapse-item>
      <el-collapse-item title="高级" name="4">
        <el-row :gutter="24" style="margin-bottom: 8px">
          <el-col :span="4"><div class="props-item-label">refId</div></el-col>
          <el-col :span="20">
          <el-input v-model="currentComponentId" disabled=""></el-input>
          </el-col
        ></el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { useCurrentComponent } from '@/stores'
import { storeToRefs } from 'pinia'
import { findComponent } from '@/utils/common'
import type { IComponent } from '@/stores'
import ComponentSheetsEditer from './ComponentSheetsEditor.vue'
import ComponentPropsEidtor from './ComponentPropsEidtor.vue'
import ComponentEventEditor from './ComponentEventEditor.vue'

const activeNames = ref(['1', '2', '3', '4'])
const { currentComponentId, pageComponents } = storeToRefs<ReturnType<typeof useCurrentComponent>>(
  useCurrentComponent()
)
const current = computed<any>(
  () => findComponent(currentComponentId.value, [pageComponents.value] as IComponent[]) || {}
)

const saveSheetsCode = (code: string): void => {
  current.value.sheets.inlineSheets = code
}
const ModalInstance = inject<any>('ModalInstance')
const handlerClick = () =>{
  ModalInstance?.value?.closeAllModal()
}
</script>

<style lang="less" scoped>
.props-setting {
  :deep(.el-collapse-item__header) {
    padding-left: 8px;
    background-color: #e4e7ed;
  }
  :deep(.el-collapse-item__wrap) {
    padding: 8px;
  }
  :deep(.el-collapse-item__header.is-active) {
    border-bottom: #ebeef5 1px solid;
  }
  :deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }
}
.props-setting-tips {
  text-align: center;
  padding: 8px;
  color: #a7b1bd;
}
.props-item-label {
  color: #a7b1bd;
  line-height: 32px;
}
</style>
