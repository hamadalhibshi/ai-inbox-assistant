import { toast } from "react-hot-toast";

export const useToast = () => {
  const showLoading = (message: string = "Loading...") => {
    return toast.loading(message);
  };

  const showSuccess = (message: string = "Success!") => {
    return toast.success(message);
  };

  const showError = (message: string = "Something went wrong!") => {
    return toast.error(message);
  };

  const dismiss = (toastId: string) => {
    toast.dismiss(toastId);
  };

  const handleToast = async <T>(
    asyncFn: () => Promise<T>,
    options: {
      loadingMessage?: string;
      successMessage?: string;
      errorMessage?: string;
      onSuccess?: (result: T) => void;
      onError?: (error: any) => void;
    } = {}
  ): Promise<T | null> => {
    const {
      loadingMessage = "Loading...",
      successMessage = "Loaded successfully!",
      errorMessage = "Failed!",
      onSuccess,
      onError,
    } = options;

    const loadingToast = showLoading(loadingMessage);

    try {
      const result = await asyncFn();
      dismiss(loadingToast);
      showSuccess(successMessage);
      onSuccess?.(result);
      return result;
    } catch (error) {
      dismiss(loadingToast);
      showError(errorMessage);
      onError?.(error);
      return null;
    }
  };

  return {
    handleToast,
  };
};
