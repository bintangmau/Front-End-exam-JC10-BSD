import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import { urlApi } from '../../3.helpers/database';
import swal from 'sweetalert'


class Analitycs extends Component {
    state = {
        dataAwal : []
    }

    componentDidMount(){
        this.getDataTotal()
    }

    getDataTotal = () => {
        Axios.get(urlApi + 'history')
        .then(res =>{
            this.setState({dataAwal : res.data})
        })
        .catch(err => {
            swal ('upz','Data ga Masuk','warning')
        })
    }

    renderTotal = () => {
        var total = 0
        this.state.dataAwal.map(val => {
            total += val.totalPrice
        })
        return total
    }

    renderTransaksi = () => {
        var transaksi = this.state.dataAwal.length
        return transaksi
    } 
    
    render() {
        return (
            <div>
                <Link to='/admindashboard'>
                    <h3>Back To Manage Product</h3>
                </Link>                    
                <h3>Total Pendapatan : {this.renderTotal()}</h3>
                <h5>Pendapatan dihitung dari {this.renderTransaksi()} transaksi yang berhasil</h5>
            </div>
        );
    }
}

export default Analitycs;