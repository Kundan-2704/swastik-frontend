import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Switch,
  TextField,
  FormControlLabel,
} from "@mui/material";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    darkMode: false,
    storeName: "",
    supportEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Seller Settings 👉", settings);
    // 🔜 Future:
    // dispatch(updateSellerSettings(settings))
  };

  return (
    <Box className="p-6 max-w-3xl">
      {/* ================= HEADER ================= */}
      <h1 className="text-2xl font-semibold text-[#4A1F2A] mb-2">
        Settings
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Manage your store preferences and notifications
      </p>

      <Divider className="mb-6" />

      {/* ================= STORE SETTINGS ================= */}
      <h2 className="text-lg font-medium text-[#4A1F2A] mb-4">
        Store Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <TextField
          label="Store Name"
          name="storeName"
          value={settings.storeName}
          onChange={handleChange}
          fullWidth
          size="small"
        />

        <TextField
          label="Support Email"
          name="supportEmail"
          value={settings.supportEmail}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </div>

      <Divider className="mb-6" />

      {/* ================= NOTIFICATION SETTINGS ================= */}
      <h2 className="text-lg font-medium text-[#4A1F2A] mb-4">
        Notifications
      </h2>

      <div className="space-y-3 mb-6">
        <FormControlLabel
          control={
            <Switch
              checked={settings.emailNotifications}
              onChange={handleChange}
              name="emailNotifications"
            />
          }
          label="Email Notifications"
        />

        <FormControlLabel
          control={
            <Switch
              checked={settings.orderNotifications}
              onChange={handleChange}
              name="orderNotifications"
            />
          }
          label="Order Updates Notifications"
        />
      </div>

      <Divider className="mb-6" />

      {/* ================= APPEARANCE ================= */}
      <h2 className="text-lg font-medium text-[#4A1F2A] mb-4">
        Appearance
      </h2>

      <FormControlLabel
        control={
          <Switch
            checked={settings.darkMode}
            onChange={handleChange}
            name="darkMode"
          />
        }
        label="Enable Dark Mode"
      />

      <Divider className="my-6" />

      {/* ================= ACTION ================= */}
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{
          backgroundColor: "#B9935A",
          "&:hover": { backgroundColor: "#A3814F" },
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default Settings;
