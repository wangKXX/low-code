<template>
  <div class="lowcode-container">
    <el-container>
      <el-header>
        <el-button @click="handleClick" type="primary">预览</el-button>
      </el-header>
      <el-container style="height: calc(100% - 60px); position: relative">
        <el-aside width="60px">
          <ComponentsMain ref="componentsMainRef"></ComponentsMain>
        </el-aside>
        <el-main>
          <iframe src="/engine"></iframe>
        </el-main>
        <el-aside>
          <ComponentPropsSetting></ComponentPropsSetting>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import ComponentsMain from './ComponentsMain.vue'
import ComponentPropsSetting from './ComponentPropsSetting.vue'
import router from '@/router'
import { ref, provide, onMounted } from 'vue'
declare let window: any

const componentsMainRef = ref<InstanceType<typeof ComponentsMain>>()
provide('ModalInstance', componentsMainRef)
const handleClick = () => {
  router.push({ name: 'preview' })
}
onMounted(() => {
  window.componentsMainRef = componentsMainRef
})
</script>
<style lang="less" scoped>
.lowcode-container {
  height: 100%;
  :deep(.el-container) {
    height: 100%;
  }
  :deep(.el-main) {
    background-color: #f0f0f0;
  }
  :deep(.el-aside) {
    border-left: 1px solid #e8e8e8;
  }
  :deep(.el-header) {
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
