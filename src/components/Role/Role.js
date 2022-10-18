import React, { useContext, useEffect, useRef, useState } from "react";
import roleContext from '../../context/Role/roleContext';
import RoleItem from "./RoleItem";
import RoleForm from "./RoleForm";

const Role = () => {
    const context = useContext(roleContext);
    const { roles, getAllRoles } = context;
    const roleInitial = { "rolename": "", "roledescription": "","isUpdate":false }
    const [role, setRole] = useState(roleInitial);
    useEffect(() => {
        if (localStorage.getItem('authToken')){
            getAllRoles()
        }
        // eslint-disable-next-line
    }, []);

    const updateRole = (currentRole) => {
        setRole({ id: currentRole._id, rolename: currentRole.roleName, roledescription: currentRole.roleDescription, isUpdate: true });
        modelRef.current.click();
    }
    const handleClick = () => {
        setRole(roleInitial);
        modelRef.current.click();
    }
    const modelRef = useRef(null);
    return (
        <>
            <div className='row my-3'>
                <h2>Role List</h2>
                <button ref={modelRef} onClick={handleClick} className="btn btn-primary">Add Role</button>
                {roles.length > 0 && roles.map((role) => {
                    return <RoleItem key={role._id} role={role} updateRole={updateRole} />
                })}
            </div>
            <button ref={modelRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <RoleForm role={role} setRole={setRole} modelRef={modelRef} />
        </>
    )
}

export default Role;