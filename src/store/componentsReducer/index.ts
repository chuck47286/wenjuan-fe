import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import { nanoid } from 'nanoid'
import { cloneDeep } from 'lodash'
import { getNextSelectedInd, insertNewComponent } from './utils'
import { ComponentPropsType } from '../../components/QuestionComponents'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) => {
      return action.payload
    },
    // 修改selectedId
    changeSelectedId: (
      draft: ComponentsStateType,
      action: PayloadAction<string>
    ) => {
      draft.selectedId = action.payload
      // react state 不可变数据 写法
    },
    // 添加新组件
    addComponent: (
      draft: ComponentsStateType,
      action: PayloadAction<ComponentInfoType>
    ) => {
      const newComponent = action.payload
      insertNewComponent(draft, newComponent)
    },
    // 修改组件属性
    changeComponentProps: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload

      // 当前要修改属性的组件
      const curComp = draft.componentList.find((c) => c.fe_id === fe_id)
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps,
        }
      }
    },
    // 删除选中的组件
    removeSelectedComponent: (draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removedId } = draft

      // 优化，指定draft中的鼠标小标(重新计算selectedId)
      const newSelectedId = getNextSelectedInd(removedId, componentList)
      draft.selectedId = newSelectedId

      const index = componentList.findIndex((c) => c.fe_id === removedId)
      componentList.splice(index, 1)
    },
    // 隐藏/显示 组件
    changeComponentHidden: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList = [] } = draft
      const { fe_id, isHidden } = action.payload

      // 优化，指定draft中的鼠标小标(重新计算selectedId)
      let newSelectedId = ''
      if (isHidden) {
        // 要隐藏
        newSelectedId = getNextSelectedInd(fe_id, componentList)
      } else {
        // 要显示
        newSelectedId = fe_id
      }
      draft.selectedId = newSelectedId

      const curComp = componentList.find((c) => c.fe_id === fe_id)
      if (curComp) {
        curComp.isHidden = isHidden
      }
    },
    // 锁定 组件
    toggleComponentLocked: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { componentList = [] } = draft
      const { fe_id } = action.payload

      const curComp = componentList.find((c) => c.fe_id === fe_id)
      if (curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    },
    // 复制组件（拷贝当前选中的组件）
    copySelectedComponent: (draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft
      const curComp = componentList.find((c) => c.fe_id === selectedId)

      if (curComp == null) return
      draft.copiedComponent = cloneDeep(curComp) // 深拷贝
    },
    // 粘贴组件（粘贴已选中的组件）
    pasteCopiedComponent: (draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return

      // 要将fe_id修改，重要!!
      copiedComponent.fe_id = nanoid()

      // 插入这个深拷贝的组件
      insertNewComponent(draft, copiedComponent)
    },
    // 选中上一个
    selectPrevComponent: (draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId
      )

      if (selectedIndex < 0) return // 未选中
      if (selectedIndex <= 0) return // 已选中第一个

      draft.selectedId = componentList[selectedIndex - 1].fe_id
    },
    // 选中下一个
    selectNextComponent: (draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId
      )

      if (selectedIndex < 0) return // 未选中组件
      if (selectedIndex + 1 === componentList.length) return // 已选中最后一个

      draft.selectedId = componentList[selectedIndex + 1].fe_id
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
