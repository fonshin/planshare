import React from 'react';
import { Link } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        </div>
      <div>
        <Link to="/planedit">planedit</Link>
      </div>
      <div>
        <Link to="/planshare">planshare</Link>
      </div>
    </div>
  );
}
