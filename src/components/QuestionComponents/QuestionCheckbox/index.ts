/**
 * @description 问卷 checkbox
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionCheckboxDefaultProps } from './interface'

export * from './interface'

const QuestionCheckbox = {
  title: '多选',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
}
export default QuestionCheckbox
