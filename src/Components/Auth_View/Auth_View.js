import React from 'react';
import './Auth_View.css';




function Auth_View() {

        function login(){
            let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

            let redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);

            window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
        }

    
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

                            <button 
                                className='loginBtn'
                                onClick={login}>
                                
                                Login / Register
                                
                                </button>

                        </div>

                    </div>

                </div>

            </div>
        )
    }




export default Auth_View;