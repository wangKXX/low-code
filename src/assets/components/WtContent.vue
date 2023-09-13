<template>
  <div class="w-content" @drop.stop="handleDrop" @dragover.prevent v-if="!preview">
    <div class="w-content-tips" v-if="!mateData.children?.length">请拖动组件到这里</div>
    <template v-else>
      <div
        class="engine-container-item"
        v-for="component in mateData.children"
        :key="`component-page-${component.componentId}`"
      >
        <ComponentWrapper
          :componentName="component.componentName"
          :mateData="component"
          @componentIndex="changeComponent"
          :parentMateData="mateData.children"
          :globalPageData="globalPageData"
          :preview="preview"
        >
        </ComponentWrapper>
      </div>
    </template>
  </div>
  <div class="w-content" :class="{ preview: preview }" v-else>
    <div
      class="engine-container-item"
      v-for="component in mateData.children"
      :key="`component-page-${component.componentId}`"
    >
      <ComponentWrapper
        :componentName="component.componentName"
        :mateData="component"
        @componentIndex="changeComponent"
        :parentMateData="mateData.children"
        :globalPageData="globalPageData"
        :preview="preview"
      >
      </ComponentWrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import type { IComponent } from '@/stores'
import { v4 as uuidv4 } from 'uuid'
import type { IChangeComponent } from '@/components/types'
import { findComponentIndex, getRepalceIndex, globalRemoveComponentById } from '@/utils/common'

const props = defineProps<{
  mateData: IComponent
  globalPageData: IComponent
  preview?: boolean
}>()
const { mateData, globalPageData, preview } = toRefs(props)
const componentIndex = ref<number>(-2)
const clearSelectComponentSheet = ref<() => void>()
let globalPageMateData = globalPageData
let moveComponentParentMateData = mateData.value.children

const isInArrayMiddle = () => {
  return componentIndex.value >= 0 && moveComponentParentMateData.length > componentIndex.value
}
const handleDrop = (event: DragEvent): void => {
  mateData.value.children ||= []
  moveComponentParentMateData ||= mateData.value.children
  const componentMateDataStr: string = event.dataTransfer?.getData('componentMateData') || ''
  try {
    const componentMateData: IComponent = JSON.parse(componentMateDataStr)
    const { componentId } = componentMateData
    componentId && globalRemoveComponentById(componentId, globalPageMateData.value?.children || [])
    Object.assign(componentMateData, { componentId: uuidv4() })
    if (isInArrayMiddle()) {
      moveComponentParentMateData.splice(componentIndex.value, 0, componentMateData as any)
    } else {
      moveComponentParentMateData.push(componentMateData as any)
    }
    componentIndex.value = -2
    clearSelectComponentSheet.value && clearSelectComponentSheet.value()
  } catch (error) {
    throw error
  }
}

const changeComponent = (payload: IChangeComponent) => {
  const { componentId = '', position, clear, parentMateData, globalPageData } = payload
  moveComponentParentMateData = parentMateData
  globalPageMateData.value = globalPageData
  componentIndex.value = getRepalceIndex(
    findComponentIndex(componentId, parentMateData || []),
    position
  )
  clearSelectComponentSheet.value = clear
}
</script>

<style lang="less">
.w-content {
  width: 100%;
  border: 1px dashed #a7b1bd;
  padding: 16px;
  .w-content-tips {
    background-color: #f0f0f0;
    padding: 16px;
    text-align: center;
    color: #a7b1bd;
  }
  &.preview {
    border: none;
  }
}
</style>
