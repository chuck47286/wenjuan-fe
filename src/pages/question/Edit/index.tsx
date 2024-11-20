import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '../../../store/componentsReducer';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import EditHeader from './EditHeader';
import EditCanvas from './EditCanvas';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './index.module.scss';
// 动态路由 edit/:id 使用useParams获取id信息
const Edit: FC = () => {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();

  function clearSelectedId() {
    dispatch(changeSelectedId(''));
  }

  return (
    <div className={styles.container}>
      {/* <div style={{ backgroundColor: '#fff', height: '40px' }}>
        <EditHeader />
      </div> */}
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
