import { useState } from 'react'
import { database } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { ROOT_FOLDER } from '../../hooks/useFolder'

import { Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'


const AddFolderBtn = ({ currentFolder }) => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const { currentUser } = useAuth()

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    function handleSubmit(e) {
        e.preventDefault()

        if (currentFolder == null) return

        const path = [...currentFolder.path]
        if (currentFolder !== ROOT_FOLDER) {
            path.push({ name: currentFolder.name, id: currentFolder.id })
        }

        // Create a folder in the database
        database.folders.add({ 
            name,
            parentId: currentFolder.id,
            path,
            userId: currentUser.uid,
            createdAt: database.getCurrentTimestamp()
        })

        setName('')
        closeModal()
    }

    return (
        <>
            <Button variant="outline-success" size="sm" onClick={openModal}>
                <FontAwesomeIcon icon={faFolderPlus} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>Close</Button>
                        <Button variant="success" type="submit">Add Folder</Button>
                    </Modal.Footer>
                </Form> 
            </Modal>
        </>
    )
}

export default AddFolderBtn
