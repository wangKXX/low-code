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
        <el-col :span="6">水平</el-col>
        <el-col :span="18"
          ><el-radio-group size="small" @change="handleRadioChange" v-model="justify">
            <el-radio-button label="default">默认</el-radio-button>
            <el-radio-button label="flex justify-start">左对齐</el-radio-button>
            <el-radio-button label="flex justify-end">右对齐</el-radio-button>
            <el-radio-button label="flex justify-center">居中</el-radio-button>
            <el-radio-button label="flex justify-evenly">等分</el-radio-button>
            <el-radio-button label="flex justify-between">两端</el-radio-button></el-radio-group
          ></el-col
        >
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">垂直</el-col>
        <el-col :span="18"
          ><el-radio-group size="small" @change="handleRadioChange" v-model="items">
            <el-radio-button label="default">默认</el-radio-button>
            <el-radio-button label="flex items-center">居中</el-radio-button>
            <el-radio-button label="flex items-start">上对齐</el-radio-button>
            <el-radio-button label="flex items-end">下对齐</el-radio-button>
            <el-radio-button label="flex items-baselinet">基线对齐</el-radio-button>
            <el-radio-button label="flex items-stretch">铺满</el-radio-button>
          </el-radio-group></el-col
        >
      </el-row>
    </el-card>
    <SheetBackgroundEditer :sheets="component.sheets"></SheetBackgroundEditer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, toRefs, watch } from 'vue'
// @ts-ignore
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/addon/display/placeholder.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/theme/dracula.css'
import type { IComponent } from '@/stores'
import SheetBackgroundEditer from './SheetBackgroundEditer.vue'

const emit = defineEmits<{
  code: [code: string]
}>()
const props = defineProps<{ component: IComponent }>()
const { component } = toRefs(props)
const parseClassName = (tag: string) =>
  component.value.sheets?.className.split(' ').find((str: string) => str.startsWith(tag)) || ''
const justify = ref(parseClassName('justify') ? `flex ${parseClassName('justify')}` : 'default')
const items = ref(parseClassName('items') ? `flex ${parseClassName('items')}` : 'default')
const code = ref(
  component.value.sheets?.inlineSheets ||
    `{

}
`
)
watch(component.value, () => {
  code.value = component.value.sheets?.inlineSheets || `{

  }`
})
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
  component.value.sheets ||= { inlineSheets: '', className: '' }
  component.value.sheets.className = `${justify.value} ${items.value.replace('flex', '')}`
}
</script>
<style lang="less" scoped>
:deep(.el-card__header) {
  padding: 10px;
  background-color: #e4e7ed;
  .el-col-6 {
    line-height: 38px;
  }
}
</style>
