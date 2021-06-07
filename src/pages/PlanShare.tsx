import CommentList from '@/components/CommentList';
import PlanShareRenderer from '@/components/PlanShareRenderer';
import { PlanComment } from '@/models/comment';
import {
  CheckCircleOutlined,
  EditOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  MoreOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Dropdown,
  Input,
  Menu,
  message,
  Modal,
  Tooltip,
} from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './PlanShare.less';

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
  const [commentListVisible, setCommentListVisible] = useState(true);
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

  const history = useHistory();
  const goEdit = useCallback(() => {
    history.push('/edit');
  }, [history]);
  const clickCopyHandler = useCallback(() => {
    message.success('链接已复制到粘贴板');
  }, []);

  const clickDeleteHandler = useCallback(() => {
    Modal.confirm({
      title: '删除评论',
      content: '确认删除该评论及所有回复吗？',
      okText: '确认',
      cancelText: '取消',
      closable: true,
    });
  }, []);
  const clickUnResolved = useCallback(() => {
    const newList = [...commentList];
    const current = newList.find((item) => item.uuid === activeComment?.uuid);
    if (current) {
      current.resolved = false;
    }
    setCommentList(newList);
  }, [activeComment]);
  const clickResolved = useCallback(() => {
    const newList = [...commentList];
    const current = newList.find((item) => item.uuid === activeComment?.uuid);
    if (current) {
      current.resolved = true;
    }
    setCommentList(newList);
    setActiveComment(undefined);
  }, [activeComment]);

  return (
    <>
      <div className={styles.page}>
        <div
          className={classNames(styles.rendererContainer, {
            [styles.adding]: commentListVisible,
          })}
          onClick={createCommentHandler}
        >
          <PlanShareRenderer />
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
        <div
          className={classNames(styles.rightButtons, {
            [styles.visible]: commentListVisible,
          })}
        >
          <Tooltip title="编辑方案">
            <Button className={classNames(styles.messageBtn)} onClick={goEdit}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="评论">
            <Button
              className={classNames(styles.messageBtn)}
              onClick={() => setCommentListVisible(!commentListVisible)}
            >
              <MessageOutlined />
            </Button>
          </Tooltip>
        </div>
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
                  <Tooltip title="取消已解决">
                    <CheckCircleOutlined
                      onClick={clickUnResolved}
                      className={classNames(styles.active, styles.actionBtn)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="标记为已解决">
                    <InfoCircleOutlined
                      className={styles.actionBtn}
                      onClick={clickResolved}
                    />
                  </Tooltip>
                )}
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={clickCopyHandler}>
                        <Button type="link">复制评论链接</Button>
                      </Menu.Item>
                      <Menu.Item>
                        <Button type="link" onClick={clickDeleteHandler}>
                          删除评论
                        </Button>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomRight"
                >
                  <MoreOutlined className={styles.moreBtn} />
                </Dropdown>
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
