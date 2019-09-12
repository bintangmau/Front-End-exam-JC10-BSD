// import React, { Component } from 'react';
// import Axios from 'axios';
// import { urlApi } from '../../3.helpers/database';
// import swal from 'sweetalert';
// import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'


// class HistoryDetails extends Component {

//     state = {
//         dataHistory : []
//     }
    
//     componentDidMount(){
//         Axios.get(urlApi + 'history?userID=' + this.props.id + '&id=' + this.props.location.state.transactionid)
//         .then(res => {
//             console.log(res)
//             this.setState({dataHistory : res.data})
//         })
//         .catch(err => {
//             console.log(err)
//             swal('Ups', 'Something is Wrong', 'warning')
//         })
//     }



//     getHistoryDetails = () => {
//         let jsx = this.state.dataHistory.map(val => {
//             return (
//                 <tr>
//                     <td>{val.item}</td>
//                     <td>{val.price}</td>
//                     <td>{val.quantity}</td>
//                 </tr>
//             )
            
//         }) 
//         return jsx
//     }    


//     renderHistory = () => {
//         let jsx = this.state.dataHistory.map( (val) => {
//             var details = val.items.map((value) => {
//                 return (
//                     <tr>
//                         <td>{value.productName}</td>
//                         <td>{value.price}</td>
//                         <td>{value.quantity}</td>
//                     </tr>
//                 )
//             })
//             return details
//         }) 
//       return jsx
//     }

//     functionBaru = () => {
//         var baru = this.state.dataHistory.items.map((val) => {
//             return
//         })
//     }


//     render() {
//         if(this.props.role === ''){
//             return <Redirect to='/'></Redirect>
//         }

//         return (
//             <div className='container'>
//                 <table className='table mt-3'>
//                     <thead>
//                         <tr>
//                             <th>Nama Barang</th>
//                             <th>Harga Satuan</th>
//                             <th>Jumlah Barang</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.renderHistory()}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// }

// const mapStateToProps = state => {
//     return {
//         id : state.user.id,
//         role : state.user.role
//     }
//     }


// export default connect(mapStateToProps)(HistoryDetails) 