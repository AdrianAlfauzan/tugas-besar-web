import { useEffect, useState } from "react";
import ProductView from "@/views/product";

type DataProduct = {
  id: string;
  name: string;
  price: number;
  size: string;
};

const ProductPage = () => {
  const [products, setProducts] = useState<DataProduct[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mengambil data produk saat komponen pertama kali di-render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/ApiProduct");
        const data = await response.json();

        // Pastikan data.response berisi data yang diinginkan
        setProducts(data.dataProduct || []); // Menggunakan data.dataProduct
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Kosongkan array dependencies, hanya dijalankan sekali saat mount

  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4" id="judul">
        Product Page
      </h1>
      {isLoading ? <p>Loading...</p> : products.length === 0 ? <p>Tidak Ada Product</p> : products.map((itemProduck: DataProduct) => <ProductView key={itemProduck.id} showProduct={itemProduck} />)}
    </div>
  );
};

export default ProductPage;
