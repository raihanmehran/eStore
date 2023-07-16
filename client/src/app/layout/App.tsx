import { useEffect, useState } from "react";
import { Product } from "../models/product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5240/api/Products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {
    // setProducts([...products, { name: "Product D", price: 29.5 }]);
    setProducts((preState) => [
      ...preState,
      {
        id: preState.length + 99,
        name: "Product " + (preState.length + 1),
        price: preState.length * 10,
        brand: "some brand",
        description: "something else here.",
        pictureUrl: "http://picsum.photos/200",
      },
    ]);
  }

  return (
    <div>
      <h3 style={{ color: "red" }}>eStore</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} - {product.brand}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
