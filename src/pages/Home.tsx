import MainLayout from './layout/Layout'
import styles from './styles/home.module.css'
import logo from '../logo.svg';

const Home = () => {

    return (
        <MainLayout>
            <div className={styles.home}>
                <div className={styles.navbar}>
                    <div className={styles.title}>
                        <p>Book Library</p>
                    </div>
                    <div className={styles.navs}>
                        <p>Home</p>
                        <p>Login</p>
                        <p>Logout </p>
                    </div>
                    <div className={styles.profile}>
                        <div className={styles.pro_container}>
                            <img src={logo} alt="" />
                        </div>

                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.title}>
                        <p>Books</p>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <p className={styles.rtitle}>Apocalypto</p>
                            <p className={styles.author}>some Auther</p>
                            <p className={styles.description}>kanamakbdbc;dbfelhfblad fbefvandgfvb,fvf;fbdfjdfvlfgdfbhdfgv</p>
                        </div>
                        <div className={styles.row}>
                            <p className={styles.rtitle}>Apocalypto</p>
                            <p className={styles.author}>some Auther</p>
                            <p className={styles.description}>kanamakbdbc;dbfelhfblad fbefvandgfvb,fvf;fbdfjdfvlfgdfbhdfgv</p>
                        </div>
                        <div className={styles.row}>
                            <p className={styles.rtitle}>Apocalypto</p>
                            <p className={styles.author}>some Auther</p>
                            <p className={styles.description}>kanamakbdbc;dbfelhfblad fbefvandgfvb,fvf;fbdfjdfvlfgdfbhdfgv</p>
                        </div>
                        <div className={styles.row}>
                            <p className={styles.rtitle}>Apocalypto</p>
                            <p className={styles.author}>some Auther</p>
                            <p className={styles.description}>kanamakbdbc;dbfelhfblad fbefvandgfvb,fvf;fbdfjdfvlfgdfbhdfgv</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home