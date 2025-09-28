import Modal from "./UI/Modal"

type AlertDialogProps = {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

const AlertDialog = ({ open, onConfirm, onCancel }: AlertDialogProps) => {
  return (
    <Modal open={open} className="alert-dialog">
      <div style={{ padding: "1rem", minWidth: "280px" }}>
        <h3>Are you sure?</h3>
        <p>Confirm action</p>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
        >
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </Modal>
  )
}

export default AlertDialog
