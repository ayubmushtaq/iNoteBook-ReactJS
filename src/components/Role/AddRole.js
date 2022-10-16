import React, { useContext, useState } from 'react'
import roleContext from '../../context/Role/roleContext'

const AddRole = () => {
    const context = useContext(roleContext);
    const roleInitial = { "rolename": "", "roledescription": "" }
    const [role, setRole] = useState(roleInitial);
    const { addRole } = context;
    const handleSubmit = (e) => {
        e.preventDefault();
        addRole(role);
    }
    const handleTextChange = (e) => {
        setRole({ ...role, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <h2>Add Role</h2>
            <form className="col-md-3">
                <div className="mb-3">
                    <label className="form-label" htmlFor='rolename'>Name</label>
                    <input type="text" className="form-control" id="rolename" name='rolename' onChange={handleTextChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor='roledescription'>Description</label>
                    <textarea className="form-control" id="roledescription" name='roledescription' rows="3" onChange={handleTextChange}></textarea>
                </div>
                <button className='btn btn-primary' type='submit' onClick={handleSubmit}>Add Role</button>
            </form>
        </div>
    )
}

export default AddRole