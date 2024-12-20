import React, { FC, useState } from 'react';
import { useTitle, useRequest } from 'ahooks';
import {
  Typography,
  Empty,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Spin,
  message,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListSearch from '../../components/ListSearch';
import ListPage from '../../components/ListPage';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import {
  updateQuestionService,
  deleteQuestionService,
} from '../../services/question';
import styles from './common.module.scss';

const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = () => {
  useTitle('小慕问卷 - 回收站');

  const {
    data = {},
    loading,
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;
  // 记录选中的Id
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: true });
      }
    },
    {
      manual: true,
      debounceMaxWait: 500,
      onSuccess() {
        message.success('恢复成功');
        refresh(); // 手动刷新列表
        setSelectedIds([]);
      },
    }
  );

  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功');
        refresh();
        setSelectedIds([]);
      },
    }
  );

  function del() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: deleteQuestion,
    });
  }

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      // key: 'title', // 循环列的key, ta 会默认取dataIndex的值
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    // {
    //   title: '星标',
    //   dataIndex: 'isStar',
    // },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ];

  // 将JSX片段定义为一个变量
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            onClick={recover}
          >
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q: any) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Trash;
