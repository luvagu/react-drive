import { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

import CenteredContainer from './CenteredContainer'
import { Alert, Button, Card, Form } from 'react-bootstrap'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLaoding] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLaoding(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch (err) {
            setError('Failed to login ' + err.message)
        }

        setLaoding(false)
    }
 
    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && (<Alert variant="danger">{error}</Alert>)}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>Log In</Button>
                    </Form>
                    <div className="w-100 text-center my-3">
                        <Link to='/forgot-password'>Forgot password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </CenteredContainer>
    )
}

export default Login
