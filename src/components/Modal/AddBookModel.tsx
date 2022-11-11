import { useContext, useEffect, SetStateAction, useState } from 'react'
import { AddBookApi } from '../../api/add-book.api'
import { LoginAPi } from '../../api/login.api'
import { SignupAPi } from '../../api/signup.api'
import { UserContext } from '../../providers/UserProvider'
import { BookResponse, Signup, SignupInput, User, UserError } from '../../types'
import ConfirmationModal from './ConfirmationModal'
import styles from './styles/add-book.module.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: React.Dispatch<React.SetStateAction<BookResponse | undefined>>
}

const AddBookModal = ({
    isOpen = false,
    onClose,
    data,
}: ModalProps,) => {
    const [logUser, setLogUser] = useState<BookResponse>()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [success, setSuccess] = useState<BookResponse>();
    const [response, setResponse] = useState<BookResponse>()
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModelMessage] = useState('');
    const [modalTitle, setModelTitle] = useState('');

    const { login, user } = useContext(UserContext);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === 'title') {
            setTitle(event.target.value)
        }
        if (event.target.id === 'author') {
            setAuthor(event.target.value)
        }

        if (event.target.id === 'description') {
            setDescription(event.target.value)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            data(success)
        }, 1000);
        return () => clearTimeout(timer);
    }, [success]);

    console.log(success)

    useEffect(() => {
        logUser && login(logUser)
    }, [logUser])

    const handleAddBook = () => {
        const input = {
            title,
            author,
            description,
        }
       user && AddBookApi(input, user).then((response: BookResponse) => {
            console.log(response)
            if (response.status === "200") {
                setModelTitle('Success')
                setShowModal(true)
                setModelMessage('A book was added successfully')
                setSuccess(response)
                login(response)
            }

            if (Array.isArray(response.message)) {
                let errs: string[] = []
                let message = ''

                const errArr = response.message

                for (let i = 0; i <= errArr.length; i++) {

                    message += errArr[i] + ', '

                }

                const someResponse = {
                    message,
                    status: response.status
                }
                data(someResponse)
                setModelTitle('Error')
                setShowModal(true)
                setModelMessage(message)
            }
            if (typeof response.message === 'string') {
                setModelTitle('Error')
                setResponse(response)
                data(response)
                setShowModal(true)
                setModelMessage(response.message)
            }
        })
    }

    const handleModalClose = () => {
        setShowModal(false);
        setModelMessage('');
    };

    return (
        <div
            className={`${styles.modal} ${isOpen ? styles.modelOpen : styles.modalClose
                }`}
        >
            <div className={styles.modalContent}>
                <ConfirmationModal
                    title={modalTitle}
                    isOpen={showModal}
                    onClose={handleModalClose}
                    message={modalMessage}
                ></ConfirmationModal>
                <div className={styles.signup}>
                    <div className={styles.container}>
                        <div className={styles.title}>
                            <p>Book Information</p>
                        </div>
                        <div className={styles.main}>
                            <input
                                id='title'
                                type="text"
                                onChange={(e) => handleChange(e)}
                                placeholder='Title'
                            />
                             <input
                                id='author'
                                type="text"
                                onChange={(e) => handleChange(e)}
                                placeholder='Author'
                            />
                            <input
                                id='description'
                                type="text"
                                onChange={(e) => handleChange(e)}
                                placeholder='Description'
                            />


                            <button
                                onClick={() => handleAddBook()}
                            >
                                Sbmit
                            </button>
                        </div>
                        <div className={styles.footer}>
                            <button
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBookModal
