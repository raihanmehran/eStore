import { Container, Divider, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError() {
  const { state } = useLocation();

  return (
    <Container>
      {state?.error ? (
        <>
          <Typography gutterBottom variant="h4" sx={{ color: "red" }}>
            {state.error.title}
          </Typography>
          <Divider />
          <Typography gutterBottom variant="body1">
            {state.error.detail || "Internal Server Error"}
          </Typography>
        </>
      ) : (
        <Typography gutterBottom variant="h5">
          Server Error
        </Typography>
      )}
    </Container>
  );
}
