import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post.js';

export class Home extends Component {
    constructor() {
        super()
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get("/screams")
            .then(res => {
                this.setState({ posts: res.data })
            })
            .catch(err => console.log(err))
    }

    render() {
        const postsMarkup = this.state.posts ? (
            this.state.posts.map(post => <Post key={post.screamId} post={post} />)
        ) : (<p>Loading...</p>);

        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {postsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile</p>
                </Grid>
            </Grid>
        )
    }
}

export default Home
