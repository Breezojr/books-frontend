import MainLayout from './layout/Layout'
import styles from './styles/home.module.css'
import logo from '../logo.svg';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Book, User } from '../types';
import { getAllBooks } from '../api/get-all-books.api';
import { UserContext } from '../providers/UserProvider';
import LoginModal from '../components/Modal/LoginModal';

const Home = () => {
    const [books, setAllBooks] = useState<Book[]>([]);
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [response, setResponse] = useState<User>()
    const [errorMessage, setErrorMessage] = useState('');

    const { user } = useContext(UserContext);

    console.log(response)

    useEffect(() => {
        getAllBooks(setAllBooks);
    }, []);

    useEffect(() => {
        if(response && response.status === "200"){
            setShowModal(!showModal);
            setErrorMessage('');
        }
    }, [response]);

    const handelClick = (
        destination:
            'login' |
            'signup'
    ) => {
        if (destination === 'login') {
            setShowModal(!showModal)
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



    const handleModalClose = () => {
        setShowModal(!showModal);
        setErrorMessage('');
      };
    return (
        <MainLayout>
            <>
            <LoginModal
                      isOpen={showModal}
                      onClose={handleModalClose}
                      data={setResponse}


            />
            
            
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
            </>
           
        </MainLayout>
    )
}

export default Home