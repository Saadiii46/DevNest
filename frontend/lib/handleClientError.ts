export const handleClientError = (
  error: unknown,
  fallbackMessage = "Something went wrong"
) => {
  const err = error instanceof Error ? error : new Error(String(error));

  return {
    message: err.message || fallbackMessage,
    error: err,
  };
};
