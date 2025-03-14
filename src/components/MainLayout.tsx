import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background: #2f2f2f;
  color: #fff;
  padding: env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px;
`;

const BottomToolbar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #1e1e1e;
  padding: 0.8rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const NavButton = styled.button`
  flex: 1;
  margin: 0 0.5rem;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  color: #fff;
  background: linear-gradient(135deg, #ff6a00 0%, #ffb347 100%);
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
  }
`;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <Container>
      <Content>
        <Outlet />
      </Content>
      <BottomToolbar>
        <NavButton onClick={() => navigate('/pantry')}>Pantry</NavButton>
        <NavButton onClick={() => navigate('/dashboard')}>Dashboard</NavButton>
        <NavButton onClick={() => navigate('/recipes')}>Recipes</NavButton>
      </BottomToolbar>
    </Container>
  );
};

export default MainLayout;