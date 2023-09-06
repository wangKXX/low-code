<template>
  <div class="component-sheets-editer" ref="elRef">
    <el-button type="primary" size="small" @click="handleSave" style="float: right">保存</el-button>
    <Codemirror
      v-if="isShow"
      v-model:value="code"
      :options="cmOptions"
      border
      placeholder="请输入css"
      :height="200"
      @change="handleChange"
    />
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>布局</span>
        </div>
      </template>
      <el-row :gutter="24">
        <el-col :span="7">水平对齐</el-col>
        <el-col :span="17"
          ><el-radio-group size="small">
            <el-radio-button name="New York" />
            <el-radio-button name="Washington" />
            <el-radio-button name="Los Angeles" />
            <el-radio-button name="Chicago" /> </el-radio-group
        ></el-col>
      </el-row>
      <el-row :gutter="24" >
        <el-col :span="7">垂直对齐</el-col>
        <el-col :span="17"
          ><el-radio-group size="small" @change="handleRadioChange" v-model="value1">
            <el-radio-button name="New York" label="flex items-center"/>
            <el-radio-button name="Washington" />
            <el-radio-button name="Los Angeles" />
            <el-radio-button name="Chicago" /> </el-radio-group
        ></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
// @ts-ignore
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/addon/display/placeholder.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/theme/dracula.css'
import type { IComponent } from '@/stores'

const value1 = ref('')
const emit = defineEmits<{
  code: [code: string]
}>()
const { component } = defineProps<{ component: IComponent }>()
const code = ref(`{

}
`)
const handleChange = (value: string, editor: any) => {
  editor.showHint()
}
const handleSave = () => {
  emit('code', code.value)
}
const isShow = ref<boolean>(false)
const elRef = ref(null)
const cmOptions = {
  mode: 'text/css',
  theme: 'dracula',
  hintOptions: {
    completeSingle: false
  }
}
onMounted(async () => {
  await nextTick()
  isShow.value = true
})

const handleRadioChange = (args: any) => {
  console.log(args)
  component.sheets ||= {inlineSheets: '', className: ''}
  component.sheets.className = args;
}
</script>
