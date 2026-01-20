
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Switch,
  Divider,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Image as ImageIcon,
} from "@mui/icons-material";

/* ================= MOCK DATA (API se aayega) ================= */

const banners = [
  {
    id: "BAN001",
    title: "Pure Kosa Silk Collection",
    position: "Homepage Hero",
    imageUrl: "kosa-hero-banner.jpg",
    active: true,
  },
  {
    id: "BAN002",
    title: "Wedding Saree Festival",
    position: "Homepage Section",
    imageUrl: "wedding-banner.jpg",
    active: false,
  },
];

/* ================= COMPONENT ================= */

const BannersTable = () => {
  const handleToggle = (id: string) => {
    console.log("Toggle banner:", id);
    // TODO: API → enable / disable banner
  };

  const handleEdit = (id: string) => {
    console.log("Edit banner:", id);
    // TODO: navigate(`/admin/banners/edit/${id}`)
  };

  const handleDelete = (id: string) => {
    console.log("Delete banner:", id);
    // TODO: confirmation + delete API
  };

  const handleAdd = () => {
    console.log("Add new banner");
    // TODO: navigate(`/admin/banners/add`)
  };

  return (
    <Box className="bg-[#FFFDF9] min-h-screen">
      {/* ===== HEADER ===== */}
      <Box className="mb-6 flex items-center justify-between">
        <div>
          <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
            Banners
          </Typography>
          <Typography variant="body2" className="text-[#7A6A58]">
            Manage homepage hero & promotional banners
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
          Add Banner
        </Button>
      </Box>

      {/* ===== BANNERS LIST ===== */}
      <div className="space-y-4">
        {banners.map((banner) => (
          <Paper
            key={banner.id}
            elevation={0}
            className="rounded-2xl p-5"
            sx={{
              background: "#FFFCF7",
              border: "1px solid #E3D4B6",
            }}
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              {/* LEFT */}
              <div>
                <Typography className="font-semibold text-[#4A1F2A]">
                  {banner.title}
                </Typography>

                <Typography variant="body2" className="text-[#7A6A58]">
                  Placement: {banner.position}
                </Typography>

                <Typography
                  variant="body2"
                  className="text-[#7A6A58] flex items-center gap-1"
                >
                  <ImageIcon fontSize="small" />
                  {banner.imageUrl}
                </Typography>
              </div>

              {/* STATUS */}
              <div className="flex flex-wrap gap-3 items-center">
                <Chip
                  label={banner.position}
                  sx={{ backgroundColor: "#FFF5E7" }}
                />

                <Chip
                  label={banner.active ? "Active" : "Inactive"}
                  sx={{
                    backgroundColor: banner.active
                      ? "#E8F5E9"
                      : "#FDECEA",
                    color: banner.active
                      ? "#2E7D32"
                      : "#D32F2F",
                    fontWeight: 500,
                  }}
                />
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-2 items-center">
                <Switch
                  checked={banner.active}
                  onChange={() => handleToggle(banner.id)}
                />

                <Button size="small" startIcon={<ImageIcon />}>
                  Preview
                </Button>

                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleEdit(banner.id)}
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(banner.id)}
                >
                  Delete
                </Button>
              </div>
            </div>

            <Divider className="mt-4" />
          </Paper>
        ))}
      </div>

      {/* ===== EMPTY STATE ===== */}
      {banners.length === 0 && (
        <Paper
          elevation={0}
          className="rounded-2xl p-10 mt-10 text-center"
          sx={{
            background: "#FFFCF7",
            border: "1px dashed #E3D4B6",
          }}
        >
          <Typography className="text-[#7A6A58]">
            No banners created yet
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default BannersTable;
