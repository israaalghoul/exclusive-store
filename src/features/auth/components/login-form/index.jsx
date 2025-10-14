import accountSideImg from "../../../../assets/images/png/side-account-img.png";
import { TextField, Button, Box, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { appRoutes } from "../../../../routes";
import { userStorage } from "../../storage";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginFormSchemaValidation } from "./config";
import { useLoginMutation } from "../../services/mutations";
import omit from "lodash/omit";
import styled from "@emotion/styled";

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontSize: "1.6rem",
    fontWeight: 400,
  },
  "& .MuiInputLabel-root": {
    fontSize: "1.6rem",
    opacity: 0.5,
  },
  "& .MuiInputLabel-shrink": {
    fontSize: "1.6rem",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "1.4rem",
  },
}));

export function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginFormSchemaValidation),
  });
  const { mutateAsync: login, isPending } = useLoginMutation();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const redirectTo = params.get("redirect") || appRoutes.home;

  const onSubmitHandler = handleSubmit(async (values) => {
    try {
      const response = await login(omit(values, ["confirmPassword"]));
  userStorage.set(response.token);
  toast.success("Login successfully");
  navigate(redirectTo);
    } catch (e) {
      console.log(e);
      toast.error("Failed to login");
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        direction: "row",
        gap: "12.9rem",
        ml: "-13.5rem",
        paddingTop: "6.0rem",
        paddingBottom: "14.0rem",
      }}
    >
      <Box
        component="img"
        src={accountSideImg}
        alt="account-img"
        sx={{
          display: "block",
          width: { xs: "0rem", sm: "50.0rem", lg: "80.5rem" },
          height: "auto",
        }}
      />
      {/* Header Form */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "2.4rem",
          width: "100%",
          maxWidth: "37.1rem",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          component="p"
          sx={{ fontWeight: 500, fontSize: "3.6rem" }}
        >
          Log in to Exclusive
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{ fontWeight: 400, fontSize: "1.6rem" }}
        >
          Enter your details below
        </Typography>
        {/* Form */}
        <Box
          component="form"
          onSubmit={onSubmitHandler}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3.0rem",
            width: "100%",
            marginTop: "1.0rem",
          }}
        >
          <TextFieldCustom
            label="Name"
            placeholder="Name"
            variant="standard"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
            fullWidth
          />
          <TextFieldCustom
            label="Password"
            placeholder="Password"
            type="password"
            variant="standard"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
            fullWidth
          />
          <Box
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={isPending}
              sx={(theme) => ({
                borderRadius: "4",
                textTransform: "none",
                backgroundColor: theme.palette.custom.btnPrimary.main,
                color: theme.palette.custom.btnPrimary.contrastText,
                height: "5.6rem",
                width: "14.3rem",
              })}
            >
              {isPending ? "Loading..." : "Log In"}
            </Button>
            <Button
              variant="Link"
              onClick={() => navigate(appRoutes.home)}
              sx={(theme) => ({
                textTransform: "none",
                color: theme.palette.custom.btnPrimary.main,
                fontWeight: 500,
              })}
            >
              Forget Password?
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
