import { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

import CenteredContainer from './CenteredContainer'
import { Alert, Button, Card, Form } from 'react-bootstrap'

const UpdateProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLaoding] = useState(false)
    const [message, setMessage] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setError('')
        setMessage('')
        setLaoding(true)

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => setMessage('Profile updated successfully'))
            .catch((err) => setError('Failed to update profile ' + err.message))
            .finally(() => setLaoding(false))
    }
 
    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && (<Alert variant="danger">{error}</Alert>)}
                    {message && (<Alert variant="success">{message}</Alert>)}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Form.Group id="passwordConfirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to='/profile'>Return to Profile</Link>
            </div>
        </CenteredContainer>
    )
}
export default UpdateProfile
