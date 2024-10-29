import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import axios from 'axios';

interface Comment {
    id: number;
    username: string;
    text: string;
    createdAt: string;
}

const CommentsDisplay: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);

    const fetchComments = async () => {
        try {
            const response = await axios.get<Comment[]>('http://localhost:8080/api/comments');
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <Container maxWidth="sm" style={{ marginTop: '40px' }}>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h5" gutterBottom>
                    All Comments
                </Typography>
                <List>
                    {comments.map((comment) => (
                        <ListItem key={comment.id}>
                            <ListItemText 
                                primary={
                                    <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                                        {comment.username}
                                    </Typography>
                                } 
                                secondary={
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" style={{ color: '#555' }}>
                                            {comment.text}
                                        </Typography>
                                        <Typography variant="body2" style={{ fontStyle: 'italic', marginLeft: '8px', color: '#999' }}>
                                            {new Date(comment.createdAt).toLocaleString()}
                                        </Typography>
                                    </div>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default CommentsDisplay;
