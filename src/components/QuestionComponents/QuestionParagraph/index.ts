/**
 * @description 问卷-段落
 * @author yucheng
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './interface'

export * from './interface'

// Paragraph 组件的配置
const ComponentParagraph = {
  title: '段落',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
export default ComponentParagraph
