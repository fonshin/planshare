import PlanRenderer from '@/components/PlanRenderer';
import React, { useState } from 'react';
import styles from './PlanEdit.less';

const DefaultCommentList = [{}];
export default function Page() {
  const [commentList, setCommentList] = useState();

  return (
    <div className={styles.page}>
      <PlanRenderer />
    </div>
  );
}
