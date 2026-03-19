import toast from "react-hot-toast";
import "./ConfirmToast.css";

const ConfirmToast = ({ message, onConfirm, toastId }) => {
  return (
    <div className="confirm-toast">
      <p>{message}</p>
      <div className="confirm-toast-actions">
        <button
          className="confirm-btn"
          onClick={() => {
            onConfirm();
            toast.dismiss(toastId);
          }}
        >
          Yes, Remove
        </button>
        <button
          className="cancel-btn"
          onClick={() => toast.dismiss(toastId)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmToast;