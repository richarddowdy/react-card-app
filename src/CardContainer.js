import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';



function CardContainer() {
  const [deckId, setDeckId] = useState("");
  const [cardImage, setCardImage] = useState(null);
  const [isDrawing, setisDrawing] = useState(false);
  const [cardsRemaining, setCardsRemaining] = useState(52);
  const timerId = useRef();


  useEffect(() => {
    async function getDeck() {
      const deckResult = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      setDeckId(deckResult.data.deck_id)
    }
    getDeck();
  }, [setDeckId]);

  useEffect(() => {
    if (isDrawing) {
      timerId.current = setInterval(() =>
        drawCard(deckId)
        , 500);
    }
    return () => {
      console.log("unmount ID", timerId.current);
      clearInterval(timerId.current);
    }
  }, [deckId, isDrawing]);
  
  async function drawCard(id) {
    let cardResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
    let responseCard = cardResponse.data.cards[0];
    if(responseCard === undefined){
      setisDrawing(false);
    } else {
      setCardImage(responseCard.image);
      setCardsRemaining(cardResponse.data.remaining);
    }
    console.log(cardResponse.data.remaining);
  }

  return (
    <div>
      <p>{deckId}</p>
  <button onClick={() => setisDrawing(!isDrawing)}>{isDrawing ? "STOP!!!!!" : "Start Drawing Cards"}</button>
      {cardsRemaining < 1 ? <p>NONE LEFT</p> : (cardImage && <Card image={cardImage} />)}
    </div>
  )
}

export default CardContainer;