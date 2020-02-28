import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';



function CardContainer(){
  const [deckId, setDeckId] = useState("");
  const [cardImage, setCardImage] = useState(null);
  // const timerId = useRef();

  useEffect(() => {
    async function getDeck() {
      const deckResult = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      setDeckId(deckResult.data.deck_id)
    }
    getDeck();
  }, [setDeckId]);

  // useEffect(() => {
  //   timerId.current = setInterval(()

  //   const intervalCards = setInterval(() => {
  //    async function drawCard(id){
  //      let cardResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
  //      let responseCardImage = cardResponse.data.cards[0].image;
  //      setCardImage(responseCardImage);
  //    }
  //  }, 2000);

  // })



  async function drawCard(id){
    let cardResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
    let responseCardImage = cardResponse.data.cards[0].image;
    setCardImage(responseCardImage);
  }

  return (
    <div>
      <p>{deckId}</p>
      <button onClick={() => drawCard(deckId) }>Get Card!</button>
      {cardImage && <Card image={cardImage} />}
    </div>
  )
}

export default CardContainer;