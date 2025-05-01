import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { fetchProductsByCategory } from "../services/productService";
import MainLayout from "../layout/MainLayout";
import ProductCard from "../components/products/ProductCard";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProductsByCategory(categoryId);
        setProducts(data);

        if (data.length > 0) {
          setCategoryName(data[0].category.name);
        } else {
          setCategoryName("Without Category");
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setCategoryName("Error loading categories");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <MainLayout>
        <Typography variant="h5" align="center">
          Loading products...
        </Typography>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        {categoryName}
      </Typography>
      <Grid container spacing={4}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ width: "100%" }}>
            No products available for this category.
          </Typography>
        )}
      </Grid>
    </MainLayout>
  );
};

export default CategoryPage;
