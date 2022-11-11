import { useContext, useEffect, SetStateAction, useState } from 'react'
import { LoginAPi } from '../../api/login.api'
import { UserContext } from '../../providers/UserProvider'
import { User, UserError } from '../../types'
import ConfirmationModal from './ConfirmationModal'
import styles from './styles/login.module.css'
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: React.Dispatch<React.SetStateAction<User | undefined>>
}

const LoginModal = ({
    isOpen = false,
    onClose,
    data,
}: ModalProps,) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logUser, setLogUser] = useState<User>()
    const [success, setSuccess] = useState<User>();
    const [response, setResponse] = useState<User>()
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModelMessage] = useState('');
    const [modalTitle, setModelTitle] = useState('');

    const { login } = useContext(UserContext);

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
                setSuccess(response)
                login(response)
            }
            else {

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
                                type="password"
                                onChange={(e) => handleChange(e)}
                                placeholder='.....'
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
