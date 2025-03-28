import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';

// 1) Import Firebase auth functions
import { signInWithEmailAndPassword } from 'firebase/auth';
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

const SignInButton = styled.button`
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

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if(error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // 2) Handle sign in using Firebase
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSignIn called");
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, usernameOrEmail, password);
      console.log("User signed in:", userCredential.user);
      navigate("/");
    } catch (error) {
      console.error("Sign-in error:", error);
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
        <Title>Sign in to your account</Title>
        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SignInButton type="submit">Sign In</SignInButton>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;