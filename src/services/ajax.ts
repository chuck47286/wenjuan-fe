import axios from "axios";
import {message } from 'antd'

const instance = axios.create({
  timeout: 10 * 1000, // 10秒 超时时间
});

// response 拦截： 统一处理errno 和 msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const {errno, data, msg} = resData
  // 拦截 非0的 errno
  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg);
    }

    throw new Error(msg);
  }

  return data as any;
});

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}