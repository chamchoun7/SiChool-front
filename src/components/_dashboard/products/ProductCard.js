import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Rating
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ExpandMore, Download } from '@mui/icons-material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { name, cover, price, colors, status, priceSale } = product;

  return (
    <Card>
      <Box sx={{ pt: '50%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={name} src={cover} />
      </Box>

      <Stack spacing={1} sx={{ p: 2 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              textAlign="left"
            >
              <Typography>Course name</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontSize: 12 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Link>
        <Button variant="contained" endIcon={<Download />}>
          Download
        </Button>
        <Stack direction="column" textAlign="center" alignItems="center" sx={{ pt: 1 }}>
          <Typography sx={{ fontSize: 10, opacity: 0.7 }}>Difficulty</Typography>
          <Rating value={2} size="small" />
        </Stack>
      </Stack>
    </Card>
  );
}
