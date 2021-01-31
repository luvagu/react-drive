import { useLocation, useParams } from 'react-router-dom'
import { useFolder } from '../../hooks/useFolder'

import { Container } from 'react-bootstrap'
import Header from './Header'
import Breadcumbs from './Breadcumbs'
import AddFolderBtn from './AddFolderBtn'
import Folder from './Folder'

const Dashboard = () => {
    const { folderId } = useParams()
    const { state = {} } = useLocation()
    const { folder, childFolders } = useFolder(folderId, state.folder)

    return (
        <>
            <Header />
            <Container fluid>
                <div className="d-flex align-items-center">
                    <Breadcumbs currentFolder={folder} state={state} />
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
            </Container>
        </>
    )
}

export default Dashboard
