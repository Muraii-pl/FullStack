import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";



const Home = () => {
    const [listOfPosts, setListOfPost] = useState([])
    let history = useHistory()
    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
            setListOfPost(response.data)
        })
    }, [])

    return (
        <>
            {listOfPosts.map((value, key) => {
                return (
                    <div className="post" key={key} onClick={()=>{history.push(`/post/${value.id}`)}}>
                        <div className="title">{value.title}</div>
                        <div className="body">{value.postText}</div>
                        <div className="footer">{value.username}</div>
                    </div>
                )
            })}
        </>
    );
};

export default Home;