import React, { Component } from 'react'
import axios from 'axios'


const urlApi = 'http://localhost:8080'


export class filterBE extends Component {

    state={
        data:[]
    }

    componentDidMount() {
        this.getDataApi()
    }
      
    getDataApi=()=>{
        axios.get(urlApi+'/getdata')
        .then((res)=>{
        this.setState({data:res.data})
        }).catch((err)=>{
        console.log(err);
        alert('System Error')
        })
    }

    renderData=()=>{
        let list=this.state.data.map((val,index)=>{
            return(
              <tr>
                <td style={{paddingTop:0,paddingBottom:0}}>{index+1}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.PassengerId}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Survived}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Pclass}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Name}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Sex}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Age}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.SibSp}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Parch}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Ticket}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Fare}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Cabin}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Embarked}</td>
              </tr>
            )
          })
        return list
    }

    render() {
        return (
            <div className="container">
                <table className="centered striped"  style={{fontSize:10}}>
                    <thead>
                       <tr>
                            <th>No.</th>
                            <th>Id</th>
                            <th>Survived</th>
                            <th>Pclass</th>
                            <th>Name</th>
                            <th>Sex</th>
                            <th>Age</th>
                            <th>SibSp</th>
                            <th>Parch</th>
                            <th>Ticket</th>
                            <th>Fare</th>
                            <th>Cabin</th>
                            <th>Embarked</th>
                       </tr>
                    </thead>
                    <tbody>
                        {this.renderData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default filterBE
