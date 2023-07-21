import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispath, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage() {
  const dispatch = useAppDispath();
  const { data, title } = useAppSelector((state) => state.counter);

  return (
    <>
      <Typography variant="h3">Contact Page</Typography>
      <Typography variant="body1">------</Typography>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body1">------</Typography>
      <Typography variant="h4">The data is : {data}</Typography>

      <ButtonGroup>
        <Button
          onClick={() => dispatch(decrement(1))}
          variant="contained"
          color="warning"
        >
          Decrement
        </Button>
        <Button
          onClick={() => dispatch(increment(1))}
          variant="contained"
          color="primary"
        >
          Increment
        </Button>
        <Button
          onClick={() => dispatch(increment(5))}
          variant="contained"
          color="error"
        >
          Increase By 5
        </Button>
      </ButtonGroup>
    </>
  );
}
