import React, { Component } from 'react'
import axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import querystring from 'querystring'

const urlApi = 'http://localhost:8080'


export class filterBE extends Component {

    state={
        data:[],
        name:'',
        agemin:null,
        agemax:null,
        pclass:0,
        gender:'All',
        survived:2,
        pClassOpt:[]
    }

    componentDidMount() {
        this.getDataApi()
        this.getDataPClass()
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

    getDataPClass=()=>{
        axios.get(urlApi+'/getpclass')
        .then((res)=>{
            this.setState({pClassOpt:res.data})
        }).catch((err)=>{
            console.log(err);
            alert('System Error')
        })
    }

    renderPClass=()=>{
        let list=this.state.pClassOpt.map(val=>{
            return(
                <MenuItem value={val.pclass}>{val.pclass}</MenuItem>
            )
        })
        return list
    }

    onBtnSearch=()=>{
        let filterData={}
        let {name,agemax,agemin,gender,survived,pclass} = this.state
        

        if(name){
            filterData={...filterData,name}
        }
        if(agemax&&agemin){
            filterData={...filterData,agemin,agemax}

        }
        if(gender=='Male' || gender =='Female'){
            filterData={...filterData,gender}

        }
        if(survived<2){
            filterData={...filterData,survived}

        }
        if(pclass!=0){
            filterData={...filterData,pclass}

        }

        this.pushUrl()

        axios.get(urlApi+'/getdata',{
            params: filterData

        })
            .then((res)=>{
                this.setState({data:res.data})
            }).catch((err)=>{
                console.log(err);
                alert('System Error')
        })
    }

    
    pushUrl=()=>{
        let filterData={}
        let {name,agemax,agemin,gender,survived,pclass} = this.state
        

        if(name){
            filterData={...filterData,name}
        }
        if(agemax&&agemin){
            filterData={...filterData,agemin,agemax}

        }
        if(gender=='Male' || gender =='Female'){
            filterData={...filterData,gender}

        }
        if(survived<2){
            filterData={...filterData,survived}

        }
        if(pclass!=0){
            filterData={...filterData,pclass}

        }

        this.props.history.push(`/search?`+querystring.stringify(filterData))
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
        this.setState({pclass:x})
    }
    onSelectSex=(x)=>{
        this.setState({gender:x})
    }
    onSelectSurvived=(x)=>{
        this.setState({survived:x})
    }
    

    render() {
        return (
            <div className="container">
                <h5>Filter</h5>
                <div>
                    <input onChange={e=>this.setState({name:e.target.value})} className="inline" type="text" placeholder='Name' style={{width:"50%"}}/>
                    <input  onChange={a=>this.setState({agemin:a.target.value})}  className="inline" type="number" placeholder='Min-Age' style={{width:"10%", marginLeft:"3%",marginRight:'1%'}}/>  - 
                    <input  onChange={a=>this.setState({agemax:a.target.value})}  className="inline" type="number" placeholder='Max-Age' style={{width:"10%",marginLeft:"1%"}}/>
                    <FormControl variant="outlined" style={{width:"19%", marginLeft:'4%'}}>
                        <Select
                        onChange={val=>this.onSelectSex(val.target.value)} 
                        value={this.state.gender}
                        >
                            <MenuItem value={'All'}>All Gender</MenuItem>
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl variant="outlined" style={{width:"30%"}}>
                        <Select
                        onChange={val=>this.onSelectClass(val.target.value)} 
                        value={this.state.pclass}
                        >
                            <MenuItem value={0}>All Class</MenuItem>
                            {this.renderPClass()}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" style={{width:"30%", marginLeft:"5%"}}>
                        <Select
                        onChange={val=>this.onSelectSurvived(val.target.value)} 
                        value={this.state.survived}
                        >
                            <MenuItem value={2}>All Status</MenuItem>
                            <MenuItem value={1}>Alive</MenuItem>
                            <MenuItem value={0}>Deceased</MenuItem>
                        </Select>
                    </FormControl>
                    <button onClick={this.onBtnSearch}  className="btn blue" style={{marginLeft:"5%",width:"30%",marginTop:"1%"}}>SEARCH</button>
                </div>
                    <hr/>
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
