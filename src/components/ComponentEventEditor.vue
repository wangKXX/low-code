<template>
  <el-row :gutter="24" v-for="(event, index) in component.events" :key="`event-${index}`">
    <el-col :span="6" class="items-center" style="display: flex">{{ event.eventType }}</el-col>
    <el-col :span="18">
      <el-button @click="handleClick(event)">{{ event.description }}</el-button>
    </el-col>
  </el-row>
  <el-dialog v-model="dialogTableVisible" title="事件编辑">
    <Codemirror
      v-if="isShow"
      v-model:value="code"
      :options="cmOptions"
      border
      placeholder="请输入事件代码"
      :height="200"
      @change="handleChange"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCodeMOdalSave"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import type { IComponent, IEvent } from '@/stores'
// @ts-ignore
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/addon/display/placeholder.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/dracula.css'
// @ts-ignore
import * as Babel from '@babel/standalone'
const cmOptions = {
  mode: 'text/javascript',
  theme: 'dracula',
  hintOptions: {
    completeSingle: false
  }
}
const defaultValue = `const customEvent = async({router, fetch, refs, extra}) => {
  // 请在这里编写代码
  /**
   * router为vue router对象
   * fetch为引擎提供的请求方法
   * refs为当前页面refs
   * extra 额外的参数具体参见组件文档
  */
}`
const code = ref('')
const handleCodeMOdalSave = ref<() => void>()
const isShow = ref<boolean>(false)
const { component } = defineProps<{ component: IComponent }>()
const dialogTableVisible = ref<boolean>(false)
const handleClick = async (event: IEvent) => {
  code.value = event.defaultValue || defaultValue
  dialogTableVisible.value = true
  await nextTick()
  isShow.value = true
  handleCodeMOdalSave.value = () => {
    event.defaultValue = code.value
    event.ES5Value = Babel.transform(`${code.value}`, { presets: ['env'] }).code + 'return customEvent'
    dialogTableVisible.value = false
  }
}
const handleChange = (value: string, editor: any) => {
  console.log(value)
  editor.showHint()
}
</script>
