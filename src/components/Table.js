import React, { useEffect, useState } from 'react'

import { EmployeeData } from './EmployeesData';

const Table = () => {
    const [data, setData] = useState([]);
    const[isUpdate, setIsUpdate] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState(0)
    const [id, setId] = useState(0)

    useEffect(() => {
        setData(EmployeeData)
    }, [])

    function handleEdit(id) {
        const dt = data.filter(item => item.id === id)
        if (dt !== undefined) {
            setId(id)
            setFirstName(dt[0].firstName)
            setLastName(dt[0].lastName)
            setAge(dt[0].age)
        }
        setIsUpdate(true)
    }

    function handleDelete(id) {
        if (id > 0) {
            if (window.confirm("Are you sure to delete this item")) {
                const dt = data.filter(item => item.id !== id)
                setData(dt)
            }
        }
    }

    function handleSave(e) {
        e.preventDefault();

        const dt = [...data];
        const newObj ={
            id: EmployeeData.length+1,
            firstName: firstName,
            lastName: lastName,
            age: age,
        }
        dt.push(newObj)
        setData(dt)

    }

    function handleClear() {
        setAge("");
        setId(0)
        setFirstName("")
        setLastName("")
        setIsUpdate(false)

    }

    function handleUpdate(){
        const index = data.map((item, index)=>{
            return item.id
        }).indexOf(id)

        const dt =[...data];
        dt[index].firstName = firstName;
        dt[index].lastName = lastName;
        dt[index].age = age;
        setData(dt)
        handleClear()
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: "10px"}}>
                <div>
                    <label>First Name:
                        <input type='text' placeholder='Enter First Name' onChange={(e)=>setFirstName(e.target.value)} value={firstName} />
                    </label>
                </div>
                <div>
                    <label>Last Name:
                        <input type='text' placeholder='Enter last Name'onChange={(e)=>setLastName(e.target.value)} value={lastName} />
                    </label>
                </div>
                <div>
                    <label>Age:
                        <input type='text' placeholder='Enter Age' onChange={(e)=>setAge(e.target.value)}value={age} />
                    </label>
                </div>
                <div>
                    {!isUpdate ? 
                    <button className='btn btn-primary mx-2' onClick={ handleSave}>SAVE</button>
                     : <button className='btn btn-primary mx-2' onClick={(e) => handleUpdate()}>Update</button>}

                    <button className='btn btn-danger' onClick={(e) => handleClear()}>Clear</button>
                </div>
            </div>

            <table className='table table-hover'>
                <thead>
                    <tr>
                        <td>Sr. Number</td>
                        <td>Id</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Age</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.age}</td>
                            <td>
                                <button className='btn btn-primary mx-2' onClick={(e) => handleEdit(item.id)}>Edit</button>
                                <button className='btn btn-danger' onClick={(e) => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>

                    }
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table