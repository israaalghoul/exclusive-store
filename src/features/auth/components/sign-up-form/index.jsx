import accountSideImg from "../../../../assets/images/png/side-account-img.png";
import googleIconImg from "../../../../assets/images/main/google-icon.svg";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useSignUpMutation } from "../../services/mutations";
import { signUpFormSchemaValidation } from "./config";
import { yupResolver } from "@hookform/resolvers/yup";
import { appRoutes } from "../../../../routes";
import { userStorage } from "../../storage";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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

export function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signUpFormSchemaValidation),
  });
  const { mutateAsync: signUp, isPending } = useSignUpMutation();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const redirectTo = params.get("redirect") || appRoutes.home;

  const onSubmitHandler = handleSubmit(async (values) => {
    try {
      const response = await signUp(omit(values, ["confirmPassword"]));
  userStorage.set(response.token);
  toast.success("Sign up successfully");
  navigate(redirectTo);
    } catch (e) {
      console.log(e);
      toast.error("Failed to sign up");
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
          Create an account
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
            label="Email or Phone Number"
            placeholder="Email or Phone Number"
            variant="standard"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
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
            })}
          >
            {isPending ? "Loading..." : "Create Account"}
          </Button>

          <Button
            variant="contained"
            sx={(theme) => ({
              borderRadius: "4",
              textTransform: "none",
              backgroundColor: "transparent",
              display: "flex",
              textAlign: "center",
              gap: "1.6rem",
              height: "5.6rem",
              border: "1px solid rgba(0, 0, 0, 0.40)",
            })}
          >
            <Box
              component="img"
              src={googleIconImg}
              alt="google-icon"
              sx={{
                width: { xs: 24, sm: 24, lg: 24 },
                height: "auto",
                display: "block",
              }}
            />
            <Typography sx={{ fontSize: "1.6rem", fontWeight: 400 }}>
              Sign up with Google
            </Typography>
          </Button>

          <Typography
            sx={{ fontSize: "1.6rem", fontWeight: 400, textAlign: "center" }}
          >
            Already have account?
            <Button
              variant="Link"
              onClick={() => navigate(appRoutes.auth.login)}
              sx={{
                textTransform: "none",
                textDecoration: "underline",
                fontWeight: 500,
              }}
            >
              Log in
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

