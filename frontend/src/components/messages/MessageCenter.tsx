import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge,
  Grid,
} from '@mui/material';
import { Send, Person } from '@mui/icons-material';
import { format } from 'date-fns';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  lastMessage: Message;
  unreadCount: number;
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: 'user1',
    participantName: 'John Doe',
    lastMessage: {
      id: 'msg1',
      senderId: 'user1',
      senderName: 'John Doe',
      content: 'Hey, is the ride still available?',
      timestamp: new Date(),
      read: false,
    },
    unreadCount: 2,
  },
  // Add more mock conversations
];

const mockMessages: Message[] = [
  {
    id: 'msg1',
    senderId: 'user1',
    senderName: 'John Doe',
    content: 'Hey, is the ride still available?',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: true,
  },
  {
    id: 'msg2',
    senderId: 'currentUser',
    senderName: 'Me',
    content: 'Yes, it is! When would you like to go?',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    read: true,
  },
  // Add more mock messages
];

const MessageCenter: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [messages] = useState<Message[]>(mockMessages);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // TODO: Implement message sending logic
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ height: '80vh', display: 'flex' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%' }}>
            <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              Conversations
            </Typography>
            <List sx={{ overflow: 'auto', maxHeight: 'calc(80vh - 64px)' }}>
              {conversations.map((conversation) => (
                <React.Fragment key={conversation.id}>
                  <ListItem
                    button
                    selected={selectedConversation === conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <ListItemAvatar>
                      <Badge
                        color="primary"
                        badgeContent={conversation.unreadCount}
                        invisible={conversation.unreadCount === 0}
                      >
                        <Avatar>
                          <Person />
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={conversation.participantName}
                      secondary={conversation.lastMessage.content}
                      secondaryTypographyProps={{
                        noWrap: true,
                        style: {
                          maxWidth: '200px',
                        },
                      }}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedConversation ? (
              <>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6">
                    {conversations.find(c => c.id === selectedConversation)?.participantName}
                  </Typography>
                </Box>

                <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                  {messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.senderId === 'currentUser' ? 'flex-end' : 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '70%',
                          backgroundColor: message.senderId === 'currentUser' ? 'primary.main' : 'grey.200',
                          color: message.senderId === 'currentUser' ? 'white' : 'text.primary',
                          borderRadius: 2,
                          p: 2,
                        }}
                      >
                        <Typography variant="body1">{message.content}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                          {format(message.timestamp, 'h:mm a')}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={4}
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      sx={{ mr: 1 }}
                    />
                    <IconButton color="primary" onClick={handleSendMessage}>
                      <Send />
                    </IconButton>
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Select a conversation to start messaging
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessageCenter; 