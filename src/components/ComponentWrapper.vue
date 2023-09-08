<template>
  <div
    :class="`component-wrapper ${isCurrent ? 'clicked' : ''} ${className} ${
      mateData.type === 'LAYOUT' ? 'pointer-events' : ''
    } ${mateData.sheets?.className}`"
    v-if="!preview"
    @click.stop="handleClick"
    @dragleave="handleLeave"
    @dragover.self="handleDragover($event)"
    draggable="true"
    @dragstart.stop="dragstart($event)"
    @dragenter.prevent
  >
    <component
      :is="componentName"
      v-bind="propsValue"
      :mateData="mateData"
      :globalPageData="globalPageData"
      :id="mateData.componentId"
      :style="styleSheets"
      :class="mateData.type === 'LAYOUT' ? mateData.sheets?.className : ''"
    >
    </component>
    <div class="active-menu" v-if="isCurrent">
      <el-icon color="#ffffff" size="20" v-if="isTopComponent" @click.stop="handlerMenuClick('top')"
        ><Top
      /></el-icon>
      <el-icon
        color="#ffffff"
        size="20"
        v-if="isBottomComponent"
        @click.stop="handlerMenuClick('bottom')"
        ><Bottom
      /></el-icon>
      <el-icon color="#ffffff" size="20" @click.stop="handlerMenuClick('delete')"
        ><Delete
      /></el-icon>
    </div>
  </div>
  <div :class="`component-wrapper ${mateData.sheets?.className}`" v-else>
    <component
      :is="componentName"
      v-bind="propsValue"
      :mateData="mateData"
      :preview="preview"
      :style="styleSheets"
      :class="mateData.sheets?.className"
    >
    </component>
  </div>
</template>
>

<script lang="ts" setup>
import { useCurrentComponent } from '@/stores'
import type { IComponent, ISchema } from '@/stores'
import { Bottom } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { EPositon } from './types'
import type { IChangeComponent } from './types'
import { findComponentIndex, parseCssCode } from '@/utils/common'

interface IComponentWrapper {
  componentName: string
  editeAble?: boolean
  mateData: IComponent
  parentMateData: IComponent[]
  globalPageData: IComponent
  preview: boolean
}
interface IEventMap {
  [propName: string]: () => any
}
const { componentName, mateData, parentMateData, globalPageData, preview } =
  defineProps<IComponentWrapper>()
const { setCurrentComponentId } = useCurrentComponent()
const { currentComponentId } = storeToRefs<ReturnType<typeof useCurrentComponent>>(
  useCurrentComponent()
)

const handleClickTop = () => {
  const index = findComponentIndex(currentComponentId.value, parentMateData)
  parentMateData.splice(index - 1, 0, parentMateData.splice(index, 1)[0] as IComponent)
}
const handleClickBottom = () => {
  const index = findComponentIndex(currentComponentId.value, parentMateData)
  parentMateData.splice(index + 1, 0, parentMateData.splice(index, 1)[0] as IComponent)
}
const handleClickDelete = () => {
  const index = findComponentIndex(currentComponentId.value, parentMateData)
  parentMateData.splice(index, 1)
}

const handlerMenuClick = (type: string) => {
  const eventMap: IEventMap = {
    top: handleClickTop,
    bottom: handleClickBottom,
    delete: handleClickDelete
  }
  eventMap[type]()
}

const isCurrent = computed(() => currentComponentId.value === mateData.componentId)

const isTopComponent = computed(() => {
  return findComponentIndex(currentComponentId.value, parentMateData)
})

const propsValue = computed(() => {
  return Object.keys(mateData.schema).reduce((prev: any, k: string) => {
    prev[k] = (mateData.schema[k] as ISchema)?.value
    return prev
  }, {} as IComponent)
})

const styleSheets = computed(() => {
  const sheetsStr = mateData.sheets?.inlineSheets
  return parseCssCode(sheetsStr)
})

const isBottomComponent = computed(() => {
  return findComponentIndex(currentComponentId.value, parentMateData) !== parentMateData.length - 1
})

const className = ref<string>('')
const emit = defineEmits<{ componentIndex: [payload: IChangeComponent] }>()
const clear = () => {
  className.value = ''
}

const handleClick = () => {
  console.log(mateData.componentId, 'click')
  setCurrentComponentId(mateData.componentId || '')
}

const handleLeave = clear

const handleDragover = (event: any) => {
  event.preventDefault()
  const {
    target: { clientHeight },
    offsetY
  } = event
  if (offsetY >= clientHeight / 2 - 5) {
    className.value = EPositon.BOTTOM
    emit('componentIndex', {
      componentId: mateData.componentId,
      position: EPositon.BOTTOM,
      clear,
      parentMateData,
      globalPageData
    })
  } else {
    className.value = EPositon.TOP
    emit('componentIndex', {
      componentId: mateData.componentId,
      position: EPositon.TOP,
      clear,
      parentMateData,
      globalPageData
    })
  }
}

const dragstart = (event: DragEvent) => {
  event.dataTransfer?.setData('componentMateData', JSON.stringify(mateData))
}
</script>

<style scoped lang="less">
.component-wrapper {
  position: relative;
  box-sizing: border-box;
  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    cursor: pointer;
    // pointer-events: none;
  }
  &.clicked {
    border: 1px solid #1989fa;
  }
  &.BOTTOM {
    border-bottom: 2px solid #1989fa;
  }
  &.TOP {
    border-top: 2px solid #1989fa;
  }
  .active-menu {
    position: absolute;
    bottom: -34px;
    right: -1px;
    padding: 4px;
    z-index: 2;
    cursor: pointer;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #1989fa;
  }
}
.pointer-events {
  &::before {
    pointer-events: none;
  }
}
</style>
