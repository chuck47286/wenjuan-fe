import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';
import sytles from './MainLayout.module.scss';

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);

  return (
    <Layout>
      <Header className={sytles.header}>
        <div className={sytles.left}>
          <Logo />
        </div>
        <div className={sytles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={sytles.main}>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className={sytles.footer}>
        小慕问卷 &copy;2023 - present. Created by xxx
      </Footer>
    </Layout>
  );
};

export default MainLayout;
