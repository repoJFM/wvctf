import React, { Component } from 'react';
import Products from './components/products';
import Product from './components/product';
import Contact from './components/contact';
import User from './components/user';
import Index from './components/index';
import {Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { FiHelpCircle } from "react-icons/fi";
import { MdSettingsApplications } from "react-icons/md";
import campus from './img/logo_campus.png';
import ucam from './img/logo_ucam.png';
import telefonica from './img/logo_telefonica.png';
import elevenpaths from './img/logo_elevenpaths.png';
import excellence from './img/logo_excellenceInnova.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Orders from './components/orders';
import Sales from './components/sales';
import MySales from './components/mysales';
import PrivateRouter from './components/util/private-route';
import Manage from './components/manage';
import Login from './components/login';
import Help from './components/help';

class App extends Component {

  state = {
    authenticated: false,
    authToken:'',
    csrf:false,
  }

  constructor(props){
    super(props);
    this.handlerLogin = this.handlerLogin.bind(this)
    this.handlerLogout = this.handlerLogout.bind(this)
    this.setCSRF = this.setCSRF.bind(this)
  }

  componentWillMount () {
    const state = localStorage.getItem('state');
    this.setState(JSON.parse(state));
  }

  componentDidMount(){

  }

  handlerLogin(cred) {
      this.setState({
          authenticated: true,
          authToken:'Basic ' + btoa(cred),
          csrf:false,
      });
      localStorage.setItem('state', JSON.stringify(this.state));
  }
  handlerLogout() {
    this.setState({
        authenticated: false,
        authToken:'',
        csrf:false,
    });
    localStorage.removeItem('state');
  }

  isAuth(){
    return this.state.authenticated;
  }

  getAuthToken(){
    return this.state.authToken;
  }

  setCSRF(){
    debugger;
    this.setState({...this.state, csrf:true})
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  isCSRF(){
    return this.state.csrf;
  }


  render () {
    return(
      <div className="main">
        {/* <Container> */}
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/app">Vulnerable app</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              <Nav.Link href="/"><MdSettingsApplications/> Manage flags</Nav.Link>
              <Nav.Link href="/help"><FiHelpCircle/> Manual and help</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
          <BrowserRouter>
            <Switch>
            <Route
                exact
                path="/login"
                component={(history) => <Login 
                  getAuthToken={()=>this.getAuthToken()} 
                  isAuth={()=>this.isAuth()} 
                  handlerLogin={(cred)=>this.handlerLogin(cred)} 
                  context={history}/>} 
                />
            <PrivateRouter 
                authenticated={this.state.authenticated}
                exact
                path="/"
                component={(history) => <Manage 
                  getAuthToken={()=>this.getAuthToken()} 
                  isAuth={()=>this.isAuth()} 
                  handlerLogout={()=>this.handlerLogout()} 
                  context={history}/>} 
                />
            <PrivateRouter 
                authenticated={this.state.authenticated}
                exact
                path="/app"
                component={(history) => <Index getAuthToken={()=>this.getAuthToken()} context={history}/>}/>
            <PrivateRouter 
                authenticated={this.state.authenticated}
                exact
                path="/app/products/:id"
                component={(history) => <Product getAuthToken={()=>this.getAuthToken()} setCSRF={() => this.setCSRF()} context={history}/>}/>
            <PrivateRouter 
                authenticated={this.state.authenticated}
                exact
                path="/app/products"
                component={(history) => <Products getAuthToken={()=>this.getAuthToken()} context={history}/>}/>
            <PrivateRouter 
                authenticated={this.state.authenticated}
                exact
                path="/app/orders"
                component={(history) => <Orders getAuthToken={()=>this.getAuthToken()} context={history}/>}/>
            <PrivateRouter 
                authenticated={this.state.authenticated}
                exact
                path="/app/sales"
                component={(history) => <Sales getAuthToken={()=>this.getAuthToken()} context={history}/>}/>
            <PrivateRouter 
                authenticated={this.state.authenticated}
                exact
                path="/app/mysales"
                component={(history) => <MySales getAuthToken={()=>this.getAuthToken()} isCSRF={() => this.isCSRF()} context={history}/>}/>
            <PrivateRouter
                authenticated={this.state.authenticated}
                exact
                path="/app/contact"
                component={(history) => <Contact getAuthToken={()=>this.getAuthToken()} context={history}/>}/>
            <PrivateRouter 
                authenticated={this.state.authenticated}
                exact
                path="/app/user"
                component={(history) => <User getAuthToken={()=>this.getAuthToken()} context={history}/>}/>
            <Route
                exact
                path="/help"
                component={(history) => <Help 
                  context={history}/>} 
                />
            <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
          </BrowserRouter>
          <Navbar className="footer" expand="lg" bg="dark" variant="dark">
            <div className="row">
              <div className="column">
                <img className="footer_img" src={campus} alt="Logo Campus Ciberseguridad"/>
              </div>
              <div className="column">
                <img className="footer_img" src={ucam} alt="UCAM"/>
              </div>
              <div className="column">
                <img className="footer_img" src={telefonica} alt="Telefónica"/>
              </div>
              <div className="column">
                <img className="footer_img" src={elevenpaths} alt="ElevenPaths"/>
              </div>
              <div className="column">
                <img className="footer_img" src={excellence} alt="Excellence Innova"/>
              </div>
            </div> 
          </Navbar>
        {/* </Container> */}
      </div>
    )
  }
}

export default App;
