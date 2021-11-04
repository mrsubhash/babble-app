import React, { Component } from 'react'
import WithStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid/Grid'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link } from 'react-router-dom'

const styles = ({ extra }) => ({ ...extra })

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            loading: false,
            errors: {}
        }
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then(res => {
                console.log("response data", res.data)
                localStorage.setItem("babbleToken", `Bearer ${res.data.token}`)
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    errors: err.response.data
                })
            })
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props
        const { errors, loading } = this.state
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
    classes: PropTypes.object.isRequired
}

export default WithStyles(styles)(Login)
