import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookie from 'universal-cookie'
import { resetUser } from "./../../redux/1.actions";
import swal from 'sweetalert';

let cookieObj = new Cookie()
class NavbarComp extends Component {
    state = {
        navbarOpen : false
    }

    onBtnLogout = () => {
        cookieObj.remove('userData')
        this.props.resetUser()
        swal('Selamat Bertemu Kembali!', 'Anda telah keluar', 'success')
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Link to="/"><NavbarBrand>Popokpedia</NavbarBrand></Link>
                    <NavbarToggler onClick={() => this.setState({navbarOpen : !this.state.navbarOpen})} />
                    <Collapse navbar>
                        <Nav className="ml-auto" navbar>
                            {
                                this.props.userObj.username !== '' && this.props.userObj.role !== ''
                                ?
                                <>
                                    <NavItem>
                                        {
                                            this.props.userObj.role === 'admin'
                                            ?
                                            <NavLink><Link to='/admindashboard'>Admin Dashboard</Link></NavLink>
                                            :
                                            <NavLink><Link to='/cart'><div>Cart : {this.props.jumlahCart} Barang</div></Link></NavLink>
                                        }
                                    </NavItem>
                                     <NavItem>
                                        <NavLink>Your ID : {this.props.userObj.id ? this.props.userObj.id : null}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>{this.props.userObj.username}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>{this.props.userObj.role}</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Options
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                Edit Profile
                                            </DropdownItem>
                                            <DropdownItem>
                                                {
                                                    this.props.role === 'user'
                                                    ?
                                                    <Link to='/cart'>
                                                    Cart
                                                    </Link>
                                                    :
                                                    null    
                                                }
                                                
                                            </DropdownItem>
                                            <DropdownItem>
                                                {
                                                    this.props.role === 'user'
                                                    ?
                                                    <Link to='/history/'>
                                                    History
                                                    </Link>
                                                    :
                                                    null
                                                }
                                                
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={this.onBtnLogout}>
                                                Logout
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>
                                :
                                <>
                                    <NavItem style={{borderRight : '1px solid lightgrey'}}>
                                        <Link to="/auth"><NavLink>Login</NavLink></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/auth"><NavLink>Register</NavLink></Link>
                                    </NavItem>
                                </>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userObj : state.user,
        jumlahCart : state.cart.cartLength,
        role : state.user.role
    }
}

export default connect(mapStateToProps, {resetUser})(NavbarComp)