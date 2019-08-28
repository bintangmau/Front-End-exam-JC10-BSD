import React, { Component } from 'react';
import {connect} from 'react-redux'

// GIT PULL ORIGIN MASTER
class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 mt-4">
                        <div className="input-group mb-2">
                            <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... "  />
                            <div className="input-group-append">
                                <button className="btn btn-info" type="button" id="button-addon2" >Go</button>
                            </div>
                        </div> 
                        <div className="card p-2">
                            
                            <form ref="formFilter" style={{boxShadow:"none", fontSize:"14px"}}>
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary  -1">Cari Produk</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari Produk"></input>
                                
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari Toko</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari Toko"></input>
                                
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari User</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari User"></input> 

                                <button className="btn btn-info"><i class="fas fa-filter"></i> Filter</button>                               
                            </form>

                        </div>
                    </div>
                    <div className="col-lg-9 mt-4">
                        {
                            this.props.username ? <h3>Welcome, {this.props.username}</h3> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return {
        username : state.user.username
    }
})(Home)