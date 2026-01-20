import { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  AccountTree,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { deleteCategory, fetchCategories } from "../../Redux Toolkit/Features/Admin/CategorySlice";

/* ================= HELPERS ================= */

const levelLabel = (level: number) => {
  if (level === 1) return "Main Category";
  if (level === 2) return "Sub Category";
  return "Child Category";
};

/* ================= COMPONENT ================= */

const CategoriesTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { categories, loading } = useAppSelector(
    (state) => state.category
  );

  /* ===== FETCH ON LOAD ===== */
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  /* ===== ACTIONS ===== */

  const handleAdd = () => {
    navigate("/admin/categories/add");
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/categories/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <Box className="bg-[#FFFDF9] min-h-screen">
      {/* ===== HEADER ===== */}
      <Box className="mb-6 flex items-center justify-between">
        <div>
          <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
            Categories
          </Typography>
          <Typography variant="body2" className="text-[#7A6A58]">
            Manage saree categories & hierarchy
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
          sx={{
            backgroundColor: "#B9935A",
            "&:hover": { backgroundColor: "#A8844E" },
          }}
        >
          Add Category
        </Button>
      </Box>

      {/* ===== LOADING ===== */}
      {loading && (
        <Box className="flex justify-center mt-20">
          <CircularProgress />
        </Box>
      )}

      {/* ===== CATEGORY LIST ===== */}
      {!loading && categories.length > 0 && (
        <div className="space-y-4">
          {categories.map((cat) => (
            <Paper
              key={cat.id}
              elevation={0}
              className="rounded-2xl p-5"
              sx={{
                background: "#FFFCF7",
                border: "1px solid #E3D4B6",
              }}
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AccountTree className="text-[#B9935A]" />
                  <div>
                    <Typography className="font-semibold text-[#4A1F2A]">
                      {cat.name}
                    </Typography>
                    <Typography variant="body2" className="text-[#7A6A58]">
                      Parent: {cat.parent || "-"}
                    </Typography>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <Chip label={levelLabel(cat.level)} />
                  <Chip
                    label={cat.active ? "Active" : "Inactive"}
                    color={cat.active ? "success" : "error"}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEdit(cat.id)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <Divider className="mt-4" />
            </Paper>
          ))}
        </div>
      )}

      {/* ===== EMPTY ===== */}
      {!loading && categories.length === 0 && (
        <Typography className="text-center text-[#7A6A58] mt-20">
          No categories found
        </Typography>
      )}
    </Box>
  );
};

export default CategoriesTable;
