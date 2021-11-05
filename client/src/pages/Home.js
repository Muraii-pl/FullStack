import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import {useHistory,Link} from "react-router-dom";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import {AuthContext} from "../helpers/AuthContext";


const Home = () => {
        const [listOfPosts, setListOfPost] = useState([])
        const [likedPosts, setLikedPost] = useState([])
        const {authState} = useContext(AuthContext)
        let history = useHistory()

        useEffect(() => {
            if (!localStorage.getItem("accessToken")) {
                history.push("/login")
            } else {
                axios.get("http://localhost:3001/posts", {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                }).then((response) => {
                    setListOfPost(response.data.listOfPosts)
                    setLikedPost(response.data.likedPosts.map((like) => {
                        return like.PostId
                    }))
                })
            }
        }, [])

        const likeAPost = (postId) => {
            axios.post("http://localhost:3001/likes", {PostId: postId},
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                }).then((response) => {
                setListOfPost(listOfPosts.map((post) => {
                        if (post.id === postId) {
                            if (response.data.liked) {
                                return {...post, Likes: [...post.Likes, 0]}
                            } else {
                                const likesArray = post.Likes
                                likesArray.pop()
                                return {...post, Likes: likesArray}
                            }
                        } else {
                            return post
                        }
                    })
                )
                if (likedPosts.includes(postId)) {
                    setLikedPost(likedPosts.filter((id) => {
                        return id !== postId
                    }))
                } else {
                    setLikedPost([...likedPosts, postId])
                }
            })
        }

        return (
            <>
                {listOfPosts.map((value, key) => {
                    return (
                        <div className="post" key={key}>
                            <div className="title">{value.title}</div>
                            <div className="body" onClick={() => {
                                history.push(`/post/${value.id}`)
                            }}>{value.postText}</div>
                            <div className="footer">
                                <div className="username">
                                    <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
                            </div>
                            <div className="buttons">
                                <ThumbUpAltIcon onClick={() => {
                                    likeAPost(value.id)
                                }} className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}/>
                                <label>{value.Likes.length}</label></div>

                        </div>
                </div>
                )
                })}
            </>
        );
    }
;

export default Home;