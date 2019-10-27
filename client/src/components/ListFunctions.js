import axios from 'axios';

export const listEmployee = () => {
    return axios.get('/api/employees', {
        headers: { "Content-type": "application/json"}
    })
    .then(res => {
        var data = []
        Object.keys(res.data).forEach((key) => {
            var val = res.data[key]
            data.push([val.id,val.name,val.department,val.salary])
        })
        // console.log(data)
        return data
    })
}

export const addEmployee = (name, department, salary) =>{
    return axios.post('/api/employee', {
        name: name, department: department, salary:salary
    }, {
        headers: {
            "Content-type": "application/json"
        }
    })
    .then((res) => {
        console.log(res)
        console.log(name)
        console.log(department)
    })
}

export const deleteEmployee = id =>{
    // console.log(id);
    axios.delete(`/api/employee/${id}`, {
        headers: {"Content-type": "application/json"}
    })
    .then((res) => {
        console.log(res)
    })
    .catch((res) => {
        console.log(res)
    })
}

export const updateEmployee = (id, name, department, salary) => {
    console.log(id);
    return axios.put(`/api/employee/${id}`, {
                name: name, department: department, salary: salary
            },{
                headers: {"Content-type": "application/json"}
            }
            )
    .then((res) => {
        console.log(res)
    })
}