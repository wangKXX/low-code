import { defineStore } from 'pinia'
import { reactive } from 'vue'

export interface ISchemaItem {
  type: string
  options?: string[]
  value: string | number | boolean
  title?: string
}

export interface ISchema {
  [propName: string]: ISchemaItem | any
}
export interface ISheets {
  inlineSheets: string
  className: string
}

export interface IEvent {
  eventType: string
  defaultValue?: string
  description: string
  ES5Value?: string
}

export interface IComponent {
  componentName: string
  package: string
  version: string
  type: string
  exportName: string
  showName: string
  icon: string
  componentId?: string
  schema: ISchema
  sheets?: ISheets
  events?: IEvent[]
  children: Array<IComponent>
}

export enum EPropSetting {
  INPUT = 'INPUT',
  SELECT = 'SELECT',
  LIST = 'LIST',
  CHECKBOX = 'CHECKBOX'
}

export const useComponents = defineStore('components', () => {
  const components = [
    {
      componentName: 'WtTable',
      package: 'element-plus/lib/WtTable',
      version: '1.0.0',
      exportName: 'WtTable',
      type: 'BASE',
      showName: '表格',
      icon: 'Grid',
      schema: {
        columns: {
          type: 'LIST',
          title: '数据列',
          value: [
            {
              prop: 'key',
              label: '数据列'
            }
          ]
        },
        action: {
          type: 'INPUT',
          value: '',
          title: '请求地址'
        },
        method: {
          type: 'SELECT',
          options: ['GET', 'POST'],
          value: 'GET',
          title: '请求类型'
        }
      },
      events: [
        { eventType: 'onClick', defaultValue: ``, description: '点击时触发', ES5Value: ''}
      ],
      sheets: {
        inlineSheets: '',
        className: ''
      }
    },
    {
      componentName: 'WtButton',
      package: 'element-plus/lib/WtButton',
      version: '1.0.0',
      exportName: 'WtButton',
      type: 'BASE',
      showName: '按钮',
      icon: 'Watch',
      events: [
        { eventType: 'onClick', defaultValue: ``, description: '点击时触发', ES5Value: ''}
      ],
      sheets: {
        inlineSheets: '',
        className: ''
      },
      schema: {
        size: {
          type: 'SELECT',
          options: ['large', 'default', 'small'],
          value: 'default',
          title: '尺寸'
        },
        type: {
          type: 'SELECT',
          options: ['primary', 'success', 'warning', 'danger', 'info'],
          value: 'success',
          title: '类型'
        },
        plain: {
          type: 'CHECKBOX',
          value: false,
          title: '朴素按钮'
        },
        content: {
          type: 'INPUT',
          value: '按钮',
          title: '内容'
        }
      }
    },
    {
      componentName: 'WtContent',
      package: 'element-plus/lib/WtContent',
      version: '1.0.0',
      exportName: 'WtContent',
      type: 'LAYOUT',
      showName: '布局',
      icon: 'Memo',
      schema: {},
      sheets: {
        inlineSheets: '',
        className: ''
      }
    },
    {
      componentName: 'WtDialog',
      package: 'element-plus/lib/WtDialog',
      version: '1.0.0',
      exportName: 'WtDialog',
      type: 'LAYOUT',
      showName: '弹框',
      icon: 'Memo',
      schema: {
        confirmTxt: {
          type: 'INPUT',
          title: '确认文案',
          value: 'Confirm'
        },
        cancelTxt: {
          type: 'INPUT',
          title: '取消文案',
          value: 'Cancel'
        },
        title: {
          type: 'INPUT',
          title: '标题',
          value: 'Tips'
        },
        width: {
          type: 'INPUT',
          title: '宽度',
          value: '30%'
        },
      },
      sheets: {
        inlineSheets: '',
        className: ''
      },
      events: [
        { eventType: 'beforeClose', description: '关闭前触发'}
      ],
    }
  ]
  const reactiveComponents = reactive<Omit<IComponent, 'children'>[]>(components)
  return {
    components: reactiveComponents
  }
}, { persist: true })
