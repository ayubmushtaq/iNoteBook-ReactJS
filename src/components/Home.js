import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Role from "./Role/Role"

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <>
      < Role />
    </>
  )
}

export default Home