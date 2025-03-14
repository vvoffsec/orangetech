import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* Prevent scrolling */
  background: rgba(0, 0, 0, 0.7); /* Slight dimming for better focus */
  color: #fff;
`;

const FormWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  max-height: 90vh; /* Constrain height to viewport */
  padding: 2rem;
  background: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.4);
  box-sizing: border-box;
  overflow-y: auto; /* Allow scrolling inside if necessary */
`;

const Title = styled.h2`
  color: #fff;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #cccccc;
  margin-bottom: 0.3rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  color: #fff;
  background: #2c2c2c;
  border: 1px solid #444;
  border-radius: 6px;
  margin-bottom: 1rem;
  &:focus {
    border-color: #FFB347;
    box-shadow: 0 0 8px rgba(255, 179, 71, 0.5);
  }
  &:disabled {
    opacity: 0.6;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: #E69500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background: #FFB347;
    transform: translateY(-2px);
  }
`;

const LogoutButton = styled(SaveButton)`
  margin-top: 1rem;
`;

const AccountSettings: React.FC = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (!user) return;
    setEmail(user.email || '');
  }, [user]);

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Account Settings</Title>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <Label>New Password</Label>
          <Input
            type="password"
            placeholder="Leave blank to keep current password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Label>Phone Number</Label>
          <Input type="text" placeholder="Add a phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <Label>Location</Label>
          <Input type="text" placeholder="Add a location" value={location} onChange={(e) => setLocation(e.target.value)} />

          <SaveButton type="submit">Save Changes</SaveButton>
        </form>
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      </FormWrapper>
    </Container>
  );
};

export default AccountSettings;