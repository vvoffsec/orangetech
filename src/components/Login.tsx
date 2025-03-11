import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
const ModalOverlay = styled.div<{ closing: boolean }>`
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
    props.closing
      ? css`${fadeOut} 0.3s ease-out forwards`
      : css`${fadeIn} 0.3s ease-out forwards`};
`;

/* Modal Content updated for mobile with equal horizontal spacing */
const ModalContent = styled.div<{ closing: boolean }>`
  background: #2f2f2f;
  color: #fff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  margin: 0 16px; /* Equal spacing on both sides */
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${(props) =>
    props.closing
      ? css`${fadeOut} 0.3s ease-out forwards, ${scaleOut} 0.3s ease-out forwards`
      : css`${fadeIn} 0.3s ease-out forwards, ${scaleIn} 0.3s ease-out forwards`};
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

const Landing: React.FC = () => {
  const [modalType, setModalType] = useState<"signup" | "login" | null>(null);
  const [closing, setClosing] = useState(false);
  const navigate = useNavigate();

  const openModal = (type: "signup" | "login") => {
    setModalType(type);
  };

  const closeModal = () => {
    // Trigger closing animation
    setClosing(true);
    setTimeout(() => {
      setModalType(null);
      setClosing(false);
    }, 300);
  };

  return (
    <Container>
      <TopLeftWavy />
      <BottomRightWavy />

      <Title>Join a community of foodies!</Title>
      <Subtitle>
        Welcome to a simple, fun and creative way to find new recipes
      </Subtitle>

      <ButtonGroup>
        <SignUpButton onClick={() => openModal("signup")}>Sign Up</SignUpButton>
        <LoginButton onClick={() => openModal("login")}>Login</LoginButton>
      </ButtonGroup>

      {modalType && (
        <ModalOverlay closing={closing} onClick={closeModal}>
          <ModalContent closing={closing} onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>×</CloseButton>
            <h2>{modalType === "signup" ? "Sign Up" : "Login"}</h2>
            <Input type="text" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            {modalType === "signup" && (
              <Input type="password" placeholder="Confirm Password" />
            )}
            <SubmitButton>
              {modalType === "signup" ? "Create Account" : "Login"}
            </SubmitButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Landing;