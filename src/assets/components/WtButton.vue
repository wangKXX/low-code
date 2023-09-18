<template>
  <el-button v-bind="props" @click="onClick">{{ props.content }}</el-button>
</template>

<script setup lang="ts">
import type { IEvent } from '@/stores'
import { dispatchEvent } from '@/utils/functionHelper'
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
  events: IEvent[]
}

const props = defineProps<IButton>()

const onClick = () => {
  dispatchEvent('onClick', props.events)
}
</script>
