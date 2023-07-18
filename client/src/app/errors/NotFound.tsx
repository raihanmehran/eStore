import { Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ServerError() {
  return (
    <Container>
      <Typography gutterBottom variant="h4" sx={{ height: 400 }}>
        404! -- Can't find what you are looking for!
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/catalog">
        Return Back to store
      </Button>
    </Container>
  );
}
