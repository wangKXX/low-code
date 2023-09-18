<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>背景</span>
      </div>
    </template>
    <el-row :gutter="24">
      <el-col :span="5">背景</el-col>
      <el-col :span="19"
        ><el-radio-group size="small" v-model="backgroundType">
          <el-radio-button label="color">颜色</el-radio-button>
          <el-radio-button label="image">图片</el-radio-button></el-radio-group
        ></el-col
      >
    </el-row>
    <div v-show="backgroundType === 'color'">
      <el-row :gutter="24">
        <el-col :span="5"></el-col>
        <el-col :span="19">
          <el-color-picker
            v-model="backgroundColor"
            @change="(value: string) => normalCssValueChange(value, 'background-color')"
          />
        </el-col>
      </el-row>
    </div>
    <div v-show="backgroundType === 'image'">
      <el-row :gutter="24">
        <el-col :span="5"></el-col>
        <el-col :span="19">
          <el-input
            v-model="backgroundImage"
            placeholder="请输入URL"
            clearable
            @blur="imageChange"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="5">尺寸</el-col>
        <el-col :span="19"
          ><el-radio-group
            size="small"
            @change="(value: string) => normalCssValueChange(value, 'background-size')"
            v-model="backGroundSize"
          >
            <el-radio-button label="inherit">默认</el-radio-button>
            <el-radio-button label="contain">等比填充</el-radio-button>
            <el-radio-button label="cover">等比覆盖</el-radio-button>
          </el-radio-group></el-col
        >
      </el-row>
      <el-row :gutter="24">
        <el-col :span="5">重复</el-col>
        <el-col :span="19"
          ><el-radio-group
            size="small"
            @change="(value: string) => normalCssValueChange(value, 'background-repeat')"
            v-model="backGroundRepeat"
          >
            <el-radio-button label="inherit">默认</el-radio-button>
            <el-radio-button label="no-repeat">不重复</el-radio-button>
            <el-radio-button label="repeat-x">水平</el-radio-button>
            <el-radio-button label="repeat-y">垂直</el-radio-button>
          </el-radio-group></el-col
        >
      </el-row>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { type ISheets } from '@/stores'
import {
  replaceCssCode,
  getCssValue,
  formatUrlToStr,
  removeCssByCssName
} from '@/utils/sheetsHelper'
const props = defineProps<{ sheets: ISheets }>()
let { sheets } = toRefs(props)

const backgroundType = ref<string>('color')
const backgroundImage = ref<string>(
  formatUrlToStr(sheets?.value?.inlineSheets || '', 'background-image')
)
const backgroundColor = ref<string>(
  getCssValue(sheets?.value?.inlineSheets || '', 'background-color') || '#FFF'
)

const backGroundSize = ref<string>(
  getCssValue(sheets?.value?.inlineSheets || '', 'background-size') || 'inherit'
)

const backGroundRepeat = ref<string>(
  getCssValue(sheets?.value?.inlineSheets || '', 'background-repeat') || 'inherit'
)

watch(props, () => {
  backgroundColor.value = getCssValue(sheets.value.inlineSheets, 'background-color')
  backgroundImage.value = formatUrlToStr(sheets?.value?.inlineSheets || '', 'background-image')
  backGroundSize.value = getCssValue(sheets?.value?.inlineSheets || '', 'background-size')
  backGroundRepeat.value = getCssValue(sheets?.value?.inlineSheets || '', 'background-repeat')
})
const normalCssValueChange = (value: string, cssName: string) => {
  sheets.value.inlineSheets = replaceCssCode(sheets.value.inlineSheets, cssName, value)
}
const imageChange = (event: any) => {
  if (!event?.target?.value)
    return (sheets.value.inlineSheets = removeCssByCssName(
      sheets.value.inlineSheets,
      'background-image'
    ))
  normalCssValueChange(`url(${event?.target?.value})`, 'background-image')
}
</script>

<style lang="less" scoped>
:deep(.el-col-5) {
  line-height: 35px;
  background-repeat: no-repeat;
}
</style>
