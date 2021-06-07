import React, { useCallback, useMemo, useState } from 'react';
import styles from './index.less';
import { PlanComment } from '@/models/comment';
import classNames from 'classnames';
import { Switch } from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

interface Props {
  commentList: PlanComment[];
  activeComment?: PlanComment;
  showResolved: boolean;
  setShowResolved: (value: boolean) => void;
}
export default function CommentList({
  commentList = [],
  activeComment,
  showResolved,
  setShowResolved,
}: Props) {
  const localCommentList = useMemo(() => {
    if (showResolved) {
      return commentList;
    }
    return commentList.filter((item) => !item.resolved);
  }, [showResolved, commentList]);
  const clickMessageHandler = useCallback(() => {}, [history]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h3 className={styles.title}>评论列表</h3>
        <Switch
          checked={showResolved}
          onChange={() => setShowResolved(!showResolved)}
          checkedChildren="显示已解决"
          unCheckedChildren="隐藏已解决"
        />
      </div>
      {localCommentList.map((item) => (
        <div
          className={classNames(styles.messageItem, {
            [styles.unread]: !item.isRead,
            [styles.active]: item.uuid === activeComment?.uuid,
          })}
          onClick={clickMessageHandler}
        >
          <div className={styles.content}>
            <div className={styles.icon}>
              {item.resolved ? (
                <CheckCircleOutlined className={styles.active} />
              ) : (
                <InfoCircleOutlined />
              )}
            </div>
            <div className={styles.text}>
              {item.text}
              <div className={styles.tip}>
                <span className={styles.name}>{item.nickname}</span>
                {item.time}
              </div>
              <div className={styles.tip}>{item.replies.length}回复</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
