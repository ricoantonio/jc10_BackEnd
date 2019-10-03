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
                <td>{val.PassengerId}</td>
                <td>{val.Survived}</td>
                <td>{val.Pclass}</td>
                <td>{val.Name}</td>
                <td>{val.Sex}</td>
                <td>{val.Age}</td>
                <td>{val.SibSp}</td>
                <td>{val.Parch}</td>
                <td>{val.Ticket}</td>
                <td>{val.Fare}</td>
                <td>{val.Cabin}</td>
                <td>{val.Embarked}</td>
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
