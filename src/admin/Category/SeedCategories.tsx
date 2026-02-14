import axios from "axios";
import { Box, Button, Typography, Alert } from "@mui/material";
import { useState } from "react";

// 🔹 CATEGORY DATA (same as before)
import { mainCategory } from "../../Data/Category/mainCategory";
import { kosaLevelTwo } from "../../Data/Category/levelTwo/kosaLevelTwo";
import { kosaLevelThree } from "../../Data/Category/levelThree/kosaLevelThree";
import { tussarLevelTwo } from "../../Data/Category/levelTwo/tassarLevelTwo";
import { tussarLevelThree } from "../../Data/Category/levelThree/tassarLevelThree";
import { handloomLevelTwo } from "../../Data/Category/levelTwo/handloomLevelTwo";
import { handloomLevelThree } from "../../Data/Category/levelThree/handloomLevelThree";
import { dailyWearLevelTwo } from "../../Data/Category/levelTwo/dailyWearLevelTwo";
import { dailyWearLevelThree } from "../../Data/Category/levelThree/dailyWearLevelThree";
import { printedLevelTwo } from "../../Data/Category/levelTwo/printedLevelTwo";
import { printedLevelThree } from "../../Data/Category/levelThree/printedLevelThree";
import { weddingLevelTwo } from "../../Data/Category/levelTwo/weddingLevelTwo";
import { weddingLevelThree } from "../../Data/Category/levelThree/weddingLevelThree";
import { menLevelTwo } from "../../Data/Category/levelTwo/menLevelTwo";
import {  menLevelThree } from "../../Data/Category/levelThree/menLevelThree";
import { womenLevelTwo } from "../../Data/Category/levelTwo/womenLevelTwo";
import { womenLevelThree } from "../../Data/Category/levelThree/womenLevelThree";


const SeedCategories = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSeedCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const allCategories = [
        ...mainCategory,

        ...kosaLevelTwo,
        ...kosaLevelThree,

        ...tussarLevelTwo,
        ...tussarLevelThree,

        ...handloomLevelTwo,
        ...handloomLevelThree,

        ...dailyWearLevelTwo,
        ...dailyWearLevelThree,

        ...printedLevelTwo,
        ...printedLevelThree,

        ...weddingLevelTwo,
        ...weddingLevelThree,

        ...menLevelTwo,
        ...menLevelThree,

        ...womenLevelTwo,
        ...womenLevelThree,

        

      ];

      // await axios.post("/api/categories/seed", allCategories);
      axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/api/categories/seed`,
  allCategories
);


      setSuccess("✅ Categories seeded / updated successfully");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "❌ Category seeding failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4} maxWidth={600}>
      <Typography variant="h6" mb={2}>
        ⚠️ Category Seeder (Run Anytime – Safe)
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        • Duplicate-safe (upsert enabled)  
        • Existing categories will update  
        • New categories will be added  
        • No data deletion
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        color="error"
        onClick={handleSeedCategories}
        disabled={loading}
      >
        {loading ? "Seeding..." : "Seed Categories"}
      </Button>
    </Box>
  );
};

export default SeedCategories;



