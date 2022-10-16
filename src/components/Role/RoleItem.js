import React, { useContext } from 'react'
import roleContext from '../../context/Role/roleContext';

const RoleItem = (props) => {
    //Manage Role List View.
    const context = useContext(roleContext);
    const { deleteRole } = context;
    const { role, updateRole } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{role.roleName}</h5>
                    <p className="card-text">{role.roleDescription}</p>
                    <i className="fa-solid fa-trash" onClick={() => { deleteRole(role._id) }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateRole(role) }}></i>
                </div>
            </div>
        </div>
    )
}

export default RoleItem