import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc
} from 'firebase/firestore';
import { auth, db } from '../firebase'; // Make sure db is your initialized Firestore instance
import { FiX } from 'react-icons/fi';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #2f2f2f;
  color: #fff;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  color: #fff;
`;

const InputRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.6rem;
  font-size: 1rem;
  color: #fff;
  background: #2c2c2c;
  border: 1px solid #444;
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: #ffb347;
    box-shadow: 0 0 8px rgba(255, 179, 71, 0.5);
  }
`;

const AddButton = styled.button`
  padding: 0.6rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: #e69500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background: #ffb347;
    transform: translateY(-2px);
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  background: #1e1e1e;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ItemName = styled.span`
  color: #fff;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 1.1rem;
`;

const Pantry: React.FC = () => {
  const [ingredients, setIngredients] = useState<{ id: string; name: string }[]>(
    []
  );
  const [newIngredient, setNewIngredient] = useState('');

  // 1. Real-time listener for the current user's ingredients
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return; // Not logged in, so skip

    // Reference to this user's ingredients subcollection
    const ingredientsRef = collection(db, 'users', user.uid, 'ingredients');

    // onSnapshot gives real-time updates
    const unsubscribe = onSnapshot(ingredientsRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { name: string })
      }));
      setIngredients(items);
    });

    return () => unsubscribe();
  }, []);

  // 2. Add new ingredient to the user's subcollection
  const handleAddIngredient = async () => {
    const user = auth.currentUser;
    if (!user || newIngredient.trim() === '') return;

    try {
      const ingredientsRef = collection(db, 'users', user.uid, 'ingredients');
      await addDoc(ingredientsRef, { name: newIngredient.trim() });
      setNewIngredient(''); // Clear input field
    } catch (err) {
      console.error('Error adding ingredient:', err);
      // Optionally handle error (e.g., show a notification)
    }
  };

  // 3. Delete ingredient by doc ID
  const handleDeleteIngredient = async (id: string) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = doc(db, 'users', user.uid, 'ingredients', id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Error deleting ingredient:', err);
      // Optionally handle error
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <SectionTitle>The Pantry</SectionTitle>
        {/* Input for adding a new ingredient */}
        <InputRow>
          <Input
            type="text"
            placeholder="Add new ingredient"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
          <AddButton onClick={handleAddIngredient}>Add</AddButton>
        </InputRow>

        {/* List of current ingredients */}
        <List>
          {ingredients.map((item) => (
            <ListItem key={item.id}>
              <ItemName>{item.name}</ItemName>
              <DeleteButton onClick={() => handleDeleteIngredient(item.id)}>
                <FiX />
              </DeleteButton>
            </ListItem>
          ))}
        </List>
      </ContentWrapper>
    </Container>
  );
};

export default Pantry;