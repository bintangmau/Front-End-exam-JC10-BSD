import React, {Component} from 'react';
import {withRouter, Route, Switch} from 'react-router-dom'
import Home from './1.pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComp from './1.pages/Navbar/Navbar';
import Auth from './1.pages/Auth/Auth';
import Cookie from 'universal-cookie'
import {connect} from 'react-redux'
import {keepLogin} from './redux/1.actions'
import ProductDetails from './1.pages/ProductDetails/ProductDetails';
import Cart from './1.pages/Cart/Cart';
import AdminDashboard from './1.pages/Admin/AdminDashboard';
import History from './1.pages/Admin/History'
import HistoryDetails from './1.pages/Admin/HistoryDetails';
import ParaSultan from './1.pages/Admin/ParaSultan'
import Analitycs from './1.pages/Admin/Analitycs'

let cookieObj = new Cookie()
class App extends Component {

  componentDidMount(){
    let cookieVar = cookieObj.get('userData')
    if(cookieVar){
      this.props.keepLogin(cookieVar)
    }
  }

  render(){
    return (
      <div>
        <NavbarComp/>
        <Switch>
          <Route component={Home} path='/' exact />
          <Route component={Auth} path='/auth' exact />
          <Route component={ProductDetails} path='/product-details/:id' exact />
          <Route component={Cart} path='/cart' exact />
          <Route component={AdminDashboard} path='/admindashboard' exact />
          <Route component={History} path='/history'/>
          <Route component={HistoryDetails} path='/historydetails/:id' exact />
          <Route component={Analitycs} path='/analitycs' exact/>
          <Route component={ParaSultan} path='/parasultan' exact/>

        </Switch>
      </div>
    )
  }
}

export default connect(null, {keepLogin})(withRouter(App))
