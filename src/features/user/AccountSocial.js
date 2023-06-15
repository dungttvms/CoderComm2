import React from "react";
import { LinkedIn, Instagram, Facebook, Twitter } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Card, InputAdornment, Stack } from "@mui/material";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { updateUserProfile } from "./userSlice";

const SOCIAL_LINKS = [
  {
    value: "facebookLink",
    icon: <Facebook sx={{ fontSize: 30 }} />,
  },
  {
    value: "linkedinLink",
    icon: <LinkedIn sx={{ fontSize: 30 }} />,
  },
  {
    value: "twitterLink",
    icon: <Twitter sx={{ fontSize: 30 }} />,
  },
  {
    value: "instagramLink",
    icon: <Instagram sx={{ fontSize: 30 }} />,
  },
];

function AccountSocial() {
  const { user } = useAuth();
  const isLoading = useSelector((state) => state.user.isLoading);
  const defaultValues = {
    facebookLink: user?.facebookLink || "",
    instagramLink: user?.instagramLink || "",
    twitterLink: user?.twitterLink || "",
    linkedinLink: user?.linkedinLink || "",
  };
  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <FTextField
              key={link.value}
              name={link.value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{link.icon}</InputAdornment>
                ),
              }}
            />
          ))}
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default AccountSocial;
