import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import { editUserDetails } from '../redux/actions/userActions'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import CustomButton from '../util/CustomButton'

const styles = (theme) => ({ ...theme.extra, button: { float: 'right' } })

class EditDetails extends Component {
    state = {
        bio: '',
        locations: '',
        website: '',
        open: false
    }

    mapUserDataToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDataToState(this.props.credentials)
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            location: this.state.location,
            website: this.state.website,
        }
        this.props.editUserDetails(userDetails)
        this.handleClose()
    }

    componentDidMount () {
        const { credentials } = this.props
        this.mapUserDataToState(credentials)
    }

    render () {
        const { classes } = this.props
        return (
            <Fragment>

                <CustomButton onClick={this.handleOpen}
                    tipTitle="Edit Details"
                    btnClassName={classes.button}>
                    <EditIcon color="primary" />
                </CustomButton>

                <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>Edit User Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                label="Bio"
                                type="text"
                                fullWidth
                                multiline
                                maxRows={3}
                                value={this.state.bio}
                                placeholder="A short bio"
                                onChange={this.handleChange}
                                className={classes.textField}
                            />
                            <TextField
                                name="website"
                                label="Website"
                                type="text"
                                fullWidth
                                value={this.state.website}
                                placeholder="Your website"
                                onChange={this.handleChange}
                                className={classes.textField}
                            />
                            <TextField
                                name="location"
                                label="Location"
                                type="text"
                                fullWidth
                                value={this.state.location}
                                placeholder="Your location"
                                onChange={this.handleChange}
                                className={classes.textField}
                            />
                        </form>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">Cancel</Button>
                            <Button onClick={this.handleSubmit} color="primary">Save Details</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

const mapActionToProps = {
    editUserDetails
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(EditDetails))
