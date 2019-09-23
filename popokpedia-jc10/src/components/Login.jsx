// rce
import React, { Component } from 'react'
import axios from 'axios'

const URL_API='http://localhost:9000'


class Login extends Component {
    state={
        inputUsername:null,
        inputPassword:null,
        user:null,
        err:false,
        errUsername:false,
        errPassword:false,
        data:null
    }

    onBtnLogin=()=>{

        this.setState({errUsername:false})
        this.setState({errPassword:false})

        axios.get(URL_API+'/auth/checkuser',{
            params:{
                username:this.state.inputUsername
            }
        }).then((res)=>{
            if(!res.data.length){
                this.setState({errUsername:true})
                this.renderLogin()

            }else{
                axios.get(URL_API+'/auth/login',{
                    params:{
                        username:this.state.inputUsername,
                        password:this.state.inputPassword
                    }
                }).then((res)=>{
                    if(!res.data.length){
                        this.setState({errPassword:true})
                        this.renderLogin()

                    }else{
                        this.setState({err:false})
                        this.setState({user:res.data[0].username});
                        this.renderLogin()
                    }
                }).catch((err)=>{
                })
            }
        }).catch((err)=>{
        })
    }

    onBtnLogOut=()=>{
        this.setState({user:null})
        this.setState({inputUsername:null})
        this.setState({inputPassword:null})
        this.renderLogin()
    }

    renderLogin=()=>{

        if(this.state.errUsername){
            return(
                <div className="container" style={{marginTop:"3%"}}>
                    <div className="row">
                        <h5 className="center-align red-text">WRONG USERNAME OR PASSWORD</h5>
                    </div>
                    <h1 className="center">Login</h1>
                    <div className="row">
                        <div className="col s4 offset-s4">
                            <input onChange={e=>this.setState({inputUsername:e.target.value})} type="text" placeholder="Username" className="form-control"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s4 offset-s4">
                            <input onChange={e=>this.setState({inputPassword:e.target.value})} type="password" placeholder="Password" className="form-control"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s2 offset-s5">
                            <button onClick={this.onBtnLogin} className="waves-effect waves-light btn white-text blue" style={{width:"100%"}} >Login</button>
                            {/* <input type="button" value="Login" className="waves-effect waves-light btn white-text" style={{width:"100%"}} /> */}
                        </div>
                    </div>
                </div>
            ) 
        }
        if(this.state.errPassword){
            return(
                <div className="container" style={{marginTop:"3%"}}>
                    <div className="row">
                        <h5 className="center-align red-text">WRONG PASSWORD</h5>
                    </div>
                    <h1 className="center">Login</h1>
                    <div className="row">
                        <div className="col s4 offset-s4">
                            <input onChange={e=>this.setState({inputUsername:e.target.value})} type="text" placeholder="Username" className="form-control"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s4 offset-s4">
                            <input onChange={e=>this.setState({inputPassword:e.target.value})} type="password" placeholder="Password" className="form-control"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s2 offset-s5">
                            <button onClick={this.onBtnLogin} className="waves-effect waves-light btn white-text blue" style={{width:"100%"}} >Login</button>
                            {/* <input type="button" value="Login" className="waves-effect waves-light btn white-text" style={{width:"100%"}} /> */}
                        </div>
                    </div>
                </div>
            ) 
        }

        if(this.state.user){
            return(
                <div className="container" style={{marginTop:"3%"}}>
                    <div className="row">
                        <h1 className="center-align green-text">Welcome {this.state.user}</h1>
                    </div>
                    <div className="row">
                        <div className="col s2 offset-s5">
                            <button onClick={this.onBtnLogOut} className="waves-effect waves-light btn white-text blue" style={{width:"100%"}} >Logout</button>
                            {/* <input type="button" value="Login" className="waves-effect waves-light btn white-text" style={{width:"100%"}} /> */}
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="container" style={{marginTop:"3%"}}>
                    <h1 className="center">Login</h1>
                    <div className="row">
                        <div className="col s4 offset-s4">
                            <input onChange={e=>this.setState({inputUsername:e.target.value})} type="text" placeholder="Username" className="form-control"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s4 offset-s4">
                            <input onChange={e=>this.setState({inputPassword:e.target.value})} type="password" placeholder="Password" className="form-control"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s2 offset-s5">
                            <button onClick={this.onBtnLogin} className="waves-effect waves-light btn white-text blue" style={{width:"100%"}} >Login</button>
                            {/* <input type="button" value="Login" className="waves-effect waves-light btn white-text" style={{width:"100%"}} /> */}
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            this.renderLogin()
        )
    }
}

export default Login