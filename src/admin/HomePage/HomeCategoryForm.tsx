import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import type { HomeCategory } from "./HomeCategoryTypes";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: HomeCategory) => void;
  editData: HomeCategory | null;
}

const HomeCategoryForm = ({
  open,
  onClose,
  onSave,
  editData,
}: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    section: "",
    image: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        categoryId: editData.categoryId,
        section: editData.section,
        image: editData.image,
      });
    } else {
      setFormData({
        name: "",
        categoryId: "",
        section: "",
        image: "",
      });
    }
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Saving image:", formData.image);

    onSave({
      ...editData,
      ...formData,
    } as HomeCategory);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {editData ? "Edit Category" : "Add Category"}
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Category Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="dense"
        />

        <TextField
          fullWidth
          label="Category ID"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          margin="dense"
        />

        <TextField
          fullWidth
          label="Section"
          name="section"
          value={formData.section}
          onChange={handleChange}
          margin="dense"
        />

        <TextField
          fullWidth
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          margin="dense"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HomeCategoryForm;
