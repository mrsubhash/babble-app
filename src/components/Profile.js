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
import EditIcon from '@material-ui/icons/Edit'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import dayjs from 'dayjs'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { logoutUser, uploadImage } from '../redux/actions/userActions'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import EditDetails from "./EditDetails"
import CustomButton from '../util/CustomButton'

const styles = (theme) => ({
    ...theme.extra
})

class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)
    }

    handleImageEdit = () => {
        const fileInput = document.getElementById("imageInput")
        fileInput.click()
    }

    handleLogout = () => {
        this.props.logoutUser()
    }

    render () {
        const { classes, user: {
            credentials: { handle,
                createdAt, imageUrl, bio, website, location }, loading, authenticated } } = this.props

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image" />
                        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />

                        <CustomButton onClick={this.handleImageEdit}
                            tipTitle="Edit Image">
                            <EditIcon color="primary" />
                        </CustomButton>

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

                    <CustomButton onClick={this.handleLogout}
                        tipTitle="Logout">
                        <KeyboardReturn color="primary" />
                    </CustomButton>
                    <EditDetails />
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
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ user: state.user })

const mapActionToProps = { logoutUser, uploadImage }

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Profile))
