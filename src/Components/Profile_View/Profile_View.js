import React, { Component } from 'react';
import Profile_Nav from '../Nav/Profile_Nav';
import './Profile_View.css';



class Profile_View extends Component {



    render() {



        return (
            
            <div className='grayBackGround'>

                <Profile_Nav />

                <div className='allBoxes'>

                    <div className='userAndBtns'>

                        <div className='nameAndPic'>

                            <div className='userPicProf'>

                            </div>

                            <div>

                                <h3 className='fullName'>First Name</h3>

                                <h3 className='fullName'>Last Name</h3>

                            </div>

                        </div>

                        <div className='profileBtns'>

                            <button className='profUpdateBtn'>Update</button>

                            <button className='profCancelBtn'>Cancel</button>

                        </div>

                    </div>

                    <div className='inputMania'>

                        <div>

                            <h6 className='h6Names'>First Name</h6>
                                <input type="text" className='profileInputs' />

                            <h6 className='h6Names'>Last Name</h6>
                                <input type="text" className='profileInputs' />

                            <h6 className='h6Names'>Gender</h6>
                                <select name="Gender" id="" className='profileSelects'>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>

                            <h6 className='h6Names'>Hair Color</h6>
                                <select name="Hair Color" id="" className='profileSelects'>
                                    <option value="Brown">Brown</option>
                                    <option value="Black">Black</option>
                                    <option value="Blonde">Blonde</option>
                                    <option value="Red">Red</option>
                                    <option value="White">White</option>
                                </select>

                            <h6 className='h6Names'>Eye Color</h6>
                                <select name="Eye Color" id="" className='profileSelects'>
                                    <option value="Brown">Brown</option>
                                    <option value="Blue">Blue</option>
                                    <option value="gray">Black</option>
                                    <option value="Green">Green</option>
                                    <option value="Amber">Amber</option>
                                    <option value="Hazel">Hazel</option>
                                </select>

                        </div>

                        <div>

                            <h6 className='h6Names'>Hobby</h6>
                                <select name="Hobby" id="" className='profileSelects'>
                                    <option value="Video Games">Video Games</option>
                                    <option value="Reading">Reading</option>
                                    <option value="Traveling">Traveling</option>
                                    <option value="Fishing">Fishing</option>
                                    <option value="Crafts">Crafts</option>
                                    <option value="Television">Television</option>
                                    <option value="Music">Music</option>
                                    <option value="Gardening">Gardening</option>
                                </select>

                            <h6 className='h6Names'>Birthday Day</h6>
                                <select name="Birthday Day" id="" className='profileSelects'>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="02">02</option>
                                    <option value="02">02</option>
                                    <option value="02">02</option>
                                    <option value="02">02</option>
                                </select>

                            <h6 className='h6Names'>Birthday Month</h6>
                                <select name="Birthday Month" id="" className='profileSelects'>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>

                            <h6 className='h6Names'>Birthday Year</h6>
                                <select name="Birthday Year" id="" className='profileSelects'>
                                    <option value="1990">1990</option>
                                </select>

                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Profile_View;
