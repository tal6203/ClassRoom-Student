import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import SearchBar from './SearchBar';
import BackButton from './BackButton';




class Navbar extends Component {
    componentDidMount() {
        const sidenav = document.querySelector('.sidenav');
        window.M.Sidenav.init(sidenav, {});
    }

    closeSidebar = () => {
        const sidenav = document.querySelector('.sidenav');
        const instance = window.M.Sidenav.getInstance(sidenav);
        instance.close();
    }
    render() {
        return (
            <nav className="nav-wrapper blue darken-4">
                <ul className="left hide-on-med-and-down">
                    <li><BackButton /></li>
                    <li><SearchBar /></li>
                </ul>
                <NavLink className="brand-logo center" to='/'>
                    <span className="brand-logo-text" style={{textDecoration:'underline'}}>My School</span>
                </NavLink>
                <ul className="right hide-on-med-and-down">
                    <li><NavLink to="/">Classes</NavLink></li>
                    <li><NavLink to="/createClass">Create Class</NavLink></li>
                    <li><NavLink to="/createStudent">Create Student</NavLink></li>
                    <li><NavLink to="/about">About Us</NavLink></li>
                </ul>
                <ul id="nav-mobile" className="sidenav">
                    <li><NavLink to="/">Classes</NavLink></li>
                    <li><NavLink to="/createClass">Create Class</NavLink></li>
                    <li><NavLink to="/createStudent">Create Student</NavLink></li>
                    <li><NavLink to="/about">About Us</NavLink></li>
                    <li style={{ flexDirection: 'column' }}><SearchBar /></li>
                    <li style={{marginLeft:'80px'}}><BackButton /></li>
                    <li><a href="#!" onClick={this.closeSidebar}>Close</a></li>
                </ul>
                <NavLink to="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></NavLink>
            </nav>
        )
    }
}

export default withRouter(Navbar)