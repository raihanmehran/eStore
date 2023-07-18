import {
  Avatar,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "black", color: "whitesmoke" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "lightgoldenrodyellow",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography gutterBottom>
          {product.brand} | {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ bgcolor: "black", color: "white" }}
          size="small"
        >
          Add To Cart
        </Button>
        <Button
          color="inherit"
          size="small"
          component={Link}
          to={`/catalog/${product.id}`}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
