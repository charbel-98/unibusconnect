export default function Modal(props) {
  {
    console.log(props);
  }
  return (
    <div className="modal">
      <div className="modal-dialog mx-4">
        <div className="modal-content">
          <div className="modal-header bg-danger text-light">
            <h5 className="modal-title">{props.title}</h5>
          </div>
          <div className="modal-body">
            <p>{props.description}</p>
          </div>
          {props.children && (
            <div className="modal-footer">{props.children}</div>
          )}
        </div>
      </div>
    </div>
  );
}
