import styles from './styles/confirmation-modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onSubmit?: () => void;
  onCloseText?: string;
  onSuccessText?: string;
}

const ConfirmationModal = ({
  isOpen = false,
  onClose,
  title = 'Error!',
  message = 'Something Happened',
  onSubmit,
  onCloseText,
  onSuccessText,
}: ModalProps) => {
  return (
    <div
      className={`${styles.modal} ${
        isOpen ? styles.modelOpen : styles.modalClose
      }`}
    >
      <div className={styles.modalContent}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
        <div className={styles.btnGroup}>
          <button
            className={`${styles.btn} ${styles.btnClose}`}
            onClick={() => onClose()}
          >
            {onCloseText ? onCloseText : 'Close'}
          </button>
          {onSubmit && (
            <button
              className={`${styles.btn} ${styles.btnSuccess}`}
              onClick={() => onSubmit()}
            >
              {onSuccessText ? onSuccessText : 'Submit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
