import type { IComponent } from '@/stores'
export enum EPositon {
  BOTTOM = 'BOTTOM',
  TOP = 'TOP'
}
export interface IChangeComponent {
  componentId?: string
  position: EPositon
  clear: () => void,
  parentMateData: IComponent[]
  globalPageData: IComponent
}