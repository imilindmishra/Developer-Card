// ViewCards.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await axios.get('http://localhost:5000/api/cards');
        setCards(response.data);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    }

    fetchCards();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
        {cards.map((card) => (
          <div key={card._id}  className="bg-indigo-950 mt-8 mx-4 mb-8 h-48 max-w-112 shadow-lg rounded-lg overflow-hidden flex items-center" style={{ width: '25rem', height: '12rem' }}>
            <img
              className="mt-3 w-28 h-28 rounded-full mr-4 ml-4"
              src={card.profilePic} // Assuming each card has a profilePic field
              alt="Profile"
            />
            <div className="px-4 py-6 text-white">
              <div className="font-bold text-xl mb-2">{card.name}</div>
              <p className="text-sm"><b className="mr-2 mb-2">Role:</b> {card.role}</p>
              <p className="text-sm"><b className="mr-2 mb-2">Interests:</b> {card.interests}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {card.socialMedia.map((social, index) => (
                  social.name && social.link ? (
                    // Separate rounded buttons for each social media link
                    <button
                      key={index}
                      className="bg-blue-900 text-white font-normal text-sm px-2 rounded"
                    >
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mr-2"
                      >
                        {social.name} →
                      </a>
                    </button>
                  ) : null
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
  );
}

export default ViewCards;
