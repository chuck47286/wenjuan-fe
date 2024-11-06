/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState} from 'react'
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import useGetUserInfo from './useGetUserInfo';
import { getUserInfoService } from '../services/user';
import {loginReducer} from '../store/userReducer'

function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)

  // ajax 加载用户信息
  const {run} = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const {username, nickname} = result
      // 存储到 redux store
      dispatch(loginReducer({username, nickname}))
    },
    onFinally() {
      setWaitingUserData(false);
    }
  }) 

  
  // 判断 当前redux store 是否已经存在用户信息
  const {username} = useGetUserInfo();
  useEffect(() => {
    if (username) {
      setWaitingUserData(false) // 如果 redux store已经存在用户信息，就不用重新加载了
      return;
    }
    run() // 如果redux store中没有用户信息，则进行加载
  }, [username])

  return {waitingUserData};
}

export default useLoadUserData