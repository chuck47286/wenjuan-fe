import { ComponentsStateType, ComponentInfoType } from './index'

export function getNextSelectedInd(
  fe_id: string,
  componentList: ComponentInfoType[]
) {
  const visibleComponentList = componentList.filter((c) => !c.isHidden)
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id)
  if (index < 0) return ''

  // 重新计算SelectedId
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    // 组件长度就一个，就删除了，没有组件
    newSelectedId = ''
  } else {
    if (index + 1 === length) {
      // 组件长度 > 1
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 组件长度 既不是最后一个，也不是只有一个，就是正常习惯，依次取下一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}

export function insertNewComponent(
  draft: ComponentsStateType,
  newComponent: ComponentInfoType
) {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex((c) => c.fe_id === selectedId)

  if (index < 0) {
    // 没有选中任何组件
    draft.componentList.push(newComponent)
  } else {
    // 选中了组件，插入到 index后面
    draft.componentList.splice(index + 1, 0, newComponent)
  }

  draft.selectedId = newComponent.fe_id // 表框显示在画布新组件上
}
