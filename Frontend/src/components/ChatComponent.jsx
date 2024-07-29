import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, Typography, Paper } from '@mui/material';

const Chat = ({ idEmisor, idReceptor }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/mensajes_particulares', {
          params: { id_emisor: idEmisor, id_receptor: idReceptor },
        });
        if (response.data.result) {
          setMessages(response.data.data);
        } else {
          console.error('Error:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [idEmisor, idReceptor]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await axios.post('/api/mensajes_particulares', {
          id_emisor: idEmisor,
          id_receptor: idReceptor,
          contenido: newMessage,
        });
        if (response.data.result) {
          setMessages([...messages, {
            id_emisor: idEmisor,
            id_receptor: idReceptor,
            contenido: newMessage,
            fecha_envio: new Date().toISOString(),
          }]);
          setNewMessage('');
        } else {
          console.error('Error:', response.data.message);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6">Chat</Typography>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <Typography>
              <strong>{msg.id_emisor === idEmisor ? 'You' : 'Other'}:</strong> {msg.contenido}
              <br />
              <small>{msg.fecha_envio}</small>
            </Typography>
          </ListItem>
        ))}
      </List>
      <TextField
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        placeholder="Escribe un mensaje..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
        onClick={handleSendMessage}
      >
        Enviar
      </Button>
    </Paper>
  );
};

export default Chat;
