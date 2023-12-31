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
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>基础组件</span>
          </div>
        </template>
        <div class="components-container">
          <div
            class="component-item"
            v-for="(component, index) in baseComponent"
            :key="`component-item-${index}`"
            @dragstart="dragstart($event, component)"
            @dragend="dragend()"
            draggable="true"
          >
            <span class="component-name">{{ component.showName }}</span>
            <Icon :icon="component.icon"></Icon>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>布局组件</span>
          </div>
        </template>
        <div class="components-container">
          <div
            class="component-item"
            v-for="(component, index) in layoutComponent"
            :key="`component-item-${index}`"
            @dragstart="dragstart($event, component)"
            @dragend="dragend()"
            draggable="true"
          >
            <span class="component-name">{{ component.showName }}</span>
            <Icon :icon="component.icon"></Icon>
          </div>
        </div>
      </el-card>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useComponents } from '@/stores'
import type { IComponent } from '@/stores'
import Icon from './Icon.vue'

defineProps({
  root: HTMLDivElement
})

const { components } = useComponents()

const baseComponent = computed(() => {
  return components.filter(({ type }) => type === 'BASE')
})

const layoutComponent = computed(() => {
  return components.filter(({ type }) => type === 'LAYOUT')
})
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
:deep(.el-card__header) {
  padding: 10px;
  font-size: 14px;
}
:deep(.component-drawer) {
  width: 300px;
  position: absolute !important;
  left: 60px !important;
  .el-card{
    margin-bottom: 4px;
  }
  .el-card.is-always-shadow{
    box-shadow: none;
    border-radius: 0
  }
  .el-card__body{
    padding: 10px;
  }
  .el-drawer {
    box-shadow: none;
    .el-drawer__body{
      padding: 0;
    }
  }
  .el-drawer__header {
    margin-bottom: 0;
  }
  .components-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(54px, 1fr));
    grid-column-gap: 4px;
    grid-row-gap: 8px;

    .component-item {
      width: 100%;
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
