import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getUserAsync, addUserAsync, updateUserAsync, deleteUser } from "./userSlice";
import UserForm from "./UserForm";
import UserItem from "./UserItem";

const User = () => {
    const dispatch = useDispatch();
    const modelRef = useRef(null);
    const users = useSelector((state) => state.user.userList);
    const userInitial = { "name": "", "email": "", "password": "", "isUpdate": false }
    const [user, setUser] = useState(userInitial);
    useEffect(() => {
        dispatch(getUserAsync());
    }, [dispatch])

    const handleOnClickEvent = () => {
        setUser(userInitial);
        modelRef.current.click();
    }
    const showCurrentUserForEdit = (currentUser) => {
        setUser(userInitial);
        setUser({ id: currentUser._id, name: currentUser.name, email: currentUser.email, password: '', isUpdate: true });
        modelRef.current.click();
    }

    return (
        <>
            <div className='row my-3'>
                <h2>User List</h2>
                <button ref={modelRef} className="btn btn-primary" onClick={handleOnClickEvent}>Add User</button>
                {users.map((user) => {
                    return <UserItem user={user} key={user._id} showCurrentUserForEdit={showCurrentUserForEdit} dispatch={dispatch} deleteUser={deleteUser} />
                })}
            </div>
            <button ref={modelRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#userModal">
                Launch demo modal
            </button>
            <UserForm user={user} setUser={setUser} addUser={addUserAsync} updateUser={updateUserAsync} dispatch={dispatch} modelRef={modelRef} />
        </>
    )
}

export default User;