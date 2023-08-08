import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { database } from '../../firebase';

const FavouriteItems: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<{ item1: string; item2: string; item3: string } | null>(null);

  useEffect(() => {
    // Fetch the selected items for the current user
    const fetchSelectedItems = async () => {
      const userDocRef = doc(database, 'users', 'CURRENT_USER_ID'); // Replace 'CURRENT_USER_ID' with the actual user ID
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setSelectedItems(userDocSnap.data() as { item1: string; item2: string; item3: string; } | null);

      } else {
        setSelectedItems(null);
      }
    };

    fetchSelectedItems();
  }, []);

  return (
    <div>
      <h1>Page2</h1>
      {selectedItems ? (
        <ul>
          <li>{selectedItems.item1}</li>
          <li>{selectedItems.item2}</li>
          <li>{selectedItems.item3}</li>
        </ul>
      ) : (
        <p>No selected items found for the user.</p>
      )}
    </div>
  );
};

export default FavouriteItems;
