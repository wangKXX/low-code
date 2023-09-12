declare module 'uuid';

declare module '@babel/standalone';

declare var window: any;

declare module 'codemirror-editor-vue3' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}