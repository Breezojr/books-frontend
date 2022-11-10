import { useContext, useEffect, useState } from 'react'
import { LoginApi } from '../api/login.api'
import { UserContext } from '../providers/UserProvider'
import { User } from '../types'
import MainLayout from './layout/Layout'
import styles from './styles/login.module.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logUser, setLogUser] = useState<User>()
    const [token, setToken] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useContext(UserContext);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.id === 'email' ? setEmail(event.target.value) : setPassword(event.target.value)
    }

    const handleLogin = () => {
        const input = {
            email,
            password
        }
        LoginApi(input, setLogUser)
    }

    useEffect(() => {
        logUser && login(logUser)
    }, [logUser]
    )

    return (
        <MainLayout>
            <div className={styles.login}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <p>Login to your account</p>
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
        </MainLayout>
    )
}

export default Login