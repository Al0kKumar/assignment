// pages/comments.tsx
import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Typography,
    Paper,
    Container,
    Snackbar,
    IconButton,
    Divider
} from '@mui/material';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

interface Comment {
    id: number;
    username: string;
    text: string;
    createdAt: string; 
}

const socket = io('http://localhost:8080');

const Comments: React.FC = () => {
    const router = useRouter();
    const { username } = router.query; 
    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setText] = useState<string>('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

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

        socket.on('newComment', (comment: Comment) => {
            setComments((prevComments) => [comment, ...prevComments]);
            setOpenSnackbar(true);
        });

        return () => {
            socket.off('newComment');
        };
    }, []);

    // Handle comment submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text) return;

        try {
            await axios.post<Comment>('http://localhost:8080/api/comments', {
                username,
                text,
            });
            setText(''); 
            router.push('/Display'); 
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    // Handle snackbar close
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '40px' }}>
            <Paper elevation={3} style={{ padding: '24px', borderRadius: '12px' }}>
                <Typography variant="h5" gutterBottom align="center">
                    Welcome, {username}!
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Write a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                        required
                        variant="outlined"
                        style={{ marginBottom: '16px' }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Post Comment
                    </Button>
                </form>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="h6" gutterBottom>
                    Comments:
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

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="New comment added!"
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleCloseSnackbar}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Container>
    );
};

export default Comments;
