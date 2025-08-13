import { Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 3,
        padding: 3,
      }}
    >
      <Typography variant="h4" align="center" color="primary.main">
        Welcome to Mooral
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary">
        Your application is ready!
      </Typography>
      <Link href="/login" passHref>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: '#2c4461',
            },
          }}
        >
          Go to Login
        </Button>
      </Link>
    </Box>
  );
}
