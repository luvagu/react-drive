import { useLocation, useParams } from 'react-router-dom'
import { useFolder } from '../../hooks/useFolder'

import { Container } from 'react-bootstrap'
import Header from './Header'
import Breadcumbs from './Breadcumbs'
import AddFileBtn from './AddFileBtn'
import AddFolderBtn from './AddFolderBtn'
import Folder from './Folder'
import File from './File'

const Dashboard = () => {
    const { folderId } = useParams()
    const { state = {} } = useLocation()
    const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)

    return (
        <>
            <Header />
            <Container fluid>
                <div className="d-flex align-items-center">
                    <Breadcumbs currentFolder={folder} />
                    <AddFileBtn currentFolder={folder} />
                    <AddFolderBtn currentFolder={folder} />
                </div>
                {childFolders.length > 0 && (
                    <div className="d-flex flex-wrap">
                        {childFolders.map(childFolder => (
                            <div key={childFolder.id} className="p-2" style={{ maxWidth: '250px'}}>
                                <Folder folder={childFolder} />
                            </div>
                        ))}
                    </div>
                )}

                {childFolders.length > 0 && childFiles.length > 0 && (<hr />)}

                {childFiles.length > 0 && (
                    <div className="d-flex flex-wrap">
                        {childFiles.map(childFile => (
                            <div key={childFile.id} className="p-2" style={{ maxWidth: '250px'}}>
                                <File file={childFile} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </>
    )
}

export default Dashboard
