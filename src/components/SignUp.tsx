import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import { FaGoogle, FaTwitter, FaFacebookF } from 'react-icons/fa';

// 1) Import Firebase auth functions
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #2f2f2f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.25rem;
  cursor: pointer;
`;

const FormWrapper = styled.div`
  width: clamp(300px, 90%, 400px);
  background: #1e1e1e;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 1.1rem;
  text-align: center;
  margin: 0 0 0.5rem;
`;

const Input = styled.input`
  padding: 0.65rem;
  font-size: 0.95rem;
  background: #2c2c2c;
  color: #fff;
  border: 1px solid #444;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.6);

  &:focus {
    border-color: #FFB347;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  padding: 0.65rem;
  font-size: 0.95rem;
  font-weight: bold;
  color: #fff;
  background-color: #E69500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #FFB347;
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
`;

const DividerText = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 0.8rem;
  margin: 0.5rem 0;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: #2c2c2c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  transition: background-color 0.2s;

  &:hover {
    background: #444;
  }
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff4d4f;
  color: #fff;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if(error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // 2) Handle sign up using Firebase
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSignUp called");
    try {
      // Create user with Firebase (treat mobileOrEmail as the "email" for now)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        mobileOrEmail,
        password
      );
      console.log("User signed up:", userCredential.user);
      navigate("/signin");
    } catch (error) {
      console.error("Sign-up error:", error);
      setError((error as Error).message);
    }
  };

  return (
    <Container>
      {error && (
        <Notification>
          <span>{error}</span>
          <FiX onClick={() => setError('')} style={{ cursor: 'pointer' }} />
        </Notification>
      )}
      <BackButton onClick={() => navigate('/')}>
        <FiArrowLeft />
      </BackButton>
      <FormWrapper>
        <Title>Sign up to see photos and videos from your friends.</Title>
        <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input
            type="text"
            placeholder="Mobile Number or Email"
            value={mobileOrEmail}
            onChange={(e) => setMobileOrEmail(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SignUpButton type="submit">Sign Up</SignUpButton>
        </form>
        <DividerText>Or sign up with another account</DividerText>
        <SocialIcons>
          <IconWrapper><FaGoogle /></IconWrapper>
          <IconWrapper><FaTwitter /></IconWrapper>
          <IconWrapper><FaFacebookF /></IconWrapper>
        </SocialIcons>
      </FormWrapper>
    </Container>
  );
};

export default SignUp;