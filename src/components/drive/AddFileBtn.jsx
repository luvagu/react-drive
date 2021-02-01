import { useState } from 'react'
import ReactDOM from 'react-dom'
import { useAuth } from '../../contexts/AuthContext'
import { database, storage } from '../../firebase'
import { ROOT_FOLDER } from '../../hooks/useFolder'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { ProgressBar, Toast } from 'react-bootstrap'

const AddFileBtn = ({ currentFolder }) => {
    const [uploadingFiles, setUploadingFiles] = useState([])
    const { currentUser } = useAuth()

    function handleUpload(e) {
        const file = e.target.files[0]

        if (currentFolder == null || file == null) return

        const id = 'fid' + Date.now() + 'uid' + Math.floor(Math.random() * 1000)

        setUploadingFiles(prevUploadedFiles => [
            ...prevUploadedFiles,
            {
                id: id,
                name: file.name,
                progress: 0,
                error: false
            }
        ])

        const filePath = 
            currentFolder === ROOT_FOLDER 
                ? file.name
                : `${currentFolder.path.map(({ name }) => name).join('/')}/${currentFolder.name}/${file.name}`

        const uploadTask = storage.ref(`files/${currentUser.uid}/${filePath}`).put(file)

        uploadTask.on(
            'state_changed', 
            (snapshot) => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes
                setUploadingFiles(prevUploadedFiles => {
                    return prevUploadedFiles.map(uploadedFile => {
                        console.log('id', id)
                        if (uploadedFile.id === id) {
                            return { ...uploadedFile, progress }
                        }

                        return uploadedFile
                    })
                })
            },
            () => {
                setUploadingFiles(prevUploadedFiles => {
                    return prevUploadedFiles.map(uploadedFile => {
                        console.log('id', id)
                        if (uploadedFile.id === id) {
                            return { ...uploadedFile, error: true }
                        }

                        return uploadedFile
                    })
                })
            },
            () => {
                setUploadingFiles(prevUploadedFiles => {
                    console.log('id', id)
                    return prevUploadedFiles.filter(uploadedFile => uploadedFile.id !== id)
                })

                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    database.files
                        .where('name', '==', file.name)
                        .where('userId', '==', currentUser.uid)
                        .where('folderId', '==', currentFolder.id)
                        .get()
                        .then(existingFiles => {
                            const existingFile = existingFiles.docs[0]

                            if (existingFile) {
                                existingFile.ref.update({ url })
                            } else {
                                database.files.add({
                                    url,
                                    name: file.name,
                                    createdAt: database.getCurrentTimestamp(),
                                    folderId: currentFolder.id,
                                    userId: currentUser.uid
                                })
                            }
                        })
                })
            }
        )
    }

    return (
        <>
            <label className="btn btn-outline-success btn-sm m-0 mr-2">
                <FontAwesomeIcon icon={faFileUpload} />
                <input 
                    type="file" 
                    onChange={handleUpload} 
                    style={{ opacity: 0, position: 'absolute', left: '-9999px' }} 
                />
            </label>
            {uploadingFiles.length > 0 &&
                ReactDOM.createPortal((
                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', maxWidth: '250px' }}>
                        {uploadingFiles.map(file => (
                            <Toast 
                                key={file.id}
                                onClose={() => {
                                    setUploadingFiles(prevUploadedFiles => {
                                        return prevUploadedFiles.filter(uploadedFile => uploadedFile.id !== file.id)
                                    })
                                }}
                            >
                                <Toast.Header closeButton={file.error} className="text-truncate w-100 d-block">
                                    {file.name}
                                </Toast.Header>
                                <Toast.Body>
                                    <ProgressBar 
                                        animated={!file.error}
                                        variant={file.error ? 'danger' : 'primary'}
                                        now={file.error ? 100 : file.progress * 100}
                                        label={file.error ? 'Error' : `${Math.round(file.progress * 100)}%`}
                                    />
                                </Toast.Body>
                            </Toast>
                        ))}
                    </div>
                ), document.body)
            }
        </>
    )
}

export default AddFileBtn
