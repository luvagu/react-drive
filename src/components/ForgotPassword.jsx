import { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

import { Alert, Button, Card, Form } from 'react-bootstrap'

const ForgotPassword = () => {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLaoding] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setMessage('')
            setLaoding(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch (err) {
            setError('Failed to reset password ' + err.message)
        }

        setLaoding(false)
    }
 
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Forgot Password</h2>
                    {error && (<Alert variant="danger">{error}</Alert>)}
                    {message && (<Alert variant="success">{message}</Alert>)}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center my-3">
                        <Link to='/login'>Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword
