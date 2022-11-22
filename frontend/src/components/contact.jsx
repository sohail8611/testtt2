import { useState } from 'react'
import emailjs from 'emailjs-com'
import {Facebook, Instagram, Twitter,Envelope}  from 'react-bootstrap-icons';

const initialState = {
  name: '',
  email: '',
  message: '',
}
export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, message)
    emailjs
      .sendForm(
        'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID'
      )
      .then(
        (result) => {
          console.log(result.text)
          clearState()
        },
        (error) => {
          console.log(error.text)
        }
      )
  }
  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>geidea</h2>

                <div className='social'>
                <ul>
                  <li>
                    <a href="https://web.facebook.com/geideaNet/?_rdc=1&_rdr">
                   <Facebook color="white" size={30}/>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/geidea">
                    <Twitter color="white" size={30}/>
                      
                    </a>
                  </li>
                  <li>
                    <a href= "https://www.instagram.com/accounts/login/?next=/geideanet/">
                    <Instagram color="white" size={30}/>
                    </a>
                  </li>
                </ul>
              </div>
               
              </div>
              




              
            </div>
          </div>
          <div className='col-md-3 col-md-offset-1 contact-info'>
            <div className='contact-item'>
              <h3><strong>Contact Info</strong></h3>
              <p>
                <span>
             <strong>    <i className='fa fa-map-marker'></i> Address:</strong>
                </span>
              CANARY CENTER, 7304 PRINCE ABDULAZIZ IBN MUSAID AS SULIMANIYAH DISTRICT <br/>12243 OFF#112, 1/F, 
                <br/>Riyadh Saudi Arabia
              
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
             <strong>     <i className='fa fa-phone'></i> Phone</strong>
                </span>{' '}
               +966 800 303 0083
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
            <strong>    <Envelope color="white" size={17}/> Email</strong>  
                </span>{' '}
             Support@geidea.net
              </p>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='row'>
              
            </div>
          </div>
        </div>
      </div>
<div id='footer'>
        <div className='container text-center'>
          <p>© 2022 geidea. All rights reserved</p>
        </div>
      </div>
    </div>
  )
}
