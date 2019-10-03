import React, { Component } from 'react'
import axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Survived ? 'Alive' : 'Deceased'}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Pclass == 1 ? 'Executive': val.Pclass == 2 ? 'Business' : 'Executive'}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Name}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Sex == 'male' ? 'M' : 'F'}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Age}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.SibSp}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Parch}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Ticket}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Fare}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Cabin}</td>
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Embarked}</td>3
              </tr>
            )
          })
        return list
    }

    render() {
        return (
            <div className="container">
                <h5>Filter</h5>
                <div>
                    <input className="inline" type="text" placeholder='Name' style={{width:"50%"}}/>
                    <input className="inline" type="text" placeholder='Min-Age' style={{width:"10%", marginLeft:"4%"}}/>  - <input className="inline" type="text" placeholder='Max-Age' style={{width:"10%",marginLeft:"1%"}}/>
                    <FormControl variant="outlined" style={{width:"19%", marginLeft:'4%'}}>
                        <Select
                        onChange={val=>this.onSelectChange(val.target.value)} 
                        value={this.state.selectInput}
                        >
                        <MenuItem value={2}>All</MenuItem>
                        <MenuItem value={1}>Done</MenuItem>
                        <MenuItem value={0}>Pending</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                <FormControl variant="outlined" style={{width:"30%"}}>
                    <Select
                    onChange={val=>this.onSelectChange(val.target.value)} 
                    value={this.state.selectInput}
                    >
                      <MenuItem value={2}>All</MenuItem>
                      <MenuItem value={1}>Done</MenuItem>
                      <MenuItem value={0}>Pending</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" style={{width:"30%", marginLeft:"5%"}}>
                    <Select
                    onChange={val=>this.onSelectChange(val.target.value)} 
                    value={this.state.selectInput}
                    >
                      <MenuItem value={2}>All</MenuItem>
                      <MenuItem value={1}>Done</MenuItem>
                      <MenuItem value={0}>Pending</MenuItem>
                    </Select>
                </FormControl>
                <button className="btn" style={{marginLeft:"5%",width:"30%",marginTop:"1%"}}>SEARCH</button>
                
                </div>

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
