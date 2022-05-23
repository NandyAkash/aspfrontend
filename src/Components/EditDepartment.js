import React, {Component} from 'react';
import {Modal,Button, Col, Form, Row } from 'react-bootstrap';

export class EditDepartment extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const api = process.env.REACT_APP_API+'department';
        fetch(api, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentId: event.target.DepartmentId.value,
                DepartmentName: event.target.DepartmentName.value
                
            })
        })
        .then(res => res.json())
        .then((result)=> {
            alert(result);
        },
        (error) => {
            alert('Failed')
        })
    }
    render() {
        return(
            <div className='container'>
                
                <Modal 
                    {...this.props}
                    size='lg'
                    aria-labelledby='conatined-modal-title-vcenter'
                    centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id='conatined-modal-title-vcenter'>
                            Edit Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="DepartmentId">
                                        <Form.Label>DepartmentID</Form.Label>
                                        <Form.Control type='text' name='DepartmentID' disabled 
                                        defaultValue={this.props.depid}/>    
                                    </Form.Group>
                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>DepartmentName</Form.Label>
                                        <Form.Control type='text' name='DepartmentName' placeholder='DepartmentName' required
                                        defaultValue={this.props.depname} />    
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant='primary' type='submit'>Update Department</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}