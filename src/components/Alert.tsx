import Modal from "./UI/Modal"
import styles from "./Alert.module.css"

type AlertDialogProps = {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

const AlertDialog = ({ open, onConfirm, onCancel }: AlertDialogProps) => {
  return (
    <Modal open={open} className={styles["alert-dialog"]}>
      <div className={styles.content}>
        <h3>Are you sure you want to delete the row?</h3>
        <p>Confirm action</p>
        <div className={styles.actions}>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </Modal>
  )
}

export default AlertDialog
