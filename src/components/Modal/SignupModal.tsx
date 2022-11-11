import { useContext, useEffect, SetStateAction, useState } from 'react'
import { LoginAPi } from '../../api/login.api'
import { SignupAPi } from '../../api/signup.api'
import { UserContext } from '../../providers/UserProvider'
import { Signup, SignupInput, User, UserError } from '../../types'
import ConfirmationModal from './ConfirmationModal'
import styles from './styles/signup.module.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: React.Dispatch<React.SetStateAction<User | undefined>>
}

const SignupModal = ({
    isOpen = false,
    onClose,
    data,
}: ModalProps,) => {
    const [email, setEmail] = useState('')
    const [logUser, setLogUser] = useState<User>()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [success, setSuccess] = useState<User>();
    const [response, setResponse] = useState<Signup>()
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModelMessage] = useState('');
    const [modalTitle, setModelTitle] = useState('');

    const { login } = useContext(UserContext);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === 'email') {
            setEmail(event.target.value)
        }
        if (event.target.id === 'firstName') {
            setFirstName(event.target.value)
        }

        if (event.target.id === 'lastName') {
            setLastName(event.target.value)
        }
        if (event.target.id === 'password') {
            setPassword(event.target.value)
        }
        if (event.target.id === 'confirpassword') {
            setConfirmPassword(event.target.value)
        }    }

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

    const handleSignup = () => {
        const input = {
            email,
            firstName,
            lastName,
            password,
            confirmPassword
        }
        SignupAPi(input).then((response: User) => {
            console.log(response)
            if (response.status === "200") {
                setModelTitle('Success')
                setShowModal(true)
                setModelMessage('Signup is success, Signin to continue')
                setEmail('')
                setFirstName('')
                setLastName('')
                setPassword('')
                setConfirmPassword('')
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
                <div className={styles.signup}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <p>Signup your account</p>
                    </div>
                    <div className={styles.main}>
                        <input
                            id='email'
                            type="text"
                            onChange={(e) => handleChange(e)}
                            placeholder='Email'
                        />
                        <input
                            id='firstName'
                            type="text"
                            onChange={(e) => handleChange(e)}
                            placeholder='First Name'
                        />
                        <input
                            id='lastName'
                            type="text"
                            onChange={(e) => handleChange(e)}
                            placeholder='Last Name'
                        />
                        <input
                            id='password'
                            type="text"
                            onChange={(e) => handleChange(e)}
                            placeholder='Password'
                        />
                        <input
                            id='confirpassword'
                            type="text"
                            onChange={(e) => handleChange(e)}
                            placeholder='Confirm password'
                        />

                        <button
                         onClick={() => handleSignup()}
                        >
                            SignUp
                        </button>
                    </div>
                    <div className={styles.footer}>
                        <button
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SignupModal
