// Dashboard.tsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f5f5f5;
`;

const Title = styled.h1`
  color: #333;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Welcome to Your Dashboard</Title>
      <p>This is a placeholder dashboard.</p>
      <button onClick={() => navigate('/login')}>Logout</button>
    </Container>
  );
};

export default Dashboard;
