<template>
  <div class="prop-list-wrapper">
    <div
      v-for="(item, index) in value"
      :key="`prop-setting-${index}`"
      class="prop-list-item-wrapper"
    >
      <el-icon size="15" @click="handlerRemove(index)"><CircleClose /></el-icon>
      <template v-for="(key, idx) in Object.keys(item)" :key="`prop-setting-item-${idx}`">
        <div class="props-item" v-if="key === 'hideInSearch'">
          <div class="props-item-label">{{ key }}</div>
          <el-checkbox v-model="item[key]"></el-checkbox>
        </div>
        <div class="props-item" v-else-if="key === 'type'">
          <span class="props-item-label">{{ key }}</span>
          <el-radio-group v-model="item[key]" size="small">
            <el-radio-button label="text">文本</el-radio-button>
            <el-radio-button label="date">日期</el-radio-button>
            <el-radio-button label="select">选择项</el-radio-button>
          </el-radio-group>
        </div>
        <div class="props-item" v-else-if="key === 'valueEnmu'">
          <template v-if="item.type === 'select'">
            <span class="props-item-label">{{ key }}</span>
            <el-row v-for="(enmu, selectIndex) in item[key] || []" align="middle" justify="center" style="margin-bottom: 8px;">
              <el-col :span="11"
                ><el-input v-model="enmu.label" placeholder="label"></el-input
              ></el-col>
              <el-col :span="11"
                ><el-input v-model="enmu.value" placeholder="value"></el-input
              ></el-col>
              <el-col :span="2"
                ><el-icon size="15" @click="handlerSelectRemove(item[key], selectIndex)"><CircleClose /></el-icon></el-col>
            </el-row>
            <el-button type="text" plain @click="handleSelectAdd(item, 'valueEnmu')"
              >添加一项</el-button
            >
          </template>
        </div>
        <div class="props-item" v-else>
          <span class="props-item-label">{{ key }}</span>
          <el-input v-model="item[key]" placeholder="请输入"></el-input>
        </div>
      </template>
    </div>

    <el-button type="primary" plain @click="handlerClick"
      ><el-icon><Plus /></el-icon>添加一行</el-button
    >
  </div>
</template>

<script setup lang="ts">
interface IPropsSettingList {
  value: {
    [propName: string]: any
  }[]
}
const { value } = defineProps<IPropsSettingList>()

const getItemtemplate = () => {
  const [item = {}] = value
  return Object.keys(item).reduce((prev: { [propName: string]: string }, k: string) => {
    prev[k] = ''
    return prev
  }, {})
}
const handlerClick = () => {
  value.push(getItemtemplate())
}
const handlerRemove = (index: number) => {
  value.splice(index, 1)
}
const handlerSelectRemove = (source: any, index: number) => {
  source.splice(index, 1)
}
const handleSelectAdd = (soure: any, key: string) => {
  soure[key] ||= []
  soure[key].push({})
}
</script>

<style lang="less" scoped>
.prop-list-wrapper {
  border: 1px solid #e8e8e8;
  padding: 4px;
  border-radius: 4px;
  .props-item-label {
    display: block;
    color: #000;
    font-size: 12px;
    font-weight: 600;
  }
  .prop-list-item-wrapper {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    background-color: #f8f8f8;
    padding: 4px;
    margin-bottom: 4px;
    position: relative;
    &>:deep(.el-icon) {
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
      &:hover {
        color: #36f;
      }
    }
    :deep(.el-icon) {
      cursor: pointer;
      &:hover {
        color: #36f;
      }
    }
  }
  :deep(.el-button) {
    width: 100%;
  }
  :deep(.el-checkbox) {
    height: auto;
  }
}
</style>
