import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

import { Alert, Button, Card } from 'react-bootstrap'

const Dashboard = () => {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')
        
        try {
            await logout()
            history.push('/login')
        } catch (err) {
            setError('Failed to log out' + err.message)
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Dashboard</h2>
                    {error && (<Alert variant="danger">{error}</Alert>)}
                    <strong>Email:</strong> {currentUser.email}
                    <Link to='/update-profile' className="w-100 btn btn-primary mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}

export default Dashboard
