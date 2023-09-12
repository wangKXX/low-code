import { defineStore } from 'pinia'
import { ref, computed, toRefs } from 'vue'
import type { IComponent } from '@/stores'
import { findComponent } from '@/utils/common'
import { v4 as uuidv4 } from 'uuid'

export const useCurrentComponent = defineStore(
  'useCurrentComponent',
  () => {
    // 当前选中组件Id
    const currentComponentId = ref<string>('')
    // 当前页面schema
    const pageComponents = ref<IComponent>({
      componentName: 'Page',
      package: '',
      version: '',
      exportName: '',
      showName: '',
      icon: '',
      componentId: uuidv4(),
      schema: {},
      children: [],
      type: ''
    })
    const setCurrentComponentId = (id: string) => {
      currentComponentId.value = id
    }

    // 当前组件
    const currentComponent = computed(() => {
      return findComponent(currentComponentId.value, pageComponents.value.children as IComponent[])
    })

    return {
      pageComponents: pageComponents.value,
      currentComponentId,
      setCurrentComponentId,
      currentComponent: currentComponent
    }
  },
  {
    persist: true
  }
)
