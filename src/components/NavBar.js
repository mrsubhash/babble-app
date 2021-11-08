import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import CustomButton from '../util/CustomButton';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';

export class NavBar extends Component {
    render () {
        const { authenticated } = this.props

        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {
                        authenticated ?
                            (<Fragment>
                                <CustomButton tipTitle="Add">
                                    <AddIcon color="primary" />
                                </CustomButton>
                                <Link to="/">
                                    <CustomButton tipTitle="Home">
                                        <HomeIcon color="primary" />
                                    </CustomButton>
                                </Link>
                                <CustomButton tipTitle="Notifications">
                                    <NotificationsIcon color="primary" />
                                </CustomButton>
                            </Fragment>)
                            :
                            (<Fragment>

                                <Button color="inherit" component={Link} to="/">Home</Button>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">Signup</Button>

                            </Fragment>)
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(NavBar)
