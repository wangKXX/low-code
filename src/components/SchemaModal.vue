<template>
  <div class="drawer-wrapper">
    <el-drawer
      v-model="drawer"
      title="大纲树"
      direction="ltr"
      :modal="false"
      size="100%"
      modal-class="component-drawer"
    >
      <div class="components-container">
        <el-input v-model="filterText" placeholder="过滤节点" />
        <el-tree
          ref="treeRef"
          node-key="componentId"
          :current-node-key="currentComponentId"
          :data="[pageComponents]"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="nodeClick"
          :expand-on-click-node="false"
          highlight-current
          :indent="10"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCurrentComponent } from '@/stores'
import { storeToRefs } from 'pinia'
// import type { ElTree } from 'element-plus'
defineProps({
  root: HTMLDivElement
})
interface Tree {
  [key: string]: any
}
const { setCurrentComponentId } = useCurrentComponent()
const { pageComponents, currentComponentId } = storeToRefs(useCurrentComponent())
const filterText = ref<string>('')
const treeRef = ref<any>()

const defaultProps = {
  children: 'children',
  label: 'showName'
}
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})
const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}
const drawer = ref(false)
const tiggerDrawer = () => {
  drawer.value = !drawer.value
}

const hide = () => {
  drawer.value = false
}

const nodeClick = (node: any) => {
  setCurrentComponentId(node.componentId)
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
  .el-drawer {
    box-shadow: none;
  }
  .el-drawer__header {
    margin-bottom: 0;
  }
  .components-container {
    .el-input {
      margin-bottom: 8px;
    }
  }
}
</style>
