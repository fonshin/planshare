import React from 'react';
import styles from './index.less';
import mainImage from '@/assets/images/plan_share.png';

export default function PlanShareRenderer() {
  return (
    <div className={styles.main}>
      <img src={mainImage} alt="" />
    </div>
  );
}
