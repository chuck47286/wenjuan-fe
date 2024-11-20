/**
 * @description 问卷 标题
 * @author yucheng
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// Title 组件的配置
const ComponentTitle = {
  title: '标题',
  type: 'questionTitle',
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
}
export default ComponentTitle