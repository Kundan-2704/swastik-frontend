import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import AddressForm from "./AddressForm";

const AddressDialog = ({ open, onClose }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          margin: isMobile ? 0 : "auto",
          width: isMobile ? "100%" : "auto",
          maxHeight: isMobile ? "92vh" : "90vh",
          borderRadius: isMobile ? "16px 16px 0 0" : "24px",
          position: isMobile ? "fixed" : "relative",
          bottom: isMobile ? 0 : "auto",
        },
      }}
    >
      <AddressForm onClose={onClose} />
    </Dialog>
  );
};

export default AddressDialog;
