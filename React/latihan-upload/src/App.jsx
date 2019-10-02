import React, { Component } from 'react'
import axios from 'axios'


const urlApi = 'http://localhost:9500'

export class App extends Component {

  state={
    data:[],
    inputFile:null,
    fileName:'',
    inputPrice:null
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
          <td>{val.id}</td>
          <td>{val.name}</td>
          <td><img src={urlApi+'/'+val.img}  alt="" style={{height:'100px'}} /></td> 
          <td>{val.price}</td> 
        </tr>
      )
    })
    return list
  }

  onSubmit=()=>{
    var fd= new FormData()
    var data={
      name:this.state.fileName,
      price:this.state.inputPrice
    }

    fd.append('aneh', this.state.inputFile, this.state.inputFile.name)
    fd.append('data', JSON.stringify(data))

    axios.post('http://localhost:9500/uploadimage', fd)
    .then((res)=>{
      console.log(res);
      this.getDataApi()
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
                <th style={{width:"30%"}}>File</th>
                <th style={{width:"30%"}}>Price</th>
              </tr>
            </thead>
            <tbody>
              {this.renderData()}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='3'>
                  <input onChange={e=>this.setState({fileName:e.target.value})} type="text" placeholder='Product Name' style={{width:'50%'}} />
                  <input onChange={b=>this.setState({inputPrice:b.target.value})} type="text" placeholder='Product Price' style={{width:'40%',marginLeft:"8%",marginRight:"2%"}} />
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

