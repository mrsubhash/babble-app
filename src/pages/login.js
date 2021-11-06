import React, { Component } from 'react'
import WithStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid/Grid'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = ({ extra }) => ({ ...extra })

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: "",

            errors: {}
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.ui.errors) {
            this.setState({
                errors: nextProps.ui.errors
            })
        }

    }

    handleOnSubmit = (event) => {
        event.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData, this.props.history)

    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render () {
        const { classes, ui: { loading } } = this.props
        const { errors } = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <img src={AppIcon} alt="app icon" className={classes.image} />
                    <Typography variant="h2">Login</Typography>
                    <form noValidate onSubmit={this.handleOnSubmit}>
                        <TextField name="email"
                            type="email"
                            id="email"
                            label="Email"
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            onChange={this.handleOnChange}
                            value={this.state.email}
                            className={classes.textField} fullWidth />
                        <TextField name="password"
                            type="password"
                            id="password"
                            label="Password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={this.handleOnChange}
                            value={this.state.password}
                            className={classes.textField} fullWidth />
                        {
                            errors.general &&
                            (<Typography variant="body2" className={classes.customError}>{errors.general}</Typography>)
                        }
                        <Button type="submit"
                            color="primary" variant="contained"
                            disabled={loading}
                            className={classes.button}>
                            Login
                            {
                                loading &&
                                <CircularProgress size={30} className={classes.progress} />
                            }

                        </Button>
                        <br />
                        <small>Don't have an account? <Link to="/signup">Signup</Link></small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(WithStyles(styles)(Login))
