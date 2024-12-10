import React from "react";

type DataProduct = {
  id: string;
  name: string;
  price: number;
  size: string;
};

const ProductView = ({ showProduct }: { showProduct: DataProduct }) => {
  return (
    <div className="mb-4 p-4 border rounded">
      <h3 className="text-lg font-semibold">{showProduct.name}</h3>
      <p>Harga: {showProduct.price}</p>
      <p>Ukuran: {showProduct.size}</p>
    </div>
  );
};
export default ProductView;
