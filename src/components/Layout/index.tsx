import React, { ReactNode } from 'react';
import Header from '../Header';
import styles from './Layout.module.scss';
import Footer from '../Footer';
import Notification from '../common/Notification';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Notification/>
      <Footer />
    </div>
  );
};

export default Layout;