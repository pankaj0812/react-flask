import React, {Component} from 'react';
import { listEmployee, addEmployee, deleteEmployee, updateEmployee, viewEmployee} from './ListFunctions';
import PropTypes from 'prop-types';


class List extends Component{
    constructor(){
        super()
        this.state = {
            id: '',
            name: '',
            department: '',
            salary: '',
            editDisabled: false,
            items: [],
            show: false
        }

        this.onNameChange = this.onNameChange.bind(this)
        this.onDeptChange = this.onDeptChange.bind(this)
        this.onSalaryChange = this.onSalaryChange.bind(this)
        // this.onEdit = this.onEdit.bind(this);
        // this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        this.getAll()
    }

    onNameChange = event => {
        this.setState({
            name: event.target.value,
            editDisabled: 'disabled'
        })
    }

    onDeptChange = event => {
        this.setState({
            department: event.target.value,
            editDisabled: 'disabled'
        })
    }
    onSalaryChange = event => {
        this.setState({ 
            salary: event.target.value,
            editDisabled: 'disabled'
        })
    }

    getAll = () => {
        listEmployee().then(data => {
            this.setState({
                name: '',
                department: '',
                salary: '',
                items: [...data]
            },
            () => {
                console.log(this.state.name, this.state.department, this.state.salary)              
            })
        })
    }

    onSubmit = event => {
        // event.preventDefault()
        addEmployee(this.state.name, this.state.department, this.state.salary).then(data => {

            this.setState({
                name: this.state.name,
                department: this.state.department,
                salary: this.state.salary,
                editDisabled: ''})     
        })
        // this.getAll()
    }

    onUpdate = e => {
        e.preventDefault()
        updateEmployee(this.state.id, this.state.name, this.state.department, this.state.salary).then(() => {
            this.getAll()
        })
    }

    onEdit = (id, name, department, salary, event) => {
        event.preventDefault()
        this.setState({ 
            id: id, 
            name: name,
            department: department,
            salary: salary,
        })
        console.log(id);
       
    }

    onDelete = (id, event) => {
        event.preventDefault()
        deleteEmployee(id)
        
        var data = [...this.state.items]
        console.log(data)
        data.filter((item, index) => {
            if(item[0] === id){
                data.splice(index, 1 )
            }
            return true
        })
        this.setState({items: [...data]})
    }

    onView = (id, event) => {
        event.preventDefault()
        viewEmployee(id);
        var data = [...this.state.items]
        data.filter((item, index) => {
            if(item[0] === id){
                alert(item[0]+" "+item[1]+" "+ item[2]+" "+item[3])
            }
            return true
        })
        // alert(id );
        

    }

    render(){
        return(
            <div className="col-md-12">
                <form>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4">
                                <input
                                    placeholder="Name" 
                                    type="text" 
                                    className="form-control"
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.onNameChange}
                                    />
                            </div>
                            <div className="col-md-4">
                                <input 
                                    placeholder="department"
                                    type="text" 
                                    className="form-control"
                                    id="department"
                                    value={this.state.department}
                                    onChange={this.onDeptChange}
                                    />
                            </div>
                            <div className="col-md-2">
                                <input 
                                    placeholder="salary"
                                    type="text" 
                                    className="form-control"
                                    id="salary"
                                    value={this.state.salary}
                                    onChange={this.onSalaryChange}
                                    />
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary"
                                    onClick={this.onUpdate.bind(this)}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-success btn-block"
                        type="submit"
                        onClick={this.onSubmit.bind(this)}
                    >Submit
                    </button>
                </form>
                <table className="table">
                    <tbody>
                        {this.state.items.map((item, index) => (
                            <tr key={index}>
                                <td className="text-left">{item[1]}</td>
                                <td className="text-left">{item[2]}</td>
                                <td className="text-left">{item[3]}</td>
                                <td className="text-right">
                                <button className="btn btn-info mr-1"
                                    disabled={this.state.editDisabled}
                                    onClick={this.onView.bind(this,item[0])}
                                    >
                                    View
                                </button>
                                {/* <Modal onClose={this.showModal} show={this.state.show}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                                    deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non
                                    fuga omnis a sed impedit explicabo accusantium nihil doloremque
                                    consequuntur.
                                    </Modal> */}
                                <button className="btn btn-info mr-1"
                                    // disabled={this.state.editDisabled}
                                    onClick={this.onEdit.bind(this, item[0], item[1], item[2], item[3])}
                                    >
                                    Edit
                                </button>

                                <button className="btn btn-danger"
                                    disabled={this.state.editDisabled}
                                    onClick={this.onDelete.bind(this, item[0])}
                                >
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default List