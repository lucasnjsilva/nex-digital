import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ProductCard({ product }) {
  const { name, price, image } = product;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="250"
        image={image}
        alt="Imagem"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          R$ {price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
