import { toast } from 'react-toastify';

function useToast() {
  const showSuccessToast = (message) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      toastId: 'succ',
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      toastId: 'err',
    });
  };

  return {
    showSuccessToast,
    showErrorToast,
  };
}

export default useToast;
