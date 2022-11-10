import { useState } from 'react'
import { LoginApi } from '../api/login.api'
import MainLayout from './layout/Layout'
import styles from './styles/login.module.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')

    const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        event.target.id === 'email'? setEmail(event.target.value) : setPassword(event.target.value)
    }

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
                                onClick={() => LoginApi({email: email, password:password}, setToken)}
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