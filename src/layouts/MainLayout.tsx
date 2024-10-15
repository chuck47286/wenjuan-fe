import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = () => {
  return (
    <>
      <div>
        <div>MainLayout header</div>
        <div>
          <Outlet />
        </div>
        <div>MainLayout footer</div>
      </div>
    </>
  );
};

export default MainLayout;
