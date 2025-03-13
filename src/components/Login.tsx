import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Firebase imports
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

// React Icons for notifications and password validation
import { FiCheck, FiX } from 'react-icons/fi';

// ---------------- STYLED COMPONENTS ----------------
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

const TopLeftWavy = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  height: 220px;
  background: linear-gradient(135deg, #ff6a00 0%, #ffb347 100%);
  clip-path: path("M0,0 C 0,110 110,20 220,220 L220,0 Z");
  transform: rotate(-90deg);
`;

const BottomRightWavy = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 220px;
  height: 220px;
  background: linear-gradient(135deg, #ff6a00 0%, #ffb347 100%);
  clip-path: path("M220,220 C 220,110 110,200 0,0 L0,220 Z");
  transform: rotate(-90deg);
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #ffffff;
  margin: 0;
  text-align: center;
  max-width: 280px;
  line-height: 1.3;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #cccccc;
  text-align: center;
  max-width: 280px;
  margin: 0.8rem 0 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1;
`;

const SignUpButton = styled.button`
  font-size: 1rem;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  background: #3a3a3a;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
  }
`;

const LoginButton = styled.button`
  font-size: 1rem;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #ff6a00 0%, #ffb347 100%);
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
  }
`;

/* Animations for modal */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.9); }
  to { transform: scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0.9); }
`;

/* Modal Overlay with conditional animation */
const ModalOverlay = styled.div<{ $closing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  animation: ${(props) =>
    props.$closing
      ? css`
          ${fadeOut} 0.3s ease-out forwards
        `
      : css`
          ${fadeIn} 0.3s ease-out forwards
        `};
`;

/* Modal Content with conditional animation */
const ModalContent = styled.div<{ $closing: boolean }>`
  background: #2f2f2f;
  color: #fff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  margin: 0 16px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${(props) =>
    props.$closing
      ? css`
          ${fadeOut} 0.3s ease-out forwards, ${scaleOut} 0.3s ease-out forwards
        `
      : css`
          ${fadeIn} 0.3s ease-out forwards, ${scaleIn} 0.3s ease-out forwards
        `};
`;

const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 0.7rem;
  margin: 0.5rem 0;
  background: #3a3a3a;
  color: #fff;
  border: 1px solid #444;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  font-size: 1rem;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #ff6a00 0%, #ffb347 100%);
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 300px;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #fff;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

// Notification Component for errors
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

// --------------- PASSWORD REQUIREMENTS ---------------
/**
 * These checks match the Firebase password policy settings:
 * - At least 6 characters
 * - At most 4096 characters
 * - Contains uppercase letter
 * - Contains lowercase letter
 * - Contains numeric character
 * - Contains special character
 */
const passwordRequirements = [
  {
    label: 'At least 6 characters',
    test: (pwd: string) => pwd.length >= 6,
  },
  {
    label: 'Contains uppercase letter',
    test: (pwd: string) => /[A-Z]/.test(pwd),
  },
  {
    label: 'Contains lowercase letter',
    test: (pwd: string) => /[a-z]/.test(pwd),
  },
  {
    label: 'Contains numeric character',
    test: (pwd: string) => /\d/.test(pwd),
  },
  {
    label: 'Contains special character',
    test: (pwd: string) => /[^A-Za-z0-9]/.test(pwd),
  },
];

// --------------- MAIN COMPONENT ---------------
const Landing: React.FC = () => {
  console.log('Landing component rendered');

  const navigate = useNavigate();
  const [modalType, setModalType] = useState<"signup" | "login" | null>(null);
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState<string>('');

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Only used for signup mode
  const [confirmPassword, setConfirmPassword] = useState('');

  const openModal = (type: "signup" | "login") => {
    // Reset inputs when opening a modal
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setModalType(type);
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setModalType(null);
      setClosing(false);
    }, 300);
  };

  // Auto-dismiss error notification after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // --------------- HANDLE SUBMIT ---------------
const handleSubmit = async () => {
  if (modalType === 'login') {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      closeModal(); // play the closing animation
      navigate('/dashboard'); // go to the dashboard
    } catch (error) {
      console.error('Sign-in error:', error);
      setError((error as Error).message);
    }
  } else if (modalType === 'signup') {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully');
      // Instead of navigating to /signin, transition to the login modal:
      setClosing(true);
      setTimeout(() => {
        setModalType('login');
        setClosing(false);
        // Optionally clear password fields or pre-fill email for login:
        setPassword('');
        setConfirmPassword('');
      }, 300);
    } catch (error) {
      console.error('Sign-up error:', error);
      setError((error as Error).message);
    }
  }
};
  // --------------- RENDER ---------------
  return (
    <Container>
      {error && (
        <Notification>
          <span>{error}</span>
          <FiX onClick={() => setError('')} style={{ cursor: 'pointer' }} />
        </Notification>
      )}
      <TopLeftWavy />
      <BottomRightWavy />

      <Title>Join Orange Today!</Title>
      <Subtitle>Finding new recipes just got a whole lot easier.</Subtitle>

      <ButtonGroup>
        <SignUpButton onClick={() => openModal('signup')}>Sign Up</SignUpButton>
        <LoginButton onClick={() => openModal('login')}>Login</LoginButton>
      </ButtonGroup>

      {modalType && (
        <ModalOverlay $closing={closing} onClick={closeModal}>
          <ModalContent $closing={closing} onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>×</CloseButton>
            <h2>{modalType === 'signup' ? 'Sign Up' : 'Login'}</h2>

            {/* Email */}
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirm Password (Signup only) */}
            {modalType === 'signup' && (
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}

            {/* Dynamic Password Requirements (Signup only) */}
            {modalType === 'signup' && (
              <div style={{ textAlign: 'left', marginTop: '1rem' }}>
                <h4>Password Requirements:</h4>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {passwordRequirements.map((req) => {
                    const isValid = req.test(password);
                    return (
                      <li key={req.label} style={{ display: 'flex', alignItems: 'center', margin: '0.3rem 0' }}>
                        {isValid ? <FiCheck color="green" /> : <FiX color="red" />}
                        <span style={{ marginLeft: '0.5rem' }}>{req.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Submit */}
            <SubmitButton onClick={handleSubmit}>
              {modalType === 'signup' ? 'Create Account' : 'Login'}
            </SubmitButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Landing;