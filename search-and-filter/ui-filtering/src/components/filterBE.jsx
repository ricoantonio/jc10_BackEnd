import React, { Component } from 'react'
import axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const urlApi = 'http://localhost:8080'


export class filterBE extends Component {

    state={
        data:[],
        selectSex:0,
        selectClass:0,
        selectSurvived:0,
        inputName:'',
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
                <td style={{paddingTop:0,paddingBottom:0}}>{val.Pclass == 1 ? 'Executive': val.Pclass == 2 ? 'Business' : 'Economy'}</td>
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

    onSelectClass=(x)=>{
        this.setState({selectClass:x})
    }
    onSelectSex=(x)=>{
        this.setState({selectSex:x})
    }
    onSelectSurvived=(x)=>{
        this.setState({selectSurvived:x})
    }



    render() {
        return (
            <div className="container">
                <h5>Filter</h5>
                <div>
                    <input onChange={e=>this.setState({inputName:e.target.value})} className="inline" type="text" placeholder='Name' style={{width:"50%"}}/>
                    <input className="inline" type="text" placeholder='Min-Age' style={{width:"10%", marginLeft:"4%"}}/>  - <input className="inline" type="text" placeholder='Max-Age' style={{width:"10%",marginLeft:"1%"}}/>
                    <FormControl variant="outlined" style={{width:"19%", marginLeft:'4%'}}>
                        <Select
                        onChange={val=>this.onSelectSex(val.target.value)} 
                        value={this.state.selectSex}
                        >
                            <MenuItem value={0}>All Gender</MenuItem>
                            <MenuItem value={1}>Male</MenuItem>
                            <MenuItem value={2}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl variant="outlined" style={{width:"30%"}}>
                        <Select
                        onChange={val=>this.onSelectClass(val.target.value)} 
                        value={this.state.selectClass}
                        >
                            <MenuItem value={0}>All Class</MenuItem>
                            <MenuItem value={1}>Executive</MenuItem>
                            <MenuItem value={2}>Business</MenuItem>
                            <MenuItem value={3}>Economy</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" style={{width:"30%", marginLeft:"5%"}}>
                        <Select
                        onChange={val=>this.onSelectSurvived(val.target.value)} 
                        value={this.state.selectSurvived}
                        >
                            <MenuItem value={0}>All Status</MenuItem>
                            <MenuItem value={1}>Alive</MenuItem>
                            <MenuItem value={2}>Deceased</MenuItem>
                        </Select>
                    </FormControl>
                    <button className="btn blue" style={{marginLeft:"5%",width:"30%",marginTop:"1%"}}>SEARCH</button>
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
