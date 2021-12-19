import PropTypes from 'prop-types';
// material
import { Grid, Stack, Typography } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products, ...other }) {
  return (
    <Stack direction="column" alignItems="left" justifyContent="space-between" spacing={10}>
      <Stack spacing={2}>
        <Typography variant="h2" noWrap>
          Physics
        </Typography>
        <Grid container spacing={3} {...other} direction="row">
          {products.map((product, i) => {
            if (i >= 10) return;
            return (
              <>
                <Grid key={product.id} item xs={12} sm={6} md={3}>
                  <ShopProductCard product={product} />
                </Grid>
              </>
            );
          })}
        </Grid>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h2" noWrap>
          Maths
        </Typography>
        <Grid container spacing={3} {...other} direction="row">
          {products.map((product, i) => {
            if (i >= 10) return;
            return (
              <>
                <Grid key={product.id} item xs={12} sm={6} md={3}>
                  <ShopProductCard product={product} />
                </Grid>
              </>
            );
          })}
        </Grid>
      </Stack>
    </Stack>
  );
}
