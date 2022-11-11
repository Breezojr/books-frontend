import MainLayout from './layout/Layout'
import styles from './styles/home.module.css'
import logo from '../logo.svg';
import { useContext, useEffect, useState } from 'react';
import { Book, BookResponse, User } from '../types';
import { getAllBooks } from '../api/get-all-books.api';
import { UserContext } from '../providers/UserProvider';
import LoginModal from '../components/Modal/LoginModal';
import SignupModal from '../components/Modal/SignupModal';
import AddBookModal from '../components/Modal/AddBookModel';
import EditBookModal from '../components/Modal/EditBookModal';
import { DeleteApi } from '../api/delete-book.api';
import { ConfirmationModal } from '../components/Modal';
import { StatusApi } from '../api/change-book-status.api';

const Home = () => {
    const [books, setAllBooks] = useState<Book[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showSModal, setSShowModal] = useState(false);
    const [showAModal, setAShowModal] = useState(false);
    const [showEModal, setEShowModal] = useState(false);
    const [addBtn, setAddBtn] = useState(true);

    const [book, setBook] = useState<Book>();
    const [response, setResponse] = useState<User>()
    const [Aresponse, setAResponse] = useState<BookResponse>()
    const [Eresponse, setEResponse] = useState<BookResponse>()
    const [modalTitle, setModalTitle] = useState('')
    const [confrimShow, setConfrimShow] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const { user, logout } = useContext(UserContext);

    useEffect(() => {
        getAllBooks(setAllBooks);
    }, []);

    useEffect(() => {
        if (user) {
            getAllBooks(setAllBooks);
        }
        else {
            const defaultBooks = books.filter(book => book.isPublic)
            setAllBooks(defaultBooks);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            setAddBtn(false)
        }
    }, [user]);


    useEffect(() => {
        if (response && response.status === "200") {
            setShowModal(false);
            setSShowModal(false);
            setErrorMessage('');
        }
    }, [response]);

    useEffect(() => {
        if (Aresponse && Aresponse.status === "200") {
            getAllBooks(setAllBooks);
            setAShowModal(false);
            setErrorMessage('');
        }
    }, [Aresponse]);

    useEffect(() => {
        if (Eresponse && Eresponse.status === "200") {
            getAllBooks(setAllBooks);
            setEShowModal(false);
            setErrorMessage('');
        }
    }, [Eresponse]);


    const handelClick = (
        destination:
            'login' |
            'signup' |
            'logout' |
            'add' |
            'edit' |
            'delete'
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
        if (destination === 'edit') {
            setEShowModal(!showEModal)
        }
    }

    const handelEdit = (data: Book) => {
        setBook(data)
        setEShowModal(!showEModal)
    }

    const handelDelete = (bookData: Book) => {
        user && DeleteApi(bookData._id, user).then(data => {
            console.log(data)
            console.log(data.status)
            if (data.status === '200') {
                setAllBooks(current =>
                    current.filter(book => {
                        // 👇️ remove object that has id equal to 2
                        return book._id !== bookData._id;
                    }),
                )
            }
            else {
                setModalTitle('Error')
                setConfirmMessage('Delete Unsuccess')
                setConfrimShow(true)
            }
        }
        )
    }

    const changeStatus = (book: Book) => {
        user && StatusApi(book._id, user).then(data => {
            if (data.status === '200') {
                getAllBooks(setAllBooks);
            }
            else {
                setModalTitle('Error')
                setConfirmMessage('Process Failed')
                setConfrimShow(true)
            }
        }
        )
    }

    const handleModalClose = () => {
        setShowModal(!showModal);
        setErrorMessage('');
    };

    const handleSModalClose = () => {
        setSShowModal(!showSModal);
        setErrorMessage('');
    };

    const handleAModalClose = () => {
        setAShowModal(!showAModal);
        setErrorMessage('');
    };

    const handleEModalClose = () => {
        setEShowModal(!showEModal);
        setErrorMessage('');
    };

    const handleShowModalClose = () => {
        setConfrimShow(!confrimShow);
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
                <EditBookModal
                    book={book}
                    isOpen={showEModal}
                    onClose={handleEModalClose}
                    data={setEResponse}
                />

                <ConfirmationModal
                    title={modalTitle}
                    isOpen={confrimShow}
                    onClose={handleShowModalClose}
                    message={confirmMessage}
                ></ConfirmationModal>



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
                                disabled={addBtn}
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
                                    >
                                        <p className={styles.rtitle}>{book.title.length > 20 ?  book.title.slice(0, 20)  : book.title}</p>
                                        <p className={styles.author}>{book.author.length > 20 ?  book.author.slice(0, 20)  : book.author}</p>
                                        <p className={styles.description}>{book.description.length > 50 ?  book.description.slice(0, 50)  : book.description}</p>
                                    </div>

                                    {user?.id === book.user &&
                                     <div className={styles.btns}>
                                        <div
                                            onClick={() => changeStatus(book)}
                                            className={styles.someBTn}>
                                            {book.isPublic ? <div
                                                className={styles.fist}>
                                            </div>
                                                :
                                                <div className={styles.anotherFirst}>
                                                </div>
                                            }
                                            <div className={styles.last}>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handelEdit(book)}
                                        >Edit</button>
                                        <button
                                            onClick={() => handelDelete(book)}
                                        >Delete</button>
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