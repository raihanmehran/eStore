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
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

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
          {currencyFormat(product.price)}
        </Typography>
        <Typography gutterBottom>
          {product.brand} | {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size="small"
          variant="contained"
          sx={{ bgcolor: "black", color: "white" }}
        >
          Add to Cart
        </LoadingButton>
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
