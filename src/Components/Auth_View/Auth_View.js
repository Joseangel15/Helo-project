import React, {Component} from "react";
import './Auth_View.css';




class Auth_View extends Component {


    render(){
        return(
            <div className='mainBackGround'>
                
                <div className='middleSquare'>
                    
                    <div>

                        <div>
                            <div className='logo'></div>
                        </div>

                        <div>
                            <h1 className='mainTitle'>Helo</h1>
                        </div>

                        <div>
                            <button className='loginBtn'>Login / Register</button>
                        </div>

                    </div>

                </div>

            </div>
        )
    }


}

export default Auth_View;