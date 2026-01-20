// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Button,
//   MenuItem,
//   Box,
// } from "@mui/material";
// import type { HomeCategory } from "./HomeCategoryTypes";

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   onSave: (data: HomeCategory) => void;
//   editData?: HomeCategory | null;
// };

// const HomeCategoryForm: React.FC<Props> = ({
//   open,
//   onClose,
//   onSave,
//   editData,
// }) => {
//   const [form, setForm] = useState<HomeCategory>({
//     categoryId: "",
//     section: "home_categories",
//     name: "",
//     image: "",
//   });

//   useEffect(() => {
//     if (editData) setForm(editData);
//   }, [editData]);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>
//         {editData ? "Edit Home Category" : "Add Home Category"}
//       </DialogTitle>

//       <DialogContent>
//         <Box display="flex" flexDirection="column" gap={2} mt={1}>
//           <TextField
//             label="Category ID"
//             name="categoryId"
//             value={form.categoryId}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             select
//             label="Section"
//             name="section"
//             value={form.section}
//             onChange={handleChange}
//           >
//             <MenuItem value="home_categories">Home Categories</MenuItem>
//             <MenuItem value="grid">Grid</MenuItem>
//             <MenuItem value="shop_by_categories">
//               Shop By Categories
//             </MenuItem>
//           </TextField>

//           <TextField
//             label="Display Name"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="Image URL"
//             name="image"
//             value={form.image}
//             onChange={handleChange}
//             fullWidth
//           />

//           {form.image && (
//             <img
//               src={form.image}
//               alt="preview"
//               style={{
//                 width: "100%",
//                 height: 180,
//                 objectFit: "cover",
//                 borderRadius: 8,
//               }}
//             />
//           )}

//           <Button
//             variant="contained"
//             onClick={() => {
//               onSave(form);
//               onClose();
//             }}
//           >
//             Save
//           </Button>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default HomeCategoryForm;





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
