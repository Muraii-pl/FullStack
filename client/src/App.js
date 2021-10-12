import './App.css';
import axios from "axios";
import { useEffect,useState } from "react";

function App() {
  const [listOfPosts,setListOfPost] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/posts").then((response)=>{
      setListOfPost(response.data)
    })
  },[])


  return (
    <div className="App">
      {listOfPosts.map((value, index)=>{
            return (
                <div className="post" key={index}>
                  <div className="title">{value.title}</div>
                  <div className="body">{value.postText}</div>
                  <div className="footer">{value.username}</div>
                </div>
            )
      })}
    </div>
  );
}

export default App;