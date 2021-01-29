import { Container } from 'react-bootstrap'
import Header from './Header'
import AddFolderBtn from './AddFolderBtn'

const Dashboard = () => {
    return (
        <>
            <Header />
            <Container fluid>
                <AddFolderBtn />
            </Container>
        </>
    )
}

export default Dashboard
