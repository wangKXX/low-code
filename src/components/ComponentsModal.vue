<template>
  <div class="drawer-wrapper">
    <el-drawer
      v-model="drawer"
      title="组件库"
      direction="ltr"
      :modal="false"
      size="100%"
      modal-class="component-drawer"
    >
      <div class="components-container">
        <div
          class="component-item"
          v-for="(component, index) in components"
          :key="`component-item-${index}`"
          @dragstart="dragstart($event, component)"
          @dragend="dragend()"
          draggable="true"
        >
          <span class="component-name">{{ component.showName }}</span>
          <Icon :icon="component.icon"></Icon>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useComponents } from '@/stores'
import type { IComponent } from '@/stores'
import Icon from './Icon.vue'

defineProps({
  root: HTMLDivElement
})

const { components } = useComponents()

const drawer = ref(false)
const tiggerDrawer = () => {
  drawer.value = !drawer.value
}
const dragstart = (event: DragEvent, component: Omit<IComponent, 'children'>) => {
  drawer.value = false
  event.dataTransfer?.setData('componentMateData', JSON.stringify(component))
}
const hide = () => {
  drawer.value = false
}
const dragend = () => {
  drawer.value = true
}

defineExpose({
  tiggerDrawer,
  hide
})
</script>

<style lang="less" scoped>
:deep(.component-drawer) {
  width: 300px;
  position: absolute !important;
  left: 60px !important;
  .el-drawer{
    box-shadow: none;
  }
  .el-drawer__header{
    margin-bottom: 0;
  }
  .components-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(54px, 1fr));
    grid-column-gap: 4px;
    grid-row-gap: 8px;

    .component-item {
      width: 50px;
      height: 50px;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      font-size: 12px;
      text-align: center;
      display: flex;
      flex-direction: column;

      align-items: center;
      .component-name {
        color: #666;
        transform: scale(0.8);
      }
    }
  }
}
</style>
