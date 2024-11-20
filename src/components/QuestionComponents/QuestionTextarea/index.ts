/**
 * @description 问卷 多行输入
 * @author yucheng
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTextareaDefaultProps } from './interface'

export * from './interface'

const ComponentTextarea = {
  title: '多行输入',
  type: 'questionTextarea',
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionTextareaDefaultProps,
}
export default ComponentTextarea
