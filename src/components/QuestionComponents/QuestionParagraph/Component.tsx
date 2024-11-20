import React, { FC } from 'react'
import { Typography } from 'antd'
import {
  QuestionParagraphPropsType,
  QuestionParagraphDefaultProps,
} from './interface'

const { Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const { text = '', isCenter = false } = {
    ...QuestionParagraphDefaultProps,
    ...props,
  }
  // 尽量不要使用dangerouslySetInnerHTML,不安全

  const textList = text.split('\n')

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start' }}>
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  )
}

export default Component
