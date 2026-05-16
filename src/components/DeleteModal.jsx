export default function DeleteModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modalOverlay">
      <div className="modalBox">
        <h2>Delete Post?</h2>
        <p>This action cannot be undone.</p>

        <div className="modalActions">
          <button className="cancelBtn" onClick={onCancel}>Cancel</button>
          <button className="dangerBtn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
