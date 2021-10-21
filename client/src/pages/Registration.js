import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup"
import axios from "axios";
import {useHistory} from "react-router-dom";

const Registration = () => {
    let history = useHistory()

    const initialValues = {
        username: "",
        password: ""
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth",data).then(()=>{
            history.push('/')
        })
    }
    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className="formContainer">
                    <label htmlFor="">Username:</label>
                    <ErrorMessage name="username" component="span"/>
                    <Field autoComplete="off"
                           id="inputCreatePost"
                           name="username"
                           placeholder="Username"/>
                    <label htmlFor="password">Password:</label>
                    <ErrorMessage name="password" component="span"/>
                    <Field autoComplete="off"
                           id="inputCreatePost"
                           type="password"
                           name="password"
                           placeholder="Password"/>
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Registration;