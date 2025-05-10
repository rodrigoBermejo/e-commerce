import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/cart`;

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

const syncLocalCartToServer = async (localCart, userId, token) => {
  if (localCart.length > 0) {
    if (!token) {
      console.error("No token provided");
      return { products: localCart };
    }
    try {
      const response = await axios.post(
        `${API_URL}/sync`,
        {
          userId,
          products: localCart.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("cart");

      return response.data;
    } catch (error) {
      if (error?.response?.status === 403) {
        localStorage.removeItem("token");
        return { products: localCart };
      } else {
        console.error("Error syncing cart:", error?.response?.data || error);
        return { products: localCart };
      }
    }
  } else {
    return { products: [] };
  }
};

export const fetchCart = async () => {
  const token = getToken();
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];

  if (token) {
    const userId = getUserIdFromToken();
    try {
      const response = await axios.get(`${API_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error?.response?.status === 404) {
        return await syncLocalCartToServer(localCart, userId, token);
      }
      if (error?.response?.status === 403) {
        localStorage.removeItem("token");
        return { products: localCart };
      }
    }
  } else {
    return { products: localCart };
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
        API_URL,
        { userId, productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage(`${product.name} added to cart`);
    } catch (error) {
      if (error?.response?.status === 403) {
        localStorage.removeItem("token");
        setSnackbarMessage("Token expired");
      } else {
        console.error("Error adding product to cart:", error);
        setSnackbarMessage("Error adding to cart");
      }
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
      await axios.delete(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        data: { userId, productId },
      });
      setSnackbarMessage("Product removed from cart");
    } catch (error) {
      if (error?.response?.status === 403) {
        localStorage.removeItem("token");
        setSnackbarMessage("Token expired");
      } else {
        console.error("Error removing product from cart:", error);
        setSnackbarMessage("Error removing product");
      }
    }
  } else {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setSnackbarMessage("Product removed");
  }
};

export const clearCart = async (setCart) => {
  const token = getToken();

  if (token) {
    const userId = getUserIdFromToken();
    try {
      await axios.delete(`${API_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      if (error?.response?.status === 403) {
        localStorage.removeItem("token");
      } else {
        console.error("Error clearing cart:", error);
      }
    }
  } else {
    localStorage.removeItem("cart");
  }
};
