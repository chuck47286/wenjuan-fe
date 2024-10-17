import React, { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { MANAGE_INDEX_PATHNAME } from '../router';
import styles from './Home.module.scss';

const { Title, Paragraph } = Typography;

// js实现方式，使用useNavigate hook实现 button
// Link组件方式实现跳转
// 携带参数跳转
const Home: FC = () => {
  const nav = useNavigate();

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
