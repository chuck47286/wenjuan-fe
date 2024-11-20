/**
 * @description 问卷 标题
 * @author yucheng
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'

export * from './interface'

// Info 组件的配置
const ComponentInfo = {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
}
export default ComponentInfo
