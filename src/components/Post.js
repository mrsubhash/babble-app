import React, { Component } from 'react'
import WithStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

const styles = theme => (
    {
        card: {
            display: 'flex',
            marginBottom: 20
        },
        image: {
            minWidth: 200
        },
        container: {
            padding: 20,
            objectFit: "cover"
        }
    }
)

class Post extends Component {
    render() {
        //adding plugin to dayjs
        //dayjs light weight alternative to moment
        dayjs.extend(relativeTime)
        const { classes, post: { screamId, userHandle, body,
            createdAt, commentCount, likeCount, userImage } } = this.props
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default WithStyles(styles)(Post)
