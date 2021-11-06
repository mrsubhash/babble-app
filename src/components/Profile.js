import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import dayjs from 'dayjs'

const styles = (theme) => ({
    ...theme.extra
})

class Profile extends Component {
    render () {
        const { classes, user: {
            credentials: { handle,
                createdAt, imageUrl, bio, website, location }, loading, authenticated } } = this.props

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image" />
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`users/${handle}`}
                            color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        {location &&
                            <Fragment>
                                <LocationOnIcon color="primary" /> <span>{location}</span>
                                <hr />
                            </Fragment>
                        }
                        {website &&
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {" "}{website}
                                </a>
                                <hr />
                            </Fragment>
                        }
                        <CalendarTodayIcon color="primary" />{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography align="center" variant="body2">
                    No Profile found, Please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary"
                        component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary"
                        component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : (<p>loading...</p>)

        return profileMarkup
    }
}

Profile.propsTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps)(withStyles(styles)(Profile))
