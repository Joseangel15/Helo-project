import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import './Dashboard.css';




class Dashboard extends Component {




    render() {

        return (
            <div className='grayBackGround'>

                <Nav />

                <div className='allBoxes'>

                    <div className='userPageInfo'>

                        <div className='userInfoBox'>

                            <div className='userPic'>

                            </div>

                            <div>
                                <h3 className='userName'>Firstname</h3>
                                <h3 className='userName'>Lastname</h3>
                                <button className='editProfBtn'>Edit Profile</button>
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

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

export default Dashboard;