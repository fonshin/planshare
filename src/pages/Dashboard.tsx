import React from 'react';
import styles from './Dashboard.less';

import mainImage from '@/assets/images/dashboard.png';
import { Button } from 'antd';
import { useState } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import MessageCenter from '@/components/MessageCenter';
import { PlanComment } from '@/models/comment';

const MessageList: PlanComment[] = [
  {
    text: '王工，这里有个小问题，麻烦看下',
    time: '2020/01/01 11:11',
    replies: [],
    resolved: false,
    nickname: '甲方A',
    planName: '深圳湾0号',
    isRead: false,
  },
  {
    text: '更新日志呀更新日志呀更新日志呀',
    time: '2020/01/01 11:11',
    replies: [],
    resolved: false,
    nickname: '系统',
    planName: '深圳湾0号',
    isRead: true,
  },
];

export default function Page() {
  const [messageCenterVisible, setMessageCenterVisible] = useState(false);
  return (
    <div className={styles.page}>
      <img src={mainImage} className={styles.bgImage} />
      <Button
        className={styles.messageBtn}
        onClick={() => setMessageCenterVisible(!messageCenterVisible)}
      >
        <MessageOutlined />
        <span className={styles.number}>1</span>
      </Button>
      {messageCenterVisible && (
        <div className={styles.messageCenterContainer}>
          <MessageCenter messages={MessageList} />
        </div>
      )}
    </div>
  );
}
