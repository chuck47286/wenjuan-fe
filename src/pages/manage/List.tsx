import React, { FC, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import { useTitle } from 'ahooks';
import QuestionCard from '../../components/QuestionCard';
import styles from './List.module.scss';

const rawQuestionList = [
  {
    _id: 'q1', // mongdb 数据库要求的ID格式
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '3月10日 13:23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 3,
    createdAt: '3月11日 13:23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 6,
    createdAt: '3月12日 13:23',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 2,
    createdAt: '3月9日 13:23',
  },
];

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷');
  // const [searchParams] = useSearchParams();
  // console.log('keyword', searchParams.get('keyword')); // 获取URL中的参数

  const [questionList, setQuestionList] = useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}> (搜索) </div>
      </div>
      <div className={styles.content}>
        {questionList.map((q) => {
          const { _id } = q;
          return <QuestionCard key={_id} {...q} />;
        })}
      </div>
      <div className={styles.footer}>list page footer</div>
    </>
  );
};

export default List;