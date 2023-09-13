import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IComponent } from '@/stores'
import { v4 as uuidv4 } from 'uuid'

export const useCurrentComponent = defineStore(
  'useCurrentComponent',
  () => {
    const pageId = uuidv4()
    // 当前选中组件Id
    const currentComponentId = ref<string>(pageId)
    const pageComponents = ref<IComponent>({
      componentName: 'Page',
      package: '',
      version: '',
      exportName: '',
      showName: '页面',
      icon: '',
      componentId: pageId,
      schema: {},
      sheets: {
        inlineSheets: '',
        className: ''
      },
      events: [
        { eventType: 'onload', description: '加载完成触发'}
      ],
      children: [],
      type: 'PAGE'
    })
    const setCurrentComponentId = (id: string) => {
      currentComponentId.value = id
    }

    return {
      pageComponents: pageComponents,
      currentComponentId,
      setCurrentComponentId,
    }
  },
  {
    persist: {
      serializer: {
        serialize: (value: any) => {
          return JSON.stringify(value)
        },
        deserialize: (store: string) => {
          return JSON.parse(store)
        }
      }
    }
  }
)
