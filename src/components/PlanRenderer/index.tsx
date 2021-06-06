import React from 'react';
import styles from './index.less';
import mainImage from '@/assets/images/plan_edit.png';

export default function PlanRenderer() {
  return (
    <div className={styles.main}>
      <img src={mainImage} alt="" />
    </div>
  );
}
