import React, { Component } from 'react';
import './Search_Nav.css'
import axios from 'axios';
import {Link} from 'react-router-dom';


class Search_Nav extends Component {
    constructor(props) {
        super(props)




        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {

        axios.get('/api/logout')
    }



    render() {

        return (
            
            <div className='navBox'>

                <div className='helHomFin'>
                    <div>
                        <h2 className='heloNav'>Helo</h2>
                    </div>

                    <div className='homeFin'>
                        <Link to='/Dashboard'><button className='homeBtn'></button></Link>
                        <Link to='/Search_View'><button className='findBtn'></button></Link>
                    </div>
                </div>

                <div>
                    <h4 className='dashH4'>  Search  </h4>
                </div>

                <div>
                    <Link to='/'><button

                        onClick={this.handleLogout}
                        className='logoutBtn'>

                        Logout
                        
                    </button></Link>
                </div>

            </div>
        )
    }
}


export default Search_Nav;