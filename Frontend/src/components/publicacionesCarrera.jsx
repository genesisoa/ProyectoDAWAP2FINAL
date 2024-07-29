import React, { useState, useEffect } from 'react';
import { Container, Typography, List, Divider, Paper, Avatar, IconButton, Button, TextField, ListItem, ListItemText } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SendIcon from '@material-ui/icons/Send';
import Reactions from './reaccionesComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@mui/material/Alert';


const PublicacionesPorCarrera = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [userNames, setUserNames] = useState({});
  const [postReactions, setPostReactions] = useState({});
  const [newPostContent, setNewPostContent] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [success, setSuccess] = useState('');
  const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
  
  const handleEditClick = (postId, currentContent) => {
    setEditingPostId(postId);
    setEditContent(currentContent);
  };

  const handleEditChange = (event) => {
    setEditContent(event.target.value);
  };

  const handleEditSubmit = (postId) => {
    handleUpdatePost(postId, editContent);
    setEditingPostId(null);
    setEditContent('');
  };


  useEffect(() => {
    if (userId) {
      fetch(`http://192.168.100.4:5000/publicaciones/carrera/${userId}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.result) {
            setPosts(data.data);
            setError('');

            const userIds = [...new Set(data.data.map(post => post.id_usuario))];
            Promise.all(userIds.map(id => 
              fetch(`http://192.168.100.4:5000/api/usuarios/${id}`)
                .then(response => response.json())
                .then(userData => {
                  if (userData && userData.result) {
                    return { id, nombre: userData.data.nombre };
                  }
                  return { id, nombre: 'Desconocido' };
                })
            ))
            .then(results => {
              const names = {};
              results.forEach(({ id, nombre }) => {
                names[id] = nombre;
              });
              setUserNames(names);
            })
            .catch(error => {
              console.error('Error al obtener nombres de usuarios:', error);
            });

            data.data.forEach(post => {
              fetch(`http://192.168.100.4:5000/api/comentarios/${post.id}`)
                .then(response => response.json())
                .then(commentData => {
                  if (commentData && commentData.result) {
                    const commentUserIds = [...new Set(commentData.data.map(comment => comment.id_usuario))];
                    Promise.all(commentUserIds.map(id =>
                      fetch(`http://192.168.100.4:5000/api/usuarios/${id}`)
                        .then(response => response.json())
                        .then(userData => {
                          if (userData && userData.result) {
                            return { id, nombre: userData.data.nombre };
                          }
                          return { id, nombre: 'Desconocido' };
                        })
                    ))
                    .then(commentResults => {
                      const commentNames = {};
                      commentResults.forEach(({ id, nombre }) => {
                        commentNames[id] = nombre;
                      });
                      setUserNames(prevNames => ({
                        ...prevNames,
                        ...commentNames
                      }));
                      setComments(prevComments => ({
                        ...prevComments,
                        [post.id]: commentData.data
                      }));
                    })
                    .catch(error => {
                      console.error('Error al obtener nombres de usuarios de comentarios:', error);
                    });
                  }
                })
                .catch(error => {
                  console.error('Error al obtener comentarios:', error);
                });
            });
          } else {
            setError('No se pudo obtener las publicaciones.');
          }
        })
        .catch(error => {
          setError('Error al comunicarse con el servidor.');
        });
    }
  }, [userId]);

  const handleReactionChange = (postId, reaction) => {
    setPostReactions((prevReactions) => ({
      ...prevReactions,
      [postId]: reaction,
    }));
  }

  const handleUpdatePost = (postId, newContent) => {
    if (!newContent || newContent.trim() === '') {
      alert('El contenido no puede estar vacío');
      return;
    }
  
    fetch(`http://192.168.100.4:5000/publicacion/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: postId,
        contenido: newContent
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.result) {
          setPosts(prevPosts => prevPosts.map(post =>
            post.id === postId ? { ...post, contenido: newContent } : post
          ));
        } else {
          console.error(data.message || 'Error al actualizar la publicación.');
        }
      })
      .catch(error => {
        console.error('Error al actualizar la publicación:', error);
      });
  };

  const handleCommentChange = (postId, event) => {
    setNewComment({
      ...newComment,
      [postId]: event.target.value
    });
  };

  
  const handleCommentSubmit = (postId) => {
    if (!newComment[postId] || newComment[postId].trim() === '') {
      alert('El comentario no puede estar vacío');
      return;
    }

    fetch(`http://192.168.100.4:5000/comentario/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_publicacion: postId,
        id_usuario: userId,
        contenido: newComment[postId]
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.result) {
          setComments(prevComments => ({
            ...prevComments,
            [postId]: [...(prevComments[postId] || []), { id: data.data.id, id_usuario: userId, contenido: newComment[postId] }]
          }));
          setNewComment(prevNewComment => ({
            ...prevNewComment,
            [postId]: ''
          }));
          setCommentingPostId(null);
        } else {
          console.error(data.message || 'Error al enviar el comentario.');
        }
      })
      .catch(error => {
        console.error('Error al enviar comentario:', error);
      });
  };

  const toggleCommentsVisibility = (postId) => {
    setShowComments(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };
  const handleDeletePost = (postId) => {
    console.log('Eliminando publicación...');
    fetch(`http://192.168.100.4:5000/publicacion/${postId}/delete`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.result) {
          setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
          setAlert({ open: true, severity: 'success', message: 'Publicación eliminada exitosamente.' });
          console.log('Publicación eliminada, mostrando alerta...');
          setTimeout(() => {
            setAlert({ open: false, severity: '', message: '' });
          }, 3000);
        } else {
          console.error(data.message || 'Error al eliminar la publicación.');
        }
      })
      .catch(error => {
        console.error('Error al eliminar la publicación:', error);
      });
  };

  const handleDeleteComment = (commentId) => {
    fetch(`http://192.168.100.4:5000/comentario/${commentId}/delete`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.result) {
          setComments(prevComments => {
            const updatedComments = { ...prevComments };
            Object.keys(updatedComments).forEach(postId => {
              updatedComments[postId] = updatedComments[postId].filter(comment => comment.id !== commentId);
            });
            return updatedComments;
          });
          setAlert({ message: 'Comentario eliminado exitosamente.', severity: 'success' });        } else {
          console.error(data.message || 'Error al eliminar el comentario.');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el comentario:', error);
      });
  };

  return (
    <Container  style={{ maxHeight: '80vh', overflowY: 'auto', padding: '15px',  boxShadow : '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
      {alert.open && (
  <Alert severity={alert.severity} style={{ marginBottom: '20px' }}>
    {alert.message}
  </Alert>
)}
      <Typography variant="h6" style={{ marginBottom: '20px' }}> <b>Publicaciones sobre tu carrera!</b></Typography>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {posts.map(post => (
          <Paper key={post.id} style={{ padding: '15px', marginBottom: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar style={{ marginRight: '10px', backgroundColor: '#e0e0e0' }}>
                {userNames[post.id_usuario] ? userNames[post.id_usuario].charAt(0) : '?'}
              </Avatar>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                {userNames[post.id_usuario] || 'Cargando...'}
              </Typography>
              {userId === post.id_usuario && (
              <div style={{ marginLeft: 'auto' }}>
                <IconButton onClick={() => handleEditClick(post.id, post.contenido)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeletePost(post.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              </div>
            )}
            </div>
            {editingPostId === post.id ? (
    <div>
      <TextField
        value={editContent}
        onChange={handleEditChange}
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button onClick={() => handleEditSubmit(post.id)} color="primary">
        Guardar
      </Button>
      <Button onClick={() => setEditingPostId(null)} color="secondary">
        Cancelar
      </Button>
    </div>
  ) : null}
            
            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              {post.contenido}
            </Typography>
            <Reactions
            postId={post.id}
            currentReaction={postReactions[post.id] || ''}
            onReactionChange={(reaction) => handleReactionChange(post.id, reaction)}
            userId={userId}
          />
            <Divider style={{ margin: '10px 0' }} />
            <div style={{ marginBottom: '10px' }}>
              <Button onClick={() => toggleCommentsVisibility(post.id)} color="primary">
                {showComments[post.id] ? 'Ocultar comentarios' : 'Ver comentarios'}
              </Button>
            </div>
            
            {showComments[post.id] && (
              <div>
                <List>
                  {(comments[post.id] || []).map(comment => (
                    <ListItem key={comment.id}>
                      <Avatar style={{ marginRight: '10px', backgroundColor: '#e0e0e0' }}>
                        {userNames[comment.id_usuario] ? userNames[comment.id_usuario].charAt(0) : '?'}
                      </Avatar>
                      <ListItemText
                        primary={comment.contenido}
                        secondary={userNames[comment.id_usuario] || 'Desconocido'}
                      />
                      {userId === comment.id_usuario && (
                          <IconButton onClick={() => handleDeleteComment(comment.id)} style={{ marginLeft: 'auto' }}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                    </ListItem>
                  ))}
                </List>
                <TextField
                  value={newComment[post.id] || ''}
                  onChange={(event) => handleCommentChange(post.id, event)}
                  label="Nuevo comentario"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => handleCommentSubmit(post.id)} color="primary">
                        <SendIcon />
                      </IconButton>
                    ),
                  }}
                />
              </div>
            )}
          </Paper>
        ))}
      </List>
    </Container>
  );
};

export default PublicacionesPorCarrera;
