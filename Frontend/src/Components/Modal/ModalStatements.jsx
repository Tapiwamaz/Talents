import "./Modal.css";

const ModalStatements = ({ open, children }) => {
  return (
    <main className="modal-main" hidden={open !== "Second"}>
      <section className="modal-statements">{children}</section>
    </main>
  );
};

export default ModalStatements;
