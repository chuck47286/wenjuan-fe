import React, { FC } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
// 动态路由 edit/:id 使用useParams获取id信息
const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData();

  return (
    <div>
      <p>Edit page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default Edit;
