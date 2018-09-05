import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import './Dashboard.css';
import axios from 'axios';
import {Link} from 'react-router-dom';




class Dashboard extends Component {
    constructor(props){
        super(props)


        this.state ={


            userInfo: [],
            userPic: [],
            first_name: '',
            last_name: '',
            allUsers: [],
            id: ''

        }
    }

    componentDidMount () {
        axios.get('/api/user').then(res => {
            this.setState({
                userInfo: res.data,
                first_name: res.data[0].first_name,
                last_name: res.data[0].last_name,
                id: res.data[0].id
                
            })

            const {id} = this.state
    
            const body = {
    
                id,
            }
    
            console.log(body)
    
            axios.post(`/api/allUsers`, body).then(res => {
                this.setState({
                    allUsers: res.data
                })
                console.log(this.state.allUsers)
            })
            
            console.log(this.state.userInfo)
            console.log(this.state.id)
        })

        axios.get('/api/userPic').then(res => {
            this.setState({
                userPic: res.data[0].picture
            })
            console.log(res.data)

        })

    }

    render() {

        const users = this.state.allUsers.map(el => {
            return (
                <div className='userCard' key={el.id}>
                    <div className='nameAndPic'>
                        <div className='userPic3'>

                            <img src={el.picture} alt="" className='truePic3'/>

                        </div>

                        <div className='fullName2'>

                            <h5 className='firstName1'>{el.first_name}</h5>
                            <h5 className='lastName1'>{el.last_name}</h5>

                        </div>

                    </div>

                    <div className='btnBox'>
                        <button className='addFriendBtn'>Add Friend</button>
                    </div>
                </div>
            )
        })

        return (
            <div className='grayBackGround'>

                <Nav />

                <div className='allBoxes'>

                    <div className='userPageInfo'>

                        <div className='userInfoBox'>

                            <div className='userPic'>
                                <img 
                                    src={this.state.userPic} 
                                    alt=""
                                    className='truePic'/>
                            </div>

                            <div>
                                <h3 className='userName'>{this.state.first_name}</h3>
                                <h3 className='userName'>{this.state.last_name}</h3>
                                <Link to='/Profile_View'><button 
                                    className='editProfBtn'
                                    >
                                    
                                    Edit Profile
                                    
                                    </button></Link>
                            </div>

                        </div>

                        <div className='pageInfoBox'>
                            <p>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p>
                        </div>

                    </div>

                    <div className='recommendedFriBox'>

                        <div className='recommended'>

                            <h3>Recommended Friends</h3>

                            <div className='filterSelector'>

                                <h5>Sorted by</h5>

                                <select name="profile_Attributes" id="" className='select'>
                                    <option value="First Name">First Name</option>
                                    <option value="Last Name">Last Name</option>
                                    <option value="Gender">Gender</option>
                                    <option value="Hair Color">Hair Color</option>
                                    <option value="Eye Color">Eye Color</option>
                                    <option value="Hobby">Hobby</option>
                                    <option value="Birth Day">Birth Day</option>
                                    <option value="Birth Month">Birth Month</option>
                                    <option value="Birth Year">Birth Year</option>
                                </select>

                            </div>

                        </div>

                        <div className='recommendedResults'>
                            {users}
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

export default Dashboard;