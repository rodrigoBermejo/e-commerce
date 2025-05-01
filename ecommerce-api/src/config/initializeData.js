const bcrypt = require("bcrypt");
const faker = require("@faker-js/faker").faker;
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");

async function generateUsers() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultUsers = [
        {
          displayName: "Admin User",
          userName: "admin",
          email: "admin@ecommerce.com",
          passwordHash: await bcrypt.hash("adminpassword", 10),
          role: "admin",
          avatar: faker.image.avatar(),
          phone: "1234567890",
          dateOfBirth: "1980-01-01",
          isActive: true,
        },
        {
          displayName: "Rodrigo Bermejo",
          userName: "rodrigo",
          email: "rodrigo@ecommerce.com",
          passwordHash: await bcrypt.hash("rodrigopassword", 10),
          role: "admin",
          avatar: faker.image.avatar(),
          phone: "9876543210",
          dateOfBirth: "1995-05-15",
          isActive: true,
        },
        {
          displayName: "John Doe",
          userName: "johndoe",
          email: "johndoe@ecommerce.com",
          passwordHash: await bcrypt.hash("randompassword", 10),
          role: "customer",
          avatar: faker.image.avatar(),
          phone: "5555555555",
          dateOfBirth: "2000-10-10",
          isActive: true,
        },
      ];
      await User.insertMany(defaultUsers);
      console.log("Default users created");
    } else {
      console.log("Users already exist in the database");
    }
  } catch (error) {
    console.error("Error initializing data:", error);
    process.exit(1);
  }
}

async function generateCategories() {
  try {
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const mainCategories = [
        {
          name: "Productos Electrónicos",
          description: "Dispositivos electrónicos de alta calidad",
        },
        {
          name: "Gadgets Innovadores",
          description: "Gadgets modernos y útiles para el día a día",
        },
        {
          name: "Accesorios Tecnológicos",
          description: "Accesorios para complementar tus dispositivos",
        },
      ];

      const createdMainCategories = await Category.insertMany(
        mainCategories.map((category) => ({
          ...category,
          imageUrl: faker.image.url({
            width: 640,
            height: 480,
            category: "technology",
          }),
        }))
      );

      for (const mainCategory of createdMainCategories) {
        const subCategories = Array.from({ length: 5 }).map(() => ({
          name: faker.commerce.department(),
          description: faker.commerce.productDescription(),
          parentCategory: mainCategory._id,
          imageUrl: faker.image.url({
            width: 640,
            height: 480,
            category: "technology",
          }),
        }));

        await Category.insertMany(subCategories);
      }
      console.log("Default categories created");
    } else {
      console.log("Categories already exist in the database");
    }
  } catch (error) {
    console.error("Error creating categories:", error);
  }
}

async function generateProducts() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const categories = await Category.find();

      if (categories.length === 0) {
        console.log("No categories found. Please generate categories first.");
        return;
      }

      const products = [];

      for (const category of categories) {
        const categoryProducts = Array.from({ length: 10 }).map(() => ({
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price(10, 1000, 2)),
          category: category._id,
          stock: faker.number.int({ min: 1, max: 100 }),
          imageUrl: faker.image.url(640, 480, "technics", true, true),
        }));

        products.push(...categoryProducts);
      }

      await Product.insertMany(products);
      console.log("Default products created");
    } else {
      console.log("Products already exist in the database");
    }
  } catch (error) {
    console.error("Error creating products:", error);
  }
}

async function initializeData() {
  try {
    await generateUsers();
    await generateCategories();
    await generateProducts();
    console.log("Data initialized successfully");
  } catch (error) {
    console.error("Error on initialize data:", error);
  }
}

module.exports = initializeData;
