"use server";

type CustomError = {
  statusCode?: number;
  message: string;
};

export const handleError = async (
  error: unknown,
  message = "Something went wrong"
): Promise<never> => {
  const err = error instanceof Error ? error : new Error(String(error));

  const customError: CustomError = {
    message: err.message || message,
    statusCode: 500,
  };

  if (process.env.NODE_ENV === "development") {
    console.error("[App Error]", {
      message,
      error: err,
    });
  } else {
    console.error("[App Error]", message); // Hide internal stack in prod
  }

  throw customError;
};
