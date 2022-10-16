import React from 'react'

const UserForm = (props) => {
    //Manage Add and Update User Form
    const { user, setUser, addUser, updateUser, dispatch, modelRef } = props;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.isUpdate) {
            dispatch(updateUser({ user, modelRef }));
        }
        else {
            dispatch(addUser({ user, modelRef }));
        }

    }
    const handleTextChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="userModalLabel">{user.isUpdate ? 'Update User' : 'Add User'}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor='name'>Name</label>
                                    <input type="text" className="form-control" id="name" name='name' value={user.name} onChange={handleTextChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor='email'>Email</label>
                                    <input type="email" className="form-control" id="email" name='email' value={user.email} onChange={handleTextChange} />
                                </div>
                                <div className="mb-3" hidden={user.isUpdate}>
                                    <label className="form-label" htmlFor='password'>Password</label>
                                    <input type="password" className="form-control" id="password" name='password' value={user.password} onChange={handleTextChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>{user.isUpdate ? 'Update User' : 'Add User'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserForm