import React, { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// js实现方式，使用useNavigate hook实现 button
// Link组件方式实现跳转
// 携带参数跳转
const Home: FC = () => {
  const nav = useNavigate();

  function clickHandler() {
    // nav('/login?b=20');
    nav({
      pathname: '/login',
      search: 'b=21',
    });
  }

  return (
    <div>
      <p>Home</p>
      <div>
        <button onClick={clickHandler}>登录</button>
        <Link to="/register?a=10">注册</Link>
      </div>
    </div>
  );
};

export default Home;
