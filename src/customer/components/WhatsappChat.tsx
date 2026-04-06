import React, { useEffect, useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Box,
  Fab,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";

interface Props {
  productName?: string;
}

const WhatsappChat: React.FC<Props> = ({ productName }) => {

  const phoneNumber = "919244576470";

  const message =
`Hi, I'm interested in ${productName ?? "your handloom sarees"}.

Mujhe is saree ke baare me details chahiye.
Fabric • Price • Delivery • Styling advice`;

  const whatsappUrl =
`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /* brand colors */
  const brand = "#4A1F2A";
  const gold = "#B9935A";

  /* typing texts */
  const texts = [
    "Need help choosing perfect saree?",
    "Handloom expert se baat kare",
    "Get best price for this saree",
    "Limited artisan piece available",
    "WhatsApp for styling advice"
  ];

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  /* show after 5 sec */
  useEffect(() => {

    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);

  }, []);

  /* typing animation */
  useEffect(() => {

    if (!showPopup) return;

    let charIndex = 0;

    const typing = setInterval(() => {

      setDisplayText(texts[textIndex].slice(0, charIndex));

      charIndex++;

      if (charIndex > texts[textIndex].length) {

        clearInterval(typing);

        setTimeout(() => {

          setTextIndex((prev) => (prev + 1) % texts.length);

          setDisplayText("");

        }, 1800);

      }

    }, 35);

    return () => clearInterval(typing);

  }, [textIndex, showPopup]);

  return (

    <Box
      component="a"
      href={whatsappUrl}
      target="_blank"

      sx={{

        position: "fixed",

        bottom: isMobile ? 85 : 35,

        right: 22,

        display: "flex",

        alignItems: "center",

        gap: 1.2,

        textDecoration: "none",

        zIndex: 9999

      }}
    >

      {/* text bubble */}
      {showPopup && (

        <Typography
          sx={{

            background: "#fff",

            color: brand,

            px: 2,

            py: "8px",

            borderRadius: "30px",

            fontSize: 13.5,

            fontWeight: 500,

            border: `1px solid ${gold}`,

            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",

            maxWidth: 230,

            animation: "fadeSlide 0.5s ease",

            "@keyframes fadeSlide": {

              from: {
                opacity: 0,
                transform: "translateY(10px)"
              },

              to: {
                opacity: 1,
                transform: "translateY(0)"
              }

            }

          }}
        >

          {displayText}

        </Typography>

      )}

      {/* icon */}
      <Fab
        sx={{

          background: brand,

          color: "#fff",

          width: 56,

          height: 56,

          "&:hover": {

            background: "#3a1821"

          },

          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",

          animation: "softPulse 3s infinite",

          "@keyframes softPulse": {

            "0%": {

              boxShadow:
"0 0 0 0 rgba(185,147,90,0.5)"

            },

            "70%": {

              boxShadow:
"0 0 0 14px rgba(185,147,90,0)"

            },

            "100%": {

              boxShadow:
"0 0 0 0 rgba(185,147,90,0)"

            }

          }

        }}
      >

        <WhatsAppIcon />

      </Fab>

    </Box>

  );

};

export default WhatsappChat;