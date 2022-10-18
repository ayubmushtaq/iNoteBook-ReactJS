import React, { useState } from "react";
import RoleContext from "./roleContext";

const RoleState = (props) => {
  const host = 'http://localhost:8000'
  const authtoken = localStorage.getItem('authToken');
  const roleInitial = []
  const [roles, setRole] = useState(roleInitial);

  //Get all Roles.
  const getAllRoles = async () => {
    const url = `${host}/api/role`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authtoken
      }
    })
    const json = await response.json();
    setRole(json);
  }

  // Create a new Role.
  const addRole = async (role, modelRef) => {
    const { rolename, roledescription } = role;
    //TODO: API Call
    const url = `${host}/api/role`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authtoken

      },
      body: JSON.stringify({ rolename, roledescription })
    })
    // const json = await response.json();
    if (response.status === 200) {
      getAllRoles();
      modelRef.current.click();
    }

  }
  //Edit existing Role.
  const editRole = async (role, modelRef) => {
    const { id, rolename, roledescription } = role;
    //TODO: API Call
    const url = `${host}/api/role/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authtoken
      },
      body: JSON.stringify({ rolename, roledescription })
    })
    // const json = await response.json();
    if (response.status === 200) {
      getAllRoles();
      modelRef.current.click();
    }
  }

  //Delete Role
  const deleteRole = async (id) => {
    const url = `${host}/api/role/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authtoken
      },
    })
    // const json = await response.json();
    if (response.status === 200) {
      getAllRoles();
    }
  }


  return (
    <RoleContext.Provider value={{ roles, addRole, editRole, deleteRole, getAllRoles }}>
      {props.children}
    </RoleContext.Provider>
  )
}

export default RoleState;