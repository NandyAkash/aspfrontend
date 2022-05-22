import React,{Component} from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepartment } from './AddDepartment';

export class Department extends Component {

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow: false};
    }
    
    refershList() {
        const api = process.env.REACT_APP_API+'department';
        fetch(api)
        .then(response => response.json())
        .then(data=> {
            this.setState({deps:data})
        })
    }
    componentDidMount(){
        this.refershList();
    }
    componentDidUpdate() {
        this.refershList();
    }
    render() {
        const {deps} = this.state;
        let addModalClose = () => this.setState({addModalShow:false}) 
        return(
            <div>
                <Table className='mt-4' striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>DepartmentId</th>
                            <th>DepartmentName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>Edit / Delete</td>
                            </tr>
                            )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
                    Add Department
                    </Button>
                    <AddDepartment show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}