import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from '../helpers/AuthContext'

const Post = () => {

    let {id} = useParams()
    let history = useHistory()
    const [postObject, setPostObject] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const {authState} = useContext(AuthContext)
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((responese) => {
            setPostObject(responese.data)
        })

        axios.get(`http://localhost:3001/comments/${id}`).then((responese) => {
            setComments(responese.data)
        })
    }, [])

    const addComment = () => {
        axios.post("http://localhost:3001/comments", {commentBody: newComment, PostId: id},
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            })
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    const commentToAdd = {commentBody: newComment, username: response.data.username}
                    setComments([...comments, commentToAdd])
                    setNewComment("")

                }
            })
    }
    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            setComments(comments.filter((value) => {
                return value.id !== id
            }))
        })
    }

    const deletePost = (id) => {
        axios.delete(`http://localhost:3001/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            history.push("/")
        })
    }
    const editPost = (option) => {
        if (option === "title") {
            let newTitle = prompt("Enter New Title:")
            axios.put(`http://localhost:3001/posts/title`, {
                newTitle: newTitle, id: id
            }, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then(() => {
                setPostObject({...postObject, title: newTitle})
            })
        } else {
            let newPostText = prompt("Enter New Text:")
            axios.put("http://localhost:3001/posts/postText", {
                newPostText: newPostText, id: id
            }, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then((response) => {
                console.log(response)
                setPostObject({...postObject, postText: newPostText})
            })
        }
    }
    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title" onClick={() => {
                        if (authState.username === postObject.username) {
                            editPost("title")
                        }
                    }}>{postObject.title}</div>
                    <div className="body" onClick={() => {
                        if (authState.username === postObject.username) {
                            editPost("body")
                        }
                    }}>{postObject.postText}</div>
                    <div className="footer">{postObject.username}
                        {authState.username === postObject.username && (<button onClick={() => {
                            deletePost(postObject.id)
                        }}>Delete Post</button>)}

                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input type="text"
                           placeholder="Comment..."
                           value={newComment}
                           onChange={(event) => {
                               setNewComment(event.target.value)
                           }}
                           autoComplete="off"/>
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return (
                            <div className="comment" key={key}>{comment.commentBody}
                                <label htmlFor=""> Username: {comment.username}</label>
                                {authState.username === comment.username && <button onClick={() => {
                                    deleteComment(comment.id)
                                }}>X</button>}
                            </div>
                        )
                    })}
                </div>

            </div>

        </div>
    );
};

export default Post;