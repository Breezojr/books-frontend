import MainLayout from './layout/Layout'
import styles from './styles/home.module.css'
import logo from '../logo.svg';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Book } from '../types';
import { getAllBooks } from '../api/get-all-books.api';
import { UserContext } from '../providers/UserProvider';

const Home = () => {
    const [books, setAllBooks] = useState<Book[]>([]);
    const navigate = useNavigate()
    const { user } = useContext(UserContext);


    useEffect(() => {
        getAllBooks(setAllBooks);
    }, []);

    console.log(user)


    const handelClick = (
        destination:
            'login' |
            'signup'
    ) => {
        if (destination === 'login') {
            navigate("/login")
        }
        if (destination === 'signup') {
            navigate("/signup")
        }
    }

    const bookClick = (data: Book) => {
        navigate("/view", {
            state: data
        })

    }
    return (
        <MainLayout>
            <div className={styles.home}>
                <div className={styles.navbar}>
                    <div className={styles.title}>
                        <p>Book Library</p>
                    </div>
                    <div
                        className={styles.navs}
                    >
                        <p>Home</p>
                        <p
                            onClick={() => handelClick('signup')}
                        >
                            Signup
                        </p>
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

                        {books.map((book, i) =>
                            <div
                                className={styles.row}
                                key={i}
                            >
                                <div
                                    className={styles.left}
                                    onClick={() => bookClick(book)}
                                >
                                    <p className={styles.rtitle}>{book.title}</p>
                                    <p className={styles.author}>{book.author}</p>
                                    <p className={styles.description}>{book.description}</p>
                                </div>

                                {user?.id === book.user && <div className={styles.btns}>
                                    <div className={styles.someBTn}>
                                        <div className={styles.fist}>
                                        </div>
                                        <div className={styles.last}>
                                        </div>
                                    </div>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>

                                }
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