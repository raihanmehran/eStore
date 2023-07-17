import { Product } from "../../app/models/product";

interface Props {
  products: Product[];
  addProduct: () => void;
}

export default function Catalog({ products, addProduct }: Props) {
  return (
    <>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            {product.name} - {product.price} - {product.brand}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </>
  );
}
