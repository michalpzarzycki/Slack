import React, { useState } from 'react'
import mime from 'mime-types'
import { Modal, Input, Button, Icon } from 'semantic-ui-react'

function FileModal({ modal, closeModal, uploadFile }) {
    const [file, setFile] = useState(null);
    const [authorized, setAuthorized] = useState(['image/jpg', 'image/png'])


    const isAuthorized = (filename) => authorized.includes(mime.lookup(filename))

    const addFile = event => {
     const file = event.target.files[0]
     console.log("FILE", file)  
     if(file) {
        setFile({...file})  

     }
    }

    const sendFile = () => {
        if(file!==null) {
            if(isAuthorized(file.name)) {
                const metadata = { contentType: mime.lookup(file.name)}
                uploadFile(file, metadata)
                closeModal()
                clearFile()
            }

        }
    }

    const clearFile = () => setFile(null)
    return(
        <Modal basic open={modal} onClose={closeModal}>
            <Modal.Header>Select image file</Modal.Header>
            <Modal.Content>
                <Input
                    onChange={sendFile}
                    fluid
                    label="File types: jpg, png"
                    name="file"
                    type="file"
                />
            </Modal.Content>
            <Modal.Actions>
                <Button 
                onClick={uploadFile}
                 color="green"
                 inverted
                >
                  <Icon name="checkmark"/>Send
                </Button>
                <Button 
                 color="red"
                 inverted
                 onClick={closeModal}
                >
                  <Icon name="remove"/>Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default FileModal
