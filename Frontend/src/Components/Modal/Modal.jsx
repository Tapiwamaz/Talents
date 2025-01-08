import "./Modal.css";

const Modal = ({ open, children }) => {
  return (
    <main className="modal-main"  hidden={!open}>
      <section className="modal">{children}</section>
    </main>
  );
};

export default Modal;
