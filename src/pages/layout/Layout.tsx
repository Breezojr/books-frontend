import styles from './layout.module.css'
const MainLayout = ({ children }: { children: JSX.Element }) => {
    return (
      <main className={styles.main}>
        <aside className={styles.child}>{children}</aside>
      </main>
    );
  };
  export default MainLayout;
  
