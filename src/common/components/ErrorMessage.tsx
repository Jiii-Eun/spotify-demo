import { Alert } from "@mui/material";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Alert
      severity="error"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.error.main,
        border: `1px solid ${theme.palette.error.main}`,
      })}
    >
      {message}
    </Alert>
  );
}
