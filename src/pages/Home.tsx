import MainLayout from './layout/Layout'
import styles from './styles/home.module.css'
import logo from '../logo.svg';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Book, BookResponse, User } from '../types';
import { getAllBooks } from '../api/get-all-books.api';
import { UserContext } from '../providers/UserProvider';
import LoginModal from '../components/Modal/LoginModal';
import SignupModal from '../components/Modal/SignupModal';
import AddBookModal from '../components/Modal/AddBookModel';

const Home = () => {
    const [books, setAllBooks] = useState<Book[]>([]);
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [showSModal, setSShowModal] = useState(false);
    const [showAModal, setAShowModal] = useState(false);
    const [response, setResponse] = useState<User>()
    const [Aresponse, setAResponse] = useState<BookResponse>()
    const [errorMessage, setErrorMessage] = useState('');

    const { user, logout } = useContext(UserContext);

    console.log(response)
    console.log(Aresponse)

    useEffect(() => {
        getAllBooks(setAllBooks);
    }, []);

    useEffect(() => {
        if (response && response.status === "200") {
            setShowModal(false);
            setSShowModal(false);
            setErrorMessage('');
        }
    }, [response]);

    useEffect(() => {
        if (Aresponse && Aresponse.status === "200") {
            setAShowModal(false);
            setErrorMessage('');
        }
    }, [Aresponse]);




    const handelClick = (
        destination:
            'login' |
            'signup' |
            'logout' |
            'add'
    ) => {
        if (destination === 'login') {
            setShowModal(!showModal)
        }
        if (destination === 'signup') {
            setSShowModal(!showSModal)
        }
        if (destination === 'logout') {
            logout()        
        }
        if (destination === 'add') {
            setAShowModal(!showAModal)        
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

    const handleSModalClose = () => {
        setShowModal(!showSModal);
        setErrorMessage('');
    };

    const handleAModalClose = () => {
        setShowModal(!showAModal);
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
                <SignupModal
                    isOpen={showSModal}
                    onClose={handleSModalClose}
                    data={setResponse}
                />
                    <AddBookModal
                    isOpen={showAModal}
                    onClose={handleAModalClose}
                    data={setAResponse}
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
                            {!user && <p
                                onClick={() => handelClick('signup')}
                            >
                                Signup
                            </p>}
                            {!user && <p
                                    onClick={() => handelClick('login')}
                                >
                                    Login
                                </p>
                            }
                            <p
                                 onClick={() => handelClick('logout')}
                            >Logout </p>
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
                            <button 
                            className={styles.bookBtn}
                            onClick={() => handelClick('add')}
                            >Add New Book</button>
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