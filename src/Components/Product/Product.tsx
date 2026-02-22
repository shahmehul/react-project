import React, { useEffect, useState } from "react";
import "./Product.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 15; // products per page

  const fetchProducts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError("");

      const skip = (pageNumber - 1) * limit;
      const res = await fetch(
        `https://dummyjson.com/products/search?q=phone&limit=${limit}&skip=${skip}`
      );

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data.products ?? []);
      setTotal(data.total ?? 0);
    } catch {
      setError("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const formatPrice = (price:any) => {
    if (price == null || isNaN(price)) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(Number(price));
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="page">
      <h1 className="page-title">Product Catalog</h1>

      {loading && <p className="status">Loading products…</p>}
      {error && <p className="status error">{error}</p>}

      <div className="grid">
        {products.map((product:any) => (
          <div className="card" key={product?.id}>
            <div className="image-wrapper">
              <img
                src={product?.thumbnail || product?.images?.[0]}
                alt={product?.title ?? "Product image"}
              />
            </div>
            <div className="card-body">
              <h3 className="title">{product?.title ?? "Untitled"}</h3>
              <p className="price">{formatPrice(product?.price)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Product;