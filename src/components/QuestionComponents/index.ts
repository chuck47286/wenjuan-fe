import type { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, {
  QuestionParagraphPropsType,
} from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, {
  QuestionTextareaPropsType,
} from './QuestionTextarea'
import QuestionRaioConf, { QuestionRadioPropsType } from './QuestionRadio'
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,
} from './QuestionCheckbox'

// 各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType

// 统一组件的配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRaioConf,
  QuestionCheckboxConf,
]

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf, QuestionParagraphConf, QuestionInfoConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRaioConf, QuestionCheckboxConf],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type)
}
