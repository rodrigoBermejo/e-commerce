import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../services/categoryService";

const CategoryDrawer = ({ open, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    getCategories();
  }, []);

  // Organizar jerarquía padre -> hijos
  const parentCategories = categories.filter((cat) => !cat.parentCategory);
  const subCategoriesMap = categories.reduce((acc, cat) => {
    if (cat.parentCategory) {
      const parentId = cat.parentCategory._id;
      acc[parentId] = acc[parentId] || [];
      acc[parentId].push(cat);
    }
    return acc;
  }, {});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        <ListItem>
          <ListItemText
            primary="Categories"
            primaryTypographyProps={{ fontWeight: "bold" }}
          />
        </ListItem>
        <Divider />

        {parentCategories.map((parent) => (
          <React.Fragment key={parent._id}>
            <ListItem button onClick={() => toggleExpand(parent._id)}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={parent.name} />
              {expanded[parent._id] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={expanded[parent._id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {(subCategoriesMap[parent._id] || []).map((sub) => (
                  <ListItem
                    key={sub._id}
                    component={Link}
                    to={`/category/${sub._id}`}
                    sx={{ pl: 4 }}
                    onClick={onClose}
                  >
                    <ListItemText primary={sub.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default CategoryDrawer;
