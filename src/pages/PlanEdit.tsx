import CommentList from '@/components/CommentList';
import PlanRenderer from '@/components/PlanRenderer';
import { PlanComment } from '@/models/comment';
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Divider, Input, Modal, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './PlanEdit.less';

const DefaultCommentList: PlanComment[] = [
  {
    text: '王工，这里有个小问题，麻烦看下',
    time: '2020/01/01 11:11',
    replies: [],
    resolved: false,
    nickname: '甲方A',
    planName: '深圳湾0号',
    isRead: false,
    uuid: '1',
    positionTop: 500,
    positionLeft: 500,
  },
  {
    text: '这个问题也要解决下',
    time: '2020/01/01 11:11',
    replies: [
      {
        text: '好的收到',
        time: '2020/01/01 11:11',
        nickname: '王工',
        uuid: '4',
      },
    ],
    resolved: true,
    nickname: '甲方CCC',
    planName: '深圳湾0号',
    isRead: true,
    uuid: '2',
    positionTop: 300,
    positionLeft: 300,
  },
  {
    text: '王工，这里也有个小问题，麻烦看下，具体的情况请看标记位置，是这样的...',
    time: '2020/01/01 11:11',
    replies: [],
    resolved: false,
    nickname: '甲方A',
    planName: '深圳湾0号',
    isRead: true,
    uuid: '3',
    positionTop: 700,
    positionLeft: 300,
  },
];

export default function Page() {
  const [commentList, setCommentList] =
    useState<PlanComment[]>(DefaultCommentList);
  const [commentListVisible, setCommentListVisible] = useState(false);
  const [addCommentVisible, setAddCommentVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const href = window.location.href;
    if (href.includes('commentid')) {
      setCommentListVisible(true);
      setActiveComment(DefaultCommentList[1]);
    }
  }, []);

  const createCommentHandler = useCallback(() => {
    if (!commentListVisible) {
      return;
    }
    setAddCommentVisible(true);
  }, [commentListVisible]);

  const addComment = useCallback(() => {
    setAddCommentVisible(false);
    const newComment: PlanComment = {
      text: commentText,
      time: '2020/01/01 11:11',
      replies: [],
      resolved: false,
      nickname: 'fon',
      planName: '深圳湾0号',
      isRead: true,
      uuid: '22',
      positionLeft: 600,
      positionTop: 300,
    };
    setCommentList([newComment, ...commentList]);
    setCommentText('');
  }, [commentText, commentList]);

  const [activeComment, setActiveComment] = useState<PlanComment>();

  const [showResolved, setShowResolved] = useState(false);
  const replyComment = useCallback(() => {
    setAddCommentVisible(false);
    const newList = [...commentList];
    const current = newList.find((item) => item.uuid === activeComment?.uuid);
    const newReply = {
      text: replyText,
      time: '2020/01/01 11:11',
      nickname: 'fon',
      uuid: '14',
    };
    current?.replies.unshift(newReply);
    setCommentList(newList);
    setReplyText('');
  }, [replyText, commentList, activeComment]);

  return (
    <>
      <div className={styles.page}>
        <div
          className={classNames(styles.rendererContainer, {
            [styles.adding]: commentListVisible,
          })}
          onClick={createCommentHandler}
        >
          <PlanRenderer />
          {commentListVisible && (
            <>
              {commentList.map((item) => (
                <div
                  className={classNames(styles.commentTag, {
                    [styles.active]: activeComment?.uuid === item.uuid,
                    [styles.hidden]: item.resolved && !showResolved,
                  })}
                  style={{
                    left: (item?.positionLeft || 0) + 'px',
                    top: (item?.positionTop || 0) + 'px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveComment(item);
                  }}
                >
                  {item.uuid}
                </div>
              ))}
            </>
          )}
        </div>
        <Button
          className={classNames(styles.rightButtons, {
            [styles.visible]: commentListVisible,
          })}
          onClick={() => setCommentListVisible(!commentListVisible)}
        >
          <MessageOutlined />
        </Button>
        <div
          className={classNames(styles.commentListContainer, {
            [styles.visible]: commentListVisible,
          })}
        >
          <CommentList
            showResolved={showResolved}
            setShowResolved={setShowResolved}
            commentList={commentList}
            activeComment={activeComment}
          />
        </div>
      </div>
      <Modal
        visible={addCommentVisible}
        okText="发送"
        cancelText="取消"
        onOk={addComment}
        closable={false}
        onCancel={() => setAddCommentVisible(false)}
      >
        <Input.TextArea
          maxLength={200}
          showCount
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onPressEnter={addComment}
          autoFocus
        ></Input.TextArea>
      </Modal>

      <Modal
        visible={!!activeComment}
        okText="回复"
        cancelText="取消"
        onOk={replyComment}
        onCancel={() => setActiveComment(undefined)}
        closable={false}
        mask={false}
        maskClosable={true}
      >
        <div className={styles.activeComment}>
          {activeComment && (
            <div className={styles.icon}>
              <div className={styles.rightButtons}>
                {activeComment.resolved ? (
                  <CheckCircleOutlined
                    className={classNames(styles.active, styles.actionBtn)}
                  />
                ) : (
                  <InfoCircleOutlined className={styles.actionBtn} />
                )}
              </div>
              <div className={styles.content}>
                <span className={styles.owner}>
                  {activeComment.nickname}
                  <div className={styles.tip}>{activeComment.time}</div>
                </span>
                <div className={styles.text}>{activeComment.text}</div>
                <Divider />
                <div className={styles.replies}>
                  {activeComment.replies.map((reply) => (
                    <div className={styles.activeComment}>
                      <div className={styles.text}>
                        {reply.text}
                        <div className={styles.tip}>
                          <UserOutlined />
                          <span className={styles.name}>{reply.nickname}</span>
                          {reply.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <Input.TextArea
            maxLength={200}
            showCount
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onPressEnter={replyComment}
          ></Input.TextArea>
        </div>
      </Modal>
    </>
  );
}
