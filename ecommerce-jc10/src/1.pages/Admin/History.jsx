import React, { Component } from 'react';
import Axios from 'axios'
import {urlApi} from '../../3.helpers/database'
import {connect} from 'react-redux'
import swal from 'sweetalert'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

class History extends Component {

    state = {
        dataHistory : [],
        dataHistoryDetails : []        
    }

    // componentWillReceiveProps(newProps){
    //     this.getHistory(newProps.id)
    // }

    componentDidMount(){
        this.getHistory()
    }


    getHistory = () => {
        Axios.get(urlApi + 'history?userID=' + this.props.id)
        .then(res => {
            console.log(res.data)
            this.setState({dataHistory : res.data})
        })
        .catch(err => {
            console.log(err)
            // swal('Ups', 'Something is Salah', 'warning')
        })
    }

    renderDetailsHistory = () => {
        let jsx = this.state.dataHistoryDetails.map((val) => {
            return (
                <tr>
                    <td>{val.productName}</td>
                    <td>{val.price}</td>
                    <td>{val.quantity}</td>
                </tr>
            )
        })
        return jsx
    }

    renderHistory = () => {
        let jsx = this.state.dataHistory.map((val, idx) => {
            return (
                <tr>
                    <td>{val.penerima}</td>
                    <td>{val.alamat}</td>
                    <td>{val.time}</td>
                    <td>
                        <input type="button" value="Show Details >>" className="btn btn-link" onClick={() => this.setState({dataHistoryDetails : val.items})}/>
                    </td>
                </tr>
            )
        }) 
        return jsx
    }
    
    render() {
        if(this.props.role === ''){
            return <Redirect to='/'></Redirect>
        }
        return (
            <div className='container'>
                <h1>History</h1>
                {
                    this.state.dataHistory.length > 0
                    ?
                    <div>
                    <table className='table mt-3'>
                    <thead>
                        <tr>
                            <th>Nama Pembeli</th>
                            <th>Alamat</th>
                            <th>Waktu</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderHistory()}
                    </tbody>
                    </table>     
                    <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Nama Barang</th>
                            <th>Harga Barang</th>
                            <th>Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDetailsHistory()} 
                    </tbody>
                </table>
                </div>
                :
                
                <div class="alert alert-danger" role="alert">
                        Your History is Empty
                        <Link to='/'>
                             <a href="#" class="alert-link"> Let's Go Shopping</a>
                        </Link>
                        </div>
                
                }
                   
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id : state.user.id,
        role : state.user.role
    }
} 

export default connect(mapStateToProps)(History);