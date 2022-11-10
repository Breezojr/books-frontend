import MainLayout from './layout/Layout'
import styles from './styles/home.module.css'
import logo from '../logo.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Book } from '../types';
import { getAllBooks } from '../api/getAllBooks';

const Home = () => {
    const [books, setAllBooks] = useState<Book[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        getAllBooks(setAllBooks);
    }, []);

    console.log(books)


    const handelClick = (destination: 'login') => {
        if (destination === 'login') {
            navigate("/login")
        }
    }

    return (
        <MainLayout>
            <div className={styles.home}>
                <div className={styles.navbar}>
                    <div className={styles.title}>
                        <p>Book Library</p>
                    </div>
                    <div className={styles.navs}>
                        <p>Home</p>
                        <p
                            onClick={() => handelClick('login')}
                        >
                            Login
                        </p>
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

                    <div className={`${styles.row} ${styles.top}`}>
                            <p className={styles.rtitle}>Title</p>
                            <p className={styles.author}>Author</p>
                            <p className={styles.description}>Description</p>
                        </div>

                        {books.map(book =>
                            <div className={styles.row}>
                                <p className={styles.rtitle}>{book.title}</p>
                                <p className={styles.author}>{book.author}</p>
                                <p className={styles.description}>{book.description}</p>
                            </div>
                        )
                        }

                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home