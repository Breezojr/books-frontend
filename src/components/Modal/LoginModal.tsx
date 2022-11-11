import { useContext, useEffect, SetStateAction, useState } from 'react'
import { LoginAPi } from '../../api/login.api'
import { UserContext } from '../../providers/UserProvider'
import { User, UserError } from '../../types'
import ConfirmationModal from './ConfirmationModal'
import styles from './styles/login.module.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    onSubmit?: () => void;
    onCloseText?: string;
    onSuccessText?: string;
    data: React.Dispatch<React.SetStateAction<User | undefined>>
}

const LoginModal = ({
    isOpen = false,
    onClose,
    title = 'Error!',
    message = 'Something Happened',
    onSubmit,
    data,
    onSuccessText,
}: ModalProps,) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logUser, setLogUser] = useState<User>()
    const [logErr, setLogErr] = useState('');
    const [success, setSuccess] = useState<User>();

    const [response, setResponse] = useState<User>()
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModelMessage] = useState('');
    const [modalTitle, setModelTitle] = useState('');

    const { login, user } = useContext(UserContext);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.id === 'email' ? setEmail(event.target.value) : setPassword(event.target.value)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            data(success)
        }, 1000);
        return () => clearTimeout(timer);
    }, [success]);

    useEffect(() => {
        logUser && login(logUser)
    }, [logUser])

    const handleLogin = () => {
        const input = {
            email,
            password
        }
        LoginAPi(input).then((response: User) => {
            console.log(response)
            if (response.status === "200") {
                setModelTitle('Success')
                setShowModal(true)
                setModelMessage('login Good')
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
                    status: response.statusCode
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
                <div className={styles.login}>
                    <div className={styles.container}>
                        <div className={styles.title}>
                            <p>Login to your account</p>
                            <button
                                className={styles.close}
                                onClick={() => onClose()}
                            >
                                x
                            </button>
                        </div>
                        <div className={styles.main}>
                            <input
                                id='email'
                                type="text"
                                onChange={(e) => handleChange(e)}
                                placeholder='Email'
                            />
                            <input
                                id='password'
                                type="text"
                                onChange={(e) => handleChange(e)}
                                placeholder='Password'
                            />
                            <button
                                onClick={() => handleLogin()}
                            >Login</button>
                        </div>
                        <div className={styles.footer}>
                            <div className={styles.container}>
                                <p>forgot password</p>
                                <p>Don't have an account? Register here</p>
                                <p>Terms of use. Privacy policy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal
