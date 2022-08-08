import React, { useState, useEffect, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import ProductCard from '../../components/ProductCard';
import api from '../../services/api';

function Home() {
  const [products, setProducts] = useState([]);

  const handleSignOut = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');

    window.location.reload();
  }

  const getProducts = useCallback(async () => await api.get('/products').then((response) => setProducts(response.data)), []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            List Products
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container mt={5} rowSpacing={2} columnSpacing={3}>
          {
            products.map((product) => (
              <Grid item xs={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;