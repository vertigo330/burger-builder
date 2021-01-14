import React, { Component } from 'react';
import Order from '../../components/Order/Order'

import axiosInstance from '../../axios-orders'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axiosInstance.get('/orders.json')
            .then(resp=>{
                const fetchedOrders = [];
                for(let key in resp.data)
                {
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(ex=>{
                this.setState({loading: false});
            });
    }

    render(){
        let orders = (<p>No Orders</p>)

        if(this.state.orders)
        {
            orders = this.state.orders.map(o => (
                <Order 
                    key={o.id} 
                    ingredients={o.ingredients}
                    price={+o.price} />
            ));
        }

        return (
            <div>
              {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axiosInstance);