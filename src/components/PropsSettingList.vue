<template>
  <div class="prop-list-wrapper">
    <div
      v-for="(item, index) in value"
      :key="`prop-setting-${index}`"
      class="prop-list-item-wrapper"
    >
      <el-icon size="15" @click="handlerRemove(index)"><CircleClose /></el-icon>
      <div
        class="props-item"
        v-for="(key, idx) in Object.keys(item)"
        :key="`prop-setting-item-${idx}`"
      >
        <span class="props-item-label">{{ key }}：</span>
        <el-input v-model="item[key]" placeholder="请输入"></el-input>
      </div>
    </div>
    <el-button type="primary" plain @click="handlerClick"
      ><el-icon><Plus /></el-icon>添加一行</el-button
    >
  </div>
</template>

<script setup lang="ts">
interface IPropsSettingList {
  value: {
    [propName: string]: string
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
</script>

<style lang="less" scoped>
.prop-list-wrapper {
  border: 1px solid #e8e8e8;
  padding: 4px;
  border-radius: 4px;
  .prop-list-item-wrapper {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    background-color: #f8f8f8;
    padding: 4px;
    margin-bottom: 4px;
    position: relative;
  }
  :deep(.el-button) {
    width: 100%;
  }
  :deep(.el-icon) {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    &:hover {
      color: #36f;
    }
  }
}
</style>
