<template>
  <div class="components-main">
    <div class="menus" :ref="rootDom">
      <div
        class="menu-item"
        v-for="({ componentName, event }, index) in menus"
        :key="`menu-item-${index}`"
      >
        <el-icon :size="20" @click="event">
          <component :is="componentName"></component>
        </el-icon>
      </div>
    </div>
    <ComponentsModal ref="componentModalRef" :root="rootDom"></ComponentsModal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ComponentsModal from './ComponentsModal.vue'
const componentModalRef = ref<InstanceType<typeof ComponentsModal>>()
const rootDom = ref()
const handlerComponentModalOpen = () => {
  componentModalRef.value?.openDrawer()
}
const menus = [
  {
    componentName: 'Menu',
    event: handlerComponentModalOpen
  }
]
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
  }
}
</style>
