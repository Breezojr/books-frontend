import MainLayout from './layout/Layout'
import styles from './styles/home.module.css'
const Home = () => {

    return (
        <MainLayout>
            <div className={styles.home}>
                <div className={styles.navibar}>
                    <div className={styles.title}>
                        <p>Book Library</p>
                    </div>
                    <div className={styles.container}>
                        <p>Home</p>
                        <p>Login</p>
                        <p>Logout </p>
                    </div>
                    <div className={styles.profile}>

                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home