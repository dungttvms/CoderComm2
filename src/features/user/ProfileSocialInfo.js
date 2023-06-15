import React from "react";
import { LinkedIn, Instagram, Facebook, Twitter } from "@mui/icons-material";
import { Box, Card, CardHeader, Link, Stack, styled } from "@mui/material";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

function ProfileSocialInfo({ profile }) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;
  const SOCIALS = [
    {
      name: "LinkedIn",
      icon: (
        <IconStyle color="#006097">
          <LinkedIn />
        </IconStyle>
      ),
      href: linkedinLink,
    },
    {
      name: "Facebook",
      icon: (
        <IconStyle color="#1c9cea">
          <Facebook />
        </IconStyle>
      ),
      href: facebookLink,
    },
    {
      name: "Instagram",
      icon: (
        <IconStyle color="#1877f2">
          <Instagram />
        </IconStyle>
      ),
      href: instagramLink,
    },
    {
      name: "Twitter",
      icon: (
        <IconStyle color="#07336d">
          <Twitter />
        </IconStyle>
      ),
      href: twitterLink,
    },
  ];
  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {SOCIALS.map((link) => (
          <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default ProfileSocialInfo;
