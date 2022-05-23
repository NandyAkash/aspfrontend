import React, {Component} from 'react';
import {Modal,Button, Col, Form, Row, Image } from 'react-bootstrap';

export class AddEmployee extends Component {
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofileName = 'annonymous.png';
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofileName;


    componentDidMount() {
        const api1 = process.env.REACT_APP_API+'department';
        fetch(api1)
        .then(res=>res.json())
        .then(data=>(
            this.setState({deps:data})
        ));
        
    }    
    handleSubmit(event) {
        event.preventDefault();
        const api = process.env.REACT_APP_API+'employee';
        fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                Department: event.target.Department.value,
                EmployeeName: event.target.EmployeeName.value,
                Dateofjoin: event.target.Dateofjoin.value,
                photofileName: this.photofileName
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

    handleFileSelected(event){
        event.preventDefault();
        this.photofileName=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );
        fetch(process.env.REACT_APP_API+'Employee/saveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
            console.log(this.imagesrc);
        },
        (error)=>{
            alert('Failed');
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
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control type='text' name='EmployeeName' placeholder='Employee Name' required />    
                                    </Form.Group>
                                    <Form.Group controlId="Department">
                                        <Form.Label>DepartmentName</Form.Label>
                                        <Form.Control as='select' >    
                                        {this.state.deps.map(dep=>
                                        <option key={dep.DepartmentId}>{dep.DepartmentName}</option>)}
                                    </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="DateOfJoining">
                                    <Form.Label>DateOfJoining</Form.Label>
                                    <Form.Control 
                                    type="date"
                                    name="Dateofjoin"
                                    required
                                    placeholder="DateOfJoining"
                                    />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant='primary' type='submit'>Add Employee</Button>
                                    </Form.Group>
                                   
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" height="200px" src={this.imagesrc}/>
                                <input onChange={this.handleFileSelected} type="File"/>
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


