import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Typography,
  Avatar,
  Rating,
  Chip,
} from "@mui/material";
import { Star, ShoppingBag } from "@mui/icons-material";

const Reviews = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box className="p-8 bg-[#fdf9f3] min-h-screen space-y-8">
      {/* Header */}
      <Typography variant="h4" fontWeight={700} className="text-[#3a2a1a]">
        Customer Reviews
      </Typography>

      {/* Summary */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent>
                <Skeleton width="60%" />
                <Skeleton width="80%" height={40} />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <SummaryCard title="Total Reviews" value="428" />
            <SummaryCard title="Average Rating" value="4.6 ★" />
            <SummaryCard title="Products Reviewed" value="96" />
          </>
        )}
      </Box>

      {/* Reviews List */}
      <Card className="rounded-2xl shadow-sm border border-[#eee2d3]">
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={700}
            className="text-[#3a2a1a]"
          >
            Latest Reviews
          </Typography>

          <Divider className="!my-4 !border-[#d2b48c]" />

          {loading ? (
            [...Array(4)].map((_, i) => (
              <Skeleton key={i} height={80} className="mb-4" />
            ))
          ) : (
            <Box className="space-y-6">
              <ReviewRow
                name="Anita Sharma"
                product="Kosa Silk Saree"
                rating={5}
                review="Beautiful handloom quality, exactly as shown!"
              />
              <ReviewRow
                name="Pooja Verma"
                product="Tussar Saree"
                rating={4}
                review="Very elegant, delivery was slightly late."
              />
              <ReviewRow
                name="Neha Gupta"
                product="Handloom Dupatta"
                rating={5}
                review="Loved the fabric and finishing!"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reviews;

/* ---------------- Components ---------------- */

const SummaryCard = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <Card className="rounded-2xl shadow-sm border border-[#eee2d3]">
      <CardContent>
        <Typography className="text-[#a77a43]" fontWeight={600}>
          {title}
        </Typography>
        <Typography
          variant="h5"
          fontWeight={700}
          className="text-[#3a2a1a]"
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ReviewRow = ({
  name,
  product,
  rating,
  review,
}: {
  name: string;
  product: string;
  rating: number;
  review: string;
}) => {
  return (
    <Box className="flex gap-4 items-start">
      <Avatar className="!bg-[#a77a43]">
        {name.charAt(0)}
      </Avatar>

      <Box className="flex-1">
        <Typography fontWeight={600} className="text-[#3a2a1a]">
          {name}
        </Typography>
        <Typography className="text-sm text-gray-600">
          {product}
        </Typography>

        <Rating value={rating} readOnly size="small" />

        <Typography className="mt-2 text-[#3a2a1a]">
          {review}
        </Typography>
      </Box>

      <Chip
        icon={<Star />}
        label={`${rating}/5`}
        className="!bg-[#f3e2c7] !text-[#3a2a1a]"
        size="small"
      />
    </Box>
  );
};
