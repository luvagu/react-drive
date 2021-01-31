import { Link } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'


const Folder = ({ folder }) => {
    return (
        <Button 
            variant="outline-dark"
            className="text-truncate w-100"
            as={Link}
            to={{
                pathname: `/folder/${folder.id}`,
                state: { folder: folder }
            }}
        >
            <FontAwesomeIcon icon={faFolder} className="mr-2" />
            {folder.name}
        </Button>
    )
}

export default Folder
