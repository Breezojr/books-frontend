import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddBookApi } from '../api/add-book.api'
import MainLayout from './layout/Layout'
import styles from './styles/signup.module.css'

const EditBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [response, setResponse] = useState('')

    const navigate = useNavigate()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === 'tile') {
            setTitle(event.target.value)
        }
        if (event.target.id === 'author') {
            setAuthor(event.target.value)
        }

        if (event.target.id === 'description') {
            setDescription(event.target.value)
        }
    }

    return (
        <MainLayout>
            <div className={styles.signup}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <p>Signup your account</p>
                    </div>
                    <div className={styles.main}>
                        <input
                            id='title'
                            type="text"
                            onChange={(e) => handleChange(e)}
                            placeholder='Book Title'
                        />
                        <input
                            id='author'
                            type="text"
                            onChange={(e) => handleChange(e)}
                            placeholder='Book Author'
                        />
                        <input
                            id='description'
                            type="text"
                            onChange={(e) => handleChange(e)}
                            placeholder='Last Name'
                        />
                        <button
                            onClick={() => AddBookApi({
                                title,
                                author,
                                description,
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

export default EditBook