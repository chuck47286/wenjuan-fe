import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { MANAGE_INDEX_PATHNAME } from '../router';
import styles from './Home.module.scss';

import axios from 'axios';
// 上线前，需要将mockjs模拟器注释掉，不可以上线
// import '../_mock/index';

const { Title, Paragraph } = Typography;

// js实现方式，使用useNavigate hook实现 button
// Link组件方式实现跳转
// 携带参数跳转
const Home: FC = () => {
  const nav = useNavigate();

  // useEffect(() => {
  //   // fetch('/api/test')
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     console.log('fetch data', data);
  //   //   });
  //   // mock.js 不能拦截fetch请求方式，只能拦截XMLHttpRequest 现在需要使用axios取代

  //   // axios内部使用了XMLHttpRequest
  //   axios.get('/api/test').then((res) => console.log('axios res', res.data));
  // }, []);

  useEffect(() => {
    // http://localhost:3001/api/test
    // 3000 fe
    // 跨域 mock create-react-app webpack devServer代理
    fetch('/api/test')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('fetch data', data);
      })
      .catch((err) => {
        console.error('error:', err.message);
      });

    // axios.get('/api/test').then((res) => console.log('axios res', res.data));
  }, []);

  // function clickHandler() {
  //   // nav('/login?b=20');
  //   nav({
  //     pathname: '/login',
  //     search: 'b=21',
  //   });
  // }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
        </Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
