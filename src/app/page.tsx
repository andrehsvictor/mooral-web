import { Button, Typography, Container, Box, Card, CardContent } from '@mui/material';
import { Home as HomeIcon, Star as StarIcon, Favorite as FavoriteIcon } from '@mui/icons-material';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          <HomeIcon sx={{ mr: 2, fontSize: 'inherit' }} />
          Mooral Web
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
          Bem-vindo ao seu projeto com Material UI!
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<StarIcon />}>
            Botão Principal
          </Button>
          <Button variant="outlined" startIcon={<FavoriteIcon />}>
            Botão Secundário
          </Button>
        </Box>

        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              Material UI está funcionando!
            </Typography>
            <Typography variant="body1">
              Este é um exemplo de como usar componentes do Material UI em seu projeto Next.js.
              Você agora tem acesso a todos os componentes e ícones do Material UI.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
