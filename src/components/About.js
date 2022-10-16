import React, { useContext } from "react";
import roleContext from "../context/Role/roleContext";

const About = () => {
    const context = useContext(roleContext)
    const { roles } = context;
    return (
        <div>
            About Page. {roles.rolename}
        </div>
    )
}

export default About;