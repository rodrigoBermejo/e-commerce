import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchProducts } from "../services/productService";
import MainLayout from "../layout/MainLayout";
import BannerCarousel from "../layout/molecules/BannerCarousel";
import ProductCard from "../components/products/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [cart, setCart] = useState([]); // Estado para manejar el carrito

  const banners = [
    "./assets/img/placeholder.png",
    "https://placehold.co/1500x300/orange/white?text=Banner",
    "https://placehold.co/1500x300/green/white?text=Banner",
    "https://placehold.co/1500x300/blue/white?text=Banner",
    "https://placehold.co/1500x300/black/white?text=Banner",
    "https://placehold.co/1500x300/gray/white?text=Banner",
    "https://placehold.co/1500x300/purple/white?text=Banner",
    "https://placehold.co/1500x300/pink/white?text=Banner",
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);

        const allCategories = data.reduce((acc, product) => {
          const categoryName = product.category?.name || "Sin Categoría";
          if (!acc.includes(categoryName)) {
            acc.push(categoryName);
          }
          return acc;
        }, []);
        setExpandedCategories(allCategories);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  const groupedProducts = products.reduce((acc, product) => {
    const categoryName = product.category?.name || "Sin Categoría";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {});

  const handleAccordionChange = (categoryName) => (event, isExpanded) => {
    setExpandedCategories((prev) =>
      isExpanded
        ? [...prev, categoryName]
        : prev.filter((name) => name !== categoryName)
    );
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log("Product Added to Cart:", product);
  };

  return (
    <MainLayout>
      {/* Banner Carousel */}
      <BannerCarousel banners={banners} />

      {/* Product List Grouped by Category */}
      {Object.keys(groupedProducts).map((categoryName) => (
        <Accordion
          key={categoryName}
          sx={{ marginBottom: 2 }}
          expanded={expandedCategories.includes(categoryName)}
          onChange={handleAccordionChange(categoryName)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${categoryName}-content`}
            id={`${categoryName}-header`}
          >
            <Typography variant="h5">{categoryName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={4}>
              {groupedProducts[categoryName].map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </MainLayout>
  );
};

export default Home;
