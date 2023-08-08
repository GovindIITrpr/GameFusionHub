// Page1.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../firebase';

const Items: React.FC = () => {
  const [data, setData] = useState({
    item1: '',
    item2: '',
    item3: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add selected items to Firestore for the current user
    const userCollectionRef = collection(database, 'users');
    addDoc(userCollectionRef, data)
      .then(() => {
        console.log('Selected items saved successfully:', data);
      })
      .catch((error) => {
        console.error('Error saving selected items:', error);
      });

    // Navigate to Page2
    navigate('/page2');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <h1>Page1</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="item1" value={data.item1} onChange={handleInput} />
        </div>
        <div>
          <input type="text" name="item2" value={data.item2} onChange={handleInput} />
        </div>
        <div>
          <input type="text" name="item3" value={data.item3} onChange={handleInput} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Items;
