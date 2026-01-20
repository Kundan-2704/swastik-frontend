import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  fetchHomeCategories,
  createHomeCategory,
  updateHomeCategory,
} from "../../Redux Toolkit/Features/Customer/HomeCategorySlice";
import HomeCategoryForm from "./HomeCategoryForm";
import type { HomeCategory } from "./HomeCategoryTypes";

const HomeCategoryTable = () => {
  const dispatch = useAppDispatch();

  const { categories, loading } = useAppSelector(
    (state) => state.homeCategory
  );

  const [open, setOpen] = useState(false);
  const [editData, setEditData] =
    useState<HomeCategory | null>(null);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    dispatch(fetchHomeCategories());
  }, [dispatch]);

  const handleSave = (data: HomeCategory) => {
    if (editData?._id) {
      dispatch(
        updateHomeCategory({
          id: editData._id,
          data,
        })
      );
    } else {
      dispatch(createHomeCategory(data));
    }

    setOpen(false);
    setEditData(null);
  };

  if (loading) {
    return (
      <Box
        height="70vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
      >
        <h2>Home Page Categories</h2>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category ID</TableCell>
              <TableCell>Section</TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <img
                    src={`${item.image}?t=${Date.now()}`}
                    alt={item.name}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                </TableCell>

                <TableCell>{item.name}</TableCell>
                <TableCell>{item.categoryId}</TableCell>

                <TableCell>
                  <Chip
                    label={item.section}
                    size="small"
                  />
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setEditData(item);
                      setOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>

                  {/* DELETE future me backend se */}
                  <IconButton
                    color="error"
                    disabled
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <HomeCategoryForm
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        editData={editData}
      />
    </Box>
  );
};

export default HomeCategoryTable;
