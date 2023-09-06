<template>
  <el-button v-bind="props">{{ props.content }}</el-button>
</template>

<script setup lang="ts">
enum ESize {
  large = 'large',
  default = 'default',
  small = 'small'
}
interface IButton {
  size: ESize
  type: string
  plain: boolean
  content: string
}
const props = defineProps<IButton>()
</script>
