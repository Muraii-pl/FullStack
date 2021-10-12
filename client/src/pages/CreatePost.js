import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import {useHistory} from "react-router-dom";

const CreatePost = () => {
    let history = useHistory()

    const initialValues = {
        title: "",
        postText: "",
        username: ""
    }
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts",data).then((response)=>{
            history.push('/')
        })
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Tytuł nie może być pusty"),
       postText:Yup.string().required("Post nie może być pusty"),
        username:Yup.string().min(3,"Minimalna długość to 3 znaki").max(15,"Max długość to 15 znaków").required("Pole nie może być puste"),
    })
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
                    <label htmlFor="username">Username:</label>
                    <ErrorMessage name="username" component="span"/>
                    <Field id="inputCreatePost"
                           name="username"
                           placeholder="(Ex. John123...)"
                           autoComplete="off"/>

                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    );
};

export default CreatePost;