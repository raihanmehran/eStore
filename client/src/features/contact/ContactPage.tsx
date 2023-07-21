import { Button, ButtonGroup, Typography } from "@mui/material";
import { CounterState, decrement, increment } from "./counterReducer";
import { useDispatch, useSelector } from "react-redux";

export default function ContactPage() {
  const dispatch = useDispatch();
  const { data, title } = useSelector((state: CounterState) => state);

  return (
    <>
      <Typography variant="h3">Contact Page</Typography>
      <Typography variant="body1">------</Typography>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body1">------</Typography>
      <Typography variant="h4">The data is : {data}</Typography>

      <ButtonGroup>
        <Button
          onClick={() => dispatch(decrement())}
          variant="contained"
          color="warning"
        >
          Decrement
        </Button>
        <Button
          onClick={() => dispatch(increment())}
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
