import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {urlApi} from '../../3.helpers/database'
import swal from 'sweetalert'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom'
import { getCartData } from '../../redux/1.actions/userActions';
import {Redirect} from 'react-router-dom'


class Cart extends Component {
    state = {
        cartData : [],
        totalHarga : 0,
        checkoutMode : false,
        uangMasuk : 0,
        namaMasuk : '',
        alamatMasuk : '',
        kodeposMasuk : ''
    }

    componentWillMount(){
        this.onBtnEdit()
    }

    componentWillReceiveProps(newProps){
        this.getDataCart(newProps.id)
    }

    componentDidMount(){
        this.getDataCart(this.props.id)
        this.props.getCartData(this.props.id)
    }

    componentDidUpdate(){
        this.props.getCartData(this.props.id)
    }

    getDataCart = (id) => {
        Axios.get(urlApi + 'cart?userId=' + id)
        .then(res => {
            console.log(res)
              this.setState({cartData : res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    deleteCart = (id) => {
        Axios.delete(urlApi + 'cart/' + id) //utk menghapus..id sesuai parameter
        .then((res) => {
            swal('Yeah', 'Delete Success', 'success')
            this.getDataCart(this.props.id)
        })
        .catch((err) => {
            swal('Sory', 'Delete gagal', 'warning')
        })
    }

    renderCart = () => {
        var jsx = this.state.cartData.map((val,idx) => {
            return (
                
                <tr>
                    <td>{val.productName}</td>
                    <td>{val.price - (val.price * (val.discount/100))}</td>
                    <td><div className="btn-group">
                        <button type="button" className="btn btn-secondary" onClick={() => this.onBtnEdit('min', idx)}>-</button>
                        <button type="button" className="btn btn-secondary">{val.quantity}</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.onBtnEdit('add', idx)}>+</button>
                    </div></td>
                    <td>{(val.price - (val.price * (val.discount/100))) * val.quantity}</td>
                    <td><input type="button" value='DELETE' className='btn btn-danger' onClick={() => {this.deleteCart(val.id)}}/></td>
                </tr>
            )
        })

        return jsx
    }

    onBtnEdit =(action, idx) => {
        let arrCart = this.state.cartData

        if(action == 'min'){
            if(arrCart[idx].quantity > 1){
              arrCart[idx].quantity -= 1
              Axios.put(urlApi + 'cart/' + arrCart[idx].id, arrCart[idx])
              .then(res => this.getDataCart(this.props.id))
              .catch(err => console.log(err))
            }
        } else if(action == 'add'){
            arrCart[idx].quantity += 1
                Axios.put(urlApi + 'cart/' + arrCart[idx].id, arrCart[idx])
                .then(res => this.getDataCart(this.props.id))
                .catch(err => console.log(err))
        }
    }

    renderTotal = () => {
        var total = 0
        this.state.cartData.map(val => {            
                total += (val.price - (val.price * (val.discount/100))) * val.quantity
        })
        return total
    }

    totalItem = () => { 
        var total = 0
        this.state.cartData.map(val => {
            total += (val.quantity)
        })
        return total
    }
    checkOut = () => {
        let totalPrice = this.renderTotal() //utk mengambil value total harga
        let d = new Date() //utk mengambil tanggal hari ini
        let today = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}` //waktu hari ini
        let items = this.state.cartData
        let newData = { // yang dipost ke table ke history
            userID : this.props.id,  //id nya user
            items,            // berisi data cart kita
            time : today,
            totalPrice,
            penerima : this.state.namaMasuk,
            kodePos : this.state.kodeposMasuk,
            alamat : this.state.alamatMasuk
        }

        if(totalPrice > this.state.uangMasuk){
            swal('Uang mu kurang','Mungkin ketinggalan di alfamart','warning')
        } else if(this.state.uangMasuk > totalPrice){
            swal('Transaksi Sukses', 'Kembalian anda ' + (this.state.uangMasuk - totalPrice), 'success')
            Axios.post(urlApi + 'history', newData)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

            for(var i = 0; i < this.state.cartData.length; i++){
                Axios.delete(urlApi + 'cart/' + this.state.cartData[i].id)
                .then(res => {
                    console.log(res)
                    this.getDataCart()
                })
                .catch(err => {
                    console.log(err)
                })
            }

        } else {
            swal('Transaksi Berhasil', 'Uang Anda pas bro', 'success')
            Axios.post(urlApi + 'history', newData)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

            for(var i = 0; i < this.state.cartData.length; i++){
                Axios.delete(urlApi + 'cart/' + this.state.cartData[i].id)
                .then(res => {
                    console.log(res)
                    this.getDataCart()
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }

    render() {
        if(this.props.role === ''){
            return <Redirect to='/'></Redirect>
        }
        return (
            <div className="container">
                <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {this.renderCart()}
                </tbody>
               <tfoot>
                   {
                       this.state.cartData.length > 0
                       ?
                       <>
                       <h3>Total Harga : {this.renderTotal()}</h3>
                       <h3>Total Item : {this.totalItem()}</h3>
                       </>
                       :
                       null
                   }
               
               </tfoot>
               </table>
                <div>
                    {
                        this.state.cartData.length > 0
                        ?
                        <div className='row'>
                            <div className='col-6'>
                                <Link to='/'>
                                    <input type="button" value="Belanja Lagi" className='btn btn-success btn-block'/>
                                </Link>
                            </div>
                            <div className='col-6'>
                                <input type="button" value="Check Out" onClick={() => this.setState({checkoutMode : true})} className='btn btn-danger btn-block '/>
                            </div>  
                        </div>
                        :
                        <>
                        <div class="alert alert-danger" role="alert">
                        Your Cart is Empty
                        <Link to='/'>
                             <a href="#" class="alert-link"> Let's Go Shopping</a>
                        </Link>
                        </div>
                        </>
                    }
                   
                </div>
                {
                    this.state.checkoutMode
                    ?
                    <Modal isOpen={this.state.checkoutMode}>
                    <ModalHeader toggle={() => this.setState({checkoutMode : false})}>
                        Pembayaran
                    </ModalHeader>
                    <ModalBody>
                        <h2>Total Harga : {this.renderTotal()}</h2>
                        <div>
                            <input type="number" placeholder='Masukkan uang Anda..' onChange={(e) => this.setState({ uangMasuk : e.target.value})} className='form-control'/>
                            <input type="text" placeholder="Nama Penerima" className="form-control" onChange={(e) => this.setState({ namaMasuk : e.target.value})}/>
                            <input type="text" placeholder="Alamat Penerima" className="form-control" onChange={(e) => this.setState({ alamatMasuk : e.target.value})}/>
                            <input type="number" placeholder="Kode Pos" className="form-control" onChange={(e) => this.setState({ kodeposMasuk : e.target.value})}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <input type="button" className='btn btn-secondary' value='Bayar' onClick={this.checkOut}/>
                    </ModalFooter>
                </Modal>  
                :
                null
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id : state.user.id,
        username : state.user.username,
        role : state.user.role
    }
}

export default connect(mapStateToProps, {getCartData})(Cart)