import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios'
import { urlApi } from '../../3.helpers/database';
import swal from 'sweetalert'


class ParaSultan extends Component {
    state = {
        data : []
    }

    componentDidMount(){
        this.getDataTotal()
    }

    getDataTotal = () => {
        Axios.get(urlApi + 'history')
        .then(res =>{
            this.setState({data : res.data})
        })
        .catch(err => {
            swal ('upz','Data ga Masuk','warning')
        })
    }

    bubble_Sort = (a) => {
        var swapp;
        var n = a.length-1;
        var x=a;
        do {
            swapp = false;
            for (var i=0; i < n; i++)
            {
                if (x[i] < x[i+1])
                {
                   var temp = x[i];
                   x[i] = x[i+1];
                   x[i+1] = temp;
                   swapp = true;
                }
            }
            n--;
        } while (swapp);
     return x; 
    }
    

    render() {
        return (
            <div>
                <Link to='/admindashboard'> 
                    <h2>Back to Manage Product</h2>
                </Link>
            </div>
        );
    }
}

export default ParaSultan;
