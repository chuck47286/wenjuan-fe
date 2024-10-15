import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
// 动态路由 edit/:id 使用useParams获取id信息
const Edit: FC = () => {
  const { id = '' } = useParams();

  return <p>Edit {id}</p>;
};

export default Edit;
