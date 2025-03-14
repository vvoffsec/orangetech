import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { MdPerson } from 'react-icons/md'; // import the person icon

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  /* Ensure safe area on iOS devices */
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  background: #2f2f2f;
  color: #fff;
`;

// New top bar styling
const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #fff;
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  color: #ffffff;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const displayName = user?.displayName || '';
  const firstName = displayName.split(' ')[0] || displayName; // Extract the first name

  return (
    <Container>
      {/* Top bar with the account settings icon */}
      <TopBar>
        <IconButton onClick={() => navigate('/settings')}>
          <MdPerson />
        </IconButton>
      </TopBar>
      <Content>
        <Title>Hello, {firstName}!</Title>
        {/* Additional dashboard content can go here */}
      </Content>
    </Container>
  );
};

export default Dashboard;