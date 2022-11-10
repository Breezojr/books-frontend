import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignupApi } from '../api/signup.api'
import { LoginInput } from '../types'
import MainLayout from './layout/Layout'
import styles from './styles/signup.module.css'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [response, setResponse] = useState('')

    const navigate = useNavigate()

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
        }
    }

    console.log(email)
    console.log(firstName)
    console.log(lastName)
    console.log(password)
    console.log(confirmPassword)
    console.log(response)

    return (
        <MainLayout>
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
                            onClick={() => SignupApi({
                                email,
                                firstName,
                                lastName,
                                password,
                                confirmPassword
                                },
                                  setResponse
                                 )}
                        >
                            SignUp
                        </button>
                    </div>
                    <div className={styles.footer}>
                        <button
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Signup