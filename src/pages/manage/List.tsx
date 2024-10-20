import React, { FC, useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
import { Typography, Spin } from 'antd';
import { useTitle } from 'ahooks';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import styles from './common.module.scss';

const { Title } = Typography;

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷');
  // const [searchParams] = useSearchParams();
  // console.log('keyword', searchParams.get('keyword')); // 获取URL中的参数

  const { data = {}, loading } = useLoadQuestionListData();
  const { list = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>loadMore... 上划加载更多...</div>
    </>
  );
};

export default List;
