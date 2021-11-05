import React, {useContext, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";

const CreatePost = () => {
    let history = useHistory()
    const {authState} = useContext(AuthContext)
    const initialValues = {
        title: "",
        postText: "",
        username: ""
    }
    const onSubmit = (data) => {

        axios.post("http://localhost:3001/posts", data,{
            headers:{
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            history.push('/')
        })
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Tytuł nie może być pusty"),
        postText: Yup.string().required("Post nie może być pusty"),
    })

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login")
        }
    }, [])
    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label htmlFor="title">Title:</label>
                    <ErrorMessage name="title" component="span"/>
                    <Field id="inputCreatePost"
                           name="title"
                           placeholder="(Ex. Title...)"
                           autoComplete="off"/>
                    <ErrorMessage name="postText" component="span"/>
                    <label htmlFor="postText">Post:</label>
                    <Field id="inputCreatePost"
                           name="postText"
                           placeholder="(Ex. Post...)"
                           autoComplete="off"/>

                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    );
};

export default CreatePost;