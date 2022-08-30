import { Stack, Typography } from "@mui/material";

const EmptyArchivePage = () => {
  return (
    <Stack direction="column">
      <Stack
        direction="row"
        padding="2.5rem 2.875rem 0 1.875rem"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Typography fontSize="1.625rem" fontWeight="600">
          Archive
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "80vh", width: "100%" }}
      >
        <Stack
          direction="row"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Typography fontSize="1.125rem" fontWeight="600" textAlign="center">
            And this is where i&apos;ll put my <br /> archived agreements
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography fontSize="0.875rem" color="#adb2b8" padding="1rem 0">
            If I had any...
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EmptyArchivePage;
