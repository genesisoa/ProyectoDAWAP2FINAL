import React, { useState, useEffect } from 'react';
import { Tooltip } from '@material-ui/core';
import '../styles/reaccion.css';
import thumbsUpImage from '../images/gusta.png';
import heartImage from '../images/encanta.png';
import laughImage from '../images/divierte.png';
import surpriseImage from '../images/sorprende.png';
import sadTearImage from '../images/tristeza.png';
import angryImage from '../images/enojado.png';

const reactionImages = {
  'me gusta': thumbsUpImage,
  'me encanta': heartImage,
  'me divierte': laughImage,
  'me sorprende': surpriseImage,
  'me entristece': sadTearImage,
  'me enfada': angryImage,
};

const Reactions = ({ postId, currentReaction, onReactionChange, userId }) => {
  const [loading, setLoading] = useState(false);
  const [reactionCounts, setReactionCounts] = useState({});

  useEffect(() => {
    const fetchReactionCounts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/reaccion/conteo?id_publicacion=${postId}`, {
          headers: { 'Accept': 'application/json' }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        if (data.message === "Conteo de reacciones obtenido exitosamente") {
          const counts = data.data.reduce((acc, { tipo, cantidad }) => {
            acc[tipo] = cantidad;
            return acc;
          }, {});
          setReactionCounts(counts);
        } else {
          console.error('Error al obtener el conteo de reacciones:', data.message);
        }
      } catch (error) {
        console.error('Error al obtener el conteo de reacciones:', error);
      }
    };
  
    fetchReactionCounts();
    const intervalId = setInterval(fetchReactionCounts, 5000); 
  
    return () => clearInterval(intervalId); 
  }, [postId]);
  

  const handleReactionChange = async (reaction) => {
    if (loading) return;
    setLoading(true);
  
    const url = 'http://127.0.0.1:5000/reaccion/create';
    const method = 'POST';
    const body = JSON.stringify({
      id_publicacion: postId,
      id_usuario: userId,
      tipo: reaction,
    });
  
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await response.json();
  
      if (data.result) {
        setReactionCounts((prevCounts) => {
          const newCounts = { ...prevCounts };
          newCounts[reaction] = (newCounts[reaction] || 0) + 1;
          return newCounts;
        });
        onReactionChange(reaction);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error al enviar la reacción:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="reaction-container">
      {Object.entries(reactionImages).map(([reaction, image]) => (
        <Tooltip key={reaction} title={reaction.charAt(0).toUpperCase() + reaction.slice(1)}>
          <div
            onClick={() => handleReactionChange(reaction)}
            className={`reaction-item ${currentReaction === reaction ? 'selected' : ''}`}
          >
            <img
              src={image}
              alt={reaction}
              className="reaction-image"
            />
            <span className="reaction-count">{reactionCounts[reaction] || 0}</span>
            {currentReaction === reaction && (
              <div className="reaction-underline" />
            )}
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default Reactions;
