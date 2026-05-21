import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const serverData = error.response?.data as { message?: string } | undefined;
    return serverData?.message || error.message || "Unknown error";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown error";
};
