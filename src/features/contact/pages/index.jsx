import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { alpha, styled } from "@mui/material/styles";
import { appRoutes } from "../../../routes/index";
import { motion } from "framer-motion";
import { Btn } from "../../../shared/components/btn";

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  backgroundColor: "#F5F5F5",
  "& .MuiInputLabel-root": {
    fontSize: "1.6rem",
    color: "#535353ff",
    transform: "translate(9px, 9px) scale(1)",
    transition: "all 0.2s ease",
  },
  "& .MuiInputLabel-shrink": {
    color: "#535353ff",
    transform: "translate(0px, -25px) scale(0.9)",
    marginBottom: "4px",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5681acff",
    },
    "&.Mui-error fieldset": {
      borderColor: "#D32F2F",
    },
    "& .MuiInputBase-input": {
      fontSize: "1.6rem",
      fontWeight: 400,
    },
  },
}));

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
  };

  const cardVariants = {
    hiddenLeft: { opacity: 0, x: -60 },
    hiddenRight: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  return (
    <Box sx={{ padding: 0, py: 10 }}>
      {/* ===== Breadcrumb ===== */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link
          underline="hover"
          color="inherit"
          href={appRoutes.home}
          style={{ fontSize: "1.4rem" }}
        >
          Home
        </Link>
        <Typography color="text.primary" sx={{ fontSize: "1.4rem" }}>
          Contact
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3.75,
          width: "100%",
          mt: 10,
          mb: 7.5,
        }}
      >
        <motion.div
          initial="hiddenLeft"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          style={{ flex: 1 }}
        >
          {/* Left Contact Info */}
          <Paper
            elevation={1}
            sx={{
              flex: 1,
              padding: "3.5rem",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              borderRadius: 0.5,
            }}
          >
            {/* Call Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                mt: "0.5rem",
                direction: "column",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    direction: "row",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "error.main",
                      color: "white",
                      p: 1,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CallIcon sx={{ fontSize: 20 }} />
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="500"
                    fontSize="1.6rem"
                    mb={3}
                  >
                    Call To Us
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  fontWeight="400"
                  fontSize="1.4rem"
                  mb={2}
                >
                  We are available 24/7, 7 days a week.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "400", fontSize: "1.4rem" }}
                >
                  Phone: +8801611112222
                </Typography>
              </Box>
            </Box>

            <Divider />

            {/* Write Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                direction: "column",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    direction: "row",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "error.main",
                      color: "white",
                      p: 1,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 20 }} />
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="500"
                    fontSize="1.6rem"
                    mb={3}
                  >
                    Write To Us
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  fontWeight="400"
                  fontSize="1.4rem"
                  mb={2}
                >
                  Fill out our form and we will contact you within 24 hours.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "400", fontSize: "1.4rem", mb: 2 }}
                  >
                    Emails: customer@exclusive.com
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "400", fontSize: "1.4rem" }}
                  >
                    Emails: support@exclusive.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </motion.div>
        <motion.div
          initial="hiddenRight"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          style={{ flex: 2 }}
        >
          {/* Right Form Section */}
          <Paper elevation={1} sx={{ flex: 2, px: 4, py: 5 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Row of Inputs */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                  mb: 4.5,
                  borderRadius: 0.5,
                }}
              >
                <TextFieldCustom
                  label={
                    <span>
                      Your Name <span style={{ color: "#D32F2F" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextFieldCustom
                  label={
                    <span>
                      Your Email <span style={{ color: "#D32F2F" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextFieldCustom
                  label={
                    <span>
                      Your Phone <span style={{ color: "#D32F2F" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("phone", { required: "Phone is required" })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Box>

              {/* Message */}
              <TextFieldCustom
                label="Your Message"
                multiline
                rows={8}
                variant="outlined"
                fullWidth
                {...register("message")}
              />

              {/* Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 4.5,
                }}
              >
                <Btn
                  btnName="Send Message"
                  variantColor="btnPrimary"
                  px="0rem"
                  py="0rem"
                  width="23.0rem"
                  height="5.6rem"
                />
              </Box>
            </form>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}
