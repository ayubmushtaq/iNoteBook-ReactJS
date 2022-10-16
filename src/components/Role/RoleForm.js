import React, { useContext } from 'react'
import roleContext from '../../context/Role/roleContext'

const RoleForm = (props) => {
    //Manage Add and Update Role Form
    const context = useContext(roleContext);
    const { role, setRole, modelRef } = props;
    const { editRole, addRole } = context;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (role.isUpdate) {
            editRole(role, modelRef);
        }
        else {
            addRole(role, modelRef);
        }

    }
    const handleTextChange = (e) => {
        setRole({ ...role, [e.target.name]: e.target.value })
    }

    return (
        <>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{role.isUpdate ? 'Update Role' : 'Add Role'}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor='rolename'>Name</label>
                                    <input type="text" className="form-control" id="rolename" name='rolename' onChange={handleTextChange} value={role.rolename} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor='roledescription'>Description</label>
                                    <textarea className="form-control" id="roledescription" name='roledescription' rows="3" onChange={handleTextChange} value={role.roledescription}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>{role.isUpdate ? 'Update Role' : 'Add Role'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoleForm