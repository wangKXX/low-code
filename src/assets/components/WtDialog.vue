<template>
  <el-button type="primary" size="default" @click="dialogVisible = true" v-if="!props.preview">模态框</el-button>

  <el-dialog v-model="dialogVisible" :title="title" :width="width" :before-close="beforeClose">
    <WContent
      :preview="props.preview"
      :mate-data="props.mateData"
      :global-page-data="props.globalPageData"
    ></WContent>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ cancelTxt }}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{ confirmTxt }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import WContent from './WtContent.vue'
import type { IComponent, IEvent } from '@/stores'
import { dispatchEvent } from '@/utils/functionHelper';
interface IWDialog {
  confirmTxt?: string
  cancelTxt?: string
  title?: string
  width?: number | string
  preview: boolean
  mateData: IComponent
  globalPageData: IComponent
  events: IEvent[]
}
const props = defineProps<IWDialog>() 
const { confirmTxt = 'Confirm', cancelTxt = 'Cancel', title = 'Tips', width = '30%' } = toRefs(props)
const dialogVisible = ref<boolean>(props.preview ? false : true)
const show = () => {
  dialogVisible.value = true
}
const beforeClose = () => {
  dispatchEvent('beforeClose', props.events)
  dialogVisible.value = false
}
defineExpose({
  show
})
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
