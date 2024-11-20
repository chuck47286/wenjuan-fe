/**
 * @description 问卷 radio
 * @author yucheng
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionRadioDefaultProps } from './interface'

export * from './interface'

const ComponentRadio = {
  title: '单选',
  type: 'questionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
}
export default ComponentRadio
