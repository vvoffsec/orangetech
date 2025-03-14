import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  background: #2f2f2f;
  color: #fff;
  min-height: calc(100vh - 80px); /* Adjust based on your bottom nav height */
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const Recipes: React.FC = () => {
  return (
    <Container>
      <Title>Recipes</Title>
      <p>This is where your recipes content will be displayed. Add your list or grid of recipes here.</p>
    </Container>
  );
};

export default Recipes;
