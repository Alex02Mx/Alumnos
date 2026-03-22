import "./ConfirmModal.css";

export default function ConfirmModal({
  isOpen,
  message,
  onConfirm,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p>{message}</p>

        <div className="modal-buttons">
          <button onClick={onConfirm}>
            Sí, eliminar
          </button>

          <button onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}