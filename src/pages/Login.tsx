import React, { FC, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Typography,
  Space,
  Form,
  Input,
  Button,
  Checkbox,
  message,
} from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { loginService } from '../services/user';
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router';
import { setToken } from '../utils/user-token';
import styles from './Login.module.scss';

const { Title } = Typography;

const USERNAME_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

const Login: FC = () => {
  const nav = useNavigate();

  const [form] = Form.useForm(); // 第三方hook
  useEffect(() => {
    const { username, password } = getUserFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result;
        // 存储token
        setToken(token);
        message.success('登录成功');
        nav(MANAGE_INDEX_PATHNAME); // 跳转到'我的问卷'
      },
    }
  );

  const onFinish = (value: any) => {
    console.log(value);
    const { username, password, remember } = value || {};

    run(username, password); // 执行登录

    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: '字符长度在5~20之间',
              },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Link to={REGISTER_PATHNAME}>注册新用户</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
