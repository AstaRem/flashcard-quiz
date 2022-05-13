import React from 'react';
import Flashcard from './Flashcard.js';

export default function FlashcardList({flashcards}) {  // destructuring our props, also could say props.flashcards
  return (
    <div className='card-grid'>
        {flashcards.map(flashcard => {
            return <Flashcard flashcard={flashcard} key={flashcard.id} />
        })}
    </div>
  )
}
