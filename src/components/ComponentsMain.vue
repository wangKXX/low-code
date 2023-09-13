<template>
  <div class="components-main">
    <div class="menus" :ref="rootDom">
      <div
        class="menu-item"
        v-for="({ componentName, event, tips }, index) in menus"
        :key="`menu-item-${index}`"
      >
        <el-tooltip effect="dark" :content="tips" placement="right">
          <el-icon :size="20" @click="event">
            <component :is="componentName"></component>
          </el-icon>
        </el-tooltip>
      </div>
    </div>
    <ComponentsModal ref="componentModalRef" :root="rootDom"></ComponentsModal>
    <SchemaModal ref="schemaModalRef" :root="rootDom"></SchemaModal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ComponentsModal from './ComponentsModal.vue'
import SchemaModal from './SchemaModal.vue'
type TComponentsModalRef = InstanceType<typeof ComponentsModal>
type TSchemaModalRef = InstanceType<typeof SchemaModal>
const componentModalRef = ref<TComponentsModalRef>()
const schemaModalRef = ref<TSchemaModalRef>()
const rootDom = ref()
const closeOthers = (refInstance: any) => {
  [componentModalRef, schemaModalRef]
    .filter((instance: any) => refInstance !== instance)
    .forEach((instance: any) => {
      instance.value?.hide()
    })
}
const closeAllModal = () => {
  closeOthers('')
}
const handlerComponentModalOpen = () => {
  closeOthers(componentModalRef)
  componentModalRef.value?.tiggerDrawer()
}
const schemaModaTigger = () => {
  closeOthers(schemaModalRef)
  schemaModalRef.value?.tiggerDrawer()
}
const menus = [
  {
    componentName: 'SetUp',
    event: handlerComponentModalOpen,
    tips: '组件库'
  },
  {
    componentName: 'Tickets',
    tips: '大纲树',
    event: schemaModaTigger
  }
]
defineExpose({
  closeAllModal
})
</script>

<style lang="less" scoped>
.components-main {
  width: 100%;
  height: 100%;
  border-right: 1px solid #e8e8e8;
  box-sizing: border-box;
  padding: 8px;

  .menus {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .menu-item {
      width: 46px;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
