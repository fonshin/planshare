import { PlanComment } from '@/models/comment';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import styles from './index.less';

interface Props {
  messages: PlanComment[];
}

export default function MessageCenter({ messages }: Props) {
  const history = useHistory();
  const clickMessageHandler = useCallback(() => {
    history.push('/edit');
  }, [history]);
  return (
    <div className={styles.main}>
      {messages.map((item) => (
        <div
          className={classNames(styles.messageItem, {
            [styles.unread]: !item.isRead,
          })}
          onClick={clickMessageHandler}
        >
          <div className={styles.text}>
            您分享的方案《{item.planName}》有新的评论信息，点击查看
          </div>
          <div className={styles.time}>{item.time}</div>
        </div>
      ))}
    </div>
  );
}
