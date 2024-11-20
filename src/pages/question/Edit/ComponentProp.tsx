import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changeComponentProps } from '../../../store/componentsReducer'
import {
  getComponentConfByType,
  ComponentPropsType,
} from '../../../components/QuestionComponents'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />

  const { type, props, isLocked } = selectedComponent
  // console.log('props', props);
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />

  const { PropComponent } = componentConf
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked} />
}

export default ComponentProp
