import React, { Component } from 'react'
import axios from 'axios'


const urlApi = 'http://localhost:9500'

export class App extends Component {

  state={
    data:[],
    inputFile:null,
    fileName:''
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
          <td>{index+1}</td>
          <td>{val.name}</td>
          <td>{val.img}</td>
        </tr>
      )
    })
    return list
  }

  onSubmit=()=>{
    var fd= new FormData()
    fd.append('aneh', this.state.inputFile, this.state.inputFile.name)

    axios.post('http://localhost:9500/uploadimage', fd)
    .then((res)=>{
      axios.post(urlApi+'/adddata',{
        name:`${this.state.fileName}`,
        img:``
      }).then((res)=>{
        this.getDataApi()
        console.log(res);
        
      }).catch((err)=>{
        console.log(err);
        alert('Cannot Add Data')
      })
      console.log(res);
      
    }).catch((err)=>{
      console.log(err);
      
    })

  }



  render() {
    return (
      <div className="container">
          <table className="table centered">
            <thead>
              <tr className="center-align">
                <th style={{width:"10%"}}>No.</th>
                <th style={{width:"30"}}>Name</th>
                <th style={{width:"50%"}}>File</th>
              </tr>
            </thead>
            <tbody>
              {this.renderData()}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='2'>
                  <input onChange={e=>this.setState({fileName:e.target.value})} type="text"/>
                </td>
                <td>
                  <div className="inline center">
                    <input type="file" onChange={e=>this.setState({inputFile:e.target.files[0]})} ref='fileBtn' hidden/>
                    <input type="button" onClick={()=>this.refs.fileBtn.click()} value='Select a file' className='btn blue'style={{width:"50%"}} />
                    <button className='btn green inline' onClick={this.onSubmit} style={{width:"50%"}}>Submit</button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
          <table>

          </table>
        </div>
    )
  }
}

export default App

