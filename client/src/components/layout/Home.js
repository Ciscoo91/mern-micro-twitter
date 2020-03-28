import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">This is a simple Website where you can post messages, make friends, see what people say on the hashtag #myHashtag. See this application like a mini-twitter</p>
            <hr className="my-4" />
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <Link className="btn btn-primary btn-lg" to="/login" role="button">Sign in</Link>
        </div>
    );
}

export default Home;