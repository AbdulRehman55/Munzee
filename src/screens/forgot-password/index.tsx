import React, { useState } from 'react';
import './styles.scss';
import { Container, Button, Input } from '../../components';
import logo from '../../assets/images/munzee-logo-v4-outline.png';

const ForgotPassword = (): JSX.Element => {
  const [email, setEmail] = useState('');
  return (
    <div className='main forgot-main'>
      <Container>
        <div className='logo2'>
          <img src={logo} alt='logo' />
        </div>
        <p className='forgottext'>Forgot your password?</p>
        <div className='form'>
          <Input
            label='Get a new one here.'
            placeholder='Email'
            className='loginInput'
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Button
            className="btn primaryButton sigin-in-button bluebutton"
            icon={<i className="fa fa-key"></i>}
          >
            Send Email
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
