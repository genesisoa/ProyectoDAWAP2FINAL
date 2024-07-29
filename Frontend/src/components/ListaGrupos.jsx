// src/components/ListaGrupos.jsx
import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, Divider } from '@material-ui/core';
import ChatGrupo from './ChatComponent';

const ListaGrupos = ({ groups }) => {
  const [dialogOpenChat, setDialogOpenChat] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleOpenChatDialog = (group) => {
    setSelectedGroup(group);
    setDialogOpenChat(true);
  };

  const handleCloseChatDialog = () => {
    setDialogOpenChat(false);
    setSelectedGroup(null);
  };

  return (
    <div>
      <List>
        {groups.map(group => (
          <React.Fragment key={group.id}>
            <ListItem>
              <ListItemText primary={group.nombre} secondary={group.descripcion} />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleOpenChatDialog(group)}
              >
                Ingresar al chat
              </Button>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <ChatGrupo open={dialogOpenChat} onClose={handleCloseChatDialog} group={selectedGroup} />
    </div>
  );
};

export default ListaGrupos;
