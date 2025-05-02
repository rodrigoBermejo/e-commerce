import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/cart`;

const getToken = () => localStorage.getItem("token");

const getUserIdFromToken = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.id || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const fetchCart = async () => {
  const token = getToken();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (token) {
    const userId = getUserIdFromToken();
    try {
      const response = await axios.get(`${API_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      if (cart.length > 0) {
        try {
          cart.forEach(async (item) => {
            try {
              //await axios.post(`${API_URL}`,{ userId, productId: item.productId, quantity: item.quantity },{ headers: { Authorization: `Bearer ${token}` } });
              console.log("Product added to cart:", {
                userId,
                productId: item.productId,
                quantity: item.quantity,
              });
            } catch (error) {
              console.error("Error adding product to cart:", error);
            }
            return { products: cart };
          });
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    }
  } else {
    return { products: cart };
  }
};

export const addProductToCart = async (
  product,
  cart,
  setCart,
  setSnackbarMessage
) => {
  const token = getToken();
  const productId = product._id;

  if (token) {
    const userId = getUserIdFromToken();
    try {
      await axios.post(
        `${API_URL}`,
        { userId, productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage(`${product.name} added to cart`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setSnackbarMessage("Error adding to cart");
    }
  } else {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.productId === productId);
    if (index >= 0) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ productId, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setSnackbarMessage(`${product.name} added to cart`);
  }
};

export const removeProductFromCart = async (
  productId,
  cart,
  setCart,
  setSnackbarMessage
) => {
  const token = getToken();

  if (token) {
    const userId = getUserIdFromToken();
    try {
      await axios.delete(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { userId, productId },
      });
      setSnackbarMessage("Product removed from cart");
    } catch (error) {
      console.error("Error removing product:", error);
      setSnackbarMessage("Error removing product");
    }
  } else {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setSnackbarMessage("Product removed");
  }
};

export const clearCart = async (setCart, setSnackbarMessage) => {
  const token = getToken();

  if (token) {
    const userId = getUserIdFromToken();
    try {
      await axios.delete(`${API_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbarMessage("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      setSnackbarMessage("Error clearing cart");
    }
  } else {
    localStorage.removeItem("cart");
    setSnackbarMessage("Cart cleared");
  }
  setCart([]);
};
