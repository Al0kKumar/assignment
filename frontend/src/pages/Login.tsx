import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Avatar, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { LockOutlined } from '@mui/icons-material';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username) {
            
            router.push(`/Comments?username=${encodeURIComponent(username)}`);
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: '40px' }}>
            <Paper elevation={4} style={{ padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
                <Avatar style={{ margin: 'auto', backgroundColor: '#3f51b5' }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5" style={{ margin: '16px 0', fontWeight: 'bold' }}>
                    Welcome Back!
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Please enter your username to continue.
                </Typography>
                <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        style={{ marginBottom: '16px' }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ padding: '10px', borderRadius: '8px', fontWeight: 'bold' }}
                    >
                        Continue
                    </Button>
                </form>
            </Paper>
           
                <Typography variant="caption" color="textSecondary">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </Typography>
            
        </Container>
    );
};

export default Login;
