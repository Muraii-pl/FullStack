import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
    return (
        <div className="App">
            <Router>
                <div className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/createpost">Create A Post</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/createpost" exact component={CreatePost}/>
                    <Route path="/post/:id" exact component={Post}/>
                    <Route path="/register" exact component={Registration}/>
                    <Route path="/login" exact component={Login}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
