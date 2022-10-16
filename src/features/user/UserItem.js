import React from 'react'

const UserItem = (props) => {
    //Manage Role List View.
    const { user, showCurrentUserForEdit, dispatch, deleteUser } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                    <i className="fa-solid fa-trash" onClick={() => { dispatch(deleteUser(user._id)) }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { showCurrentUserForEdit(user) }}></i>
                </div>
            </div>
        </div>
    )
}

export default UserItem