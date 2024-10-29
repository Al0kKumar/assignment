import React from 'react';
import { Button, Container, Typography, Paper, Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import { Comment } from '@mui/icons-material';

const Home: React.FC = () => {
    const router = useRouter();

    const handleStart = () => {
        router.push('/Login'); 
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: '80px' }}>
            <Paper elevation={4} style={{ padding: '32px', borderRadius: '16px', textAlign: 'center' }}>
                <Avatar style={{ margin: 'auto', backgroundColor: '#3f51b5', width: '60px', height: '60px' }}>
                    <Comment style={{ fontSize: '40px' }} />
                </Avatar>
                <Typography variant="h4" style={{ margin: '20px 0', fontWeight: 'bold' }}>
                    Welcome to the Comment App!
                </Typography>
                <Typography variant="body1" color="textSecondary" style={{ marginBottom: '20px' }}>
                    Share your thoughts and engage with others in our community.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStart}
                    fullWidth
                    style={{ padding: '12px', borderRadius: '8px', fontWeight: 'bold' }}
                >
                    Get Started
                </Button>
            </Paper>
        </Container>
    );
};

export default Home;

