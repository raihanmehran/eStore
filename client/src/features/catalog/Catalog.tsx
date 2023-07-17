import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
  products: Product[];
  addProduct: () => void;
}

export default function Catalog({ products, addProduct }: Props) {
  return (
    <>
      <List>
        {products.map((product: Product) => (
          <ListItem key={product.id}>
            <ListItemAvatar>
              <Avatar src={product.pictureUrl}></Avatar>
            </ListItemAvatar>
            <ListItemText>
              {product.name} - {product.price} - {product.brand}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="inherit" onClick={addProduct}>
        Add Product
      </Button>
    </>
  );
}
