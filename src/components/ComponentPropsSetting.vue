<template>
  <div v-if="!currentComponentId" class="props-setting-tips">请在左侧画布选中节点</div>
  <div class="props-setting" v-else>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="属性" name="1">
        <ComponentPropsEidtor :schemaCurrent="current.schema || {}"></ComponentPropsEidtor>
      </el-collapse-item>
      <el-collapse-item title="事件" name="2"></el-collapse-item>
      <el-collapse-item title="样式" name="3">
        <ComponentSheetsEditer
          v-if="activeNames.includes('3')"
          @code="saveSheetsCode"
          :component="current"
        ></ComponentSheetsEditer>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCurrentComponent, type ISchema } from '@/stores'
import { storeToRefs } from 'pinia'
import { findComponent } from '@/utils/common'
import type { IComponent } from '@/stores'
import ComponentSheetsEditer from './ComponentSheetsEditor.vue'
import ComponentPropsEidtor from './ComponentPropsEidtor.vue'

const activeNames = ref(['1'])
const { currentComponentId, pageComponents } = storeToRefs<ReturnType<typeof useCurrentComponent>>(
  useCurrentComponent()
)

const current = computed<any>(
  () => findComponent(currentComponentId.value, pageComponents.value.children as IComponent[]) || {}
)

const saveSheetsCode = (code: string): void => {
  current.value.sheets.inlineSheets = code;
}
</script>

<style lang="less" scoped>
.props-setting {
  :deep(.el-collapse-item__header) {
    padding-left: 8px;
  }
  :deep(.el-collapse-item__wrap) {
    padding: 0 8px 0 8px;
  }
}
.props-setting-tips {
  text-align: center;
  padding: 8px;
  color: #a7b1bd;
}

</style>
