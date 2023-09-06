<template>
  <img :src="icon" v-if="isHttp" />
  <el-icon :size="25" v-else>
    <component :is="icon"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Icon {
  icon: string
}
const { icon } = defineProps<Icon>()

const isHttp = computed(() => /^(http|https)/.test(icon))
</script>
