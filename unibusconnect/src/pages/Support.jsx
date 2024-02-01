import { Whatsapp, Messenger } from "react-bootstrap-icons";
const Support = () => {
  return (
    <div className="px-3 py-4">
      <p className="text-muted small w-100">
        We are here to help you with any information and problems through our
        contact center
      </p>
      <div className="messenger bg-white shadow-sm p-3 d-flex align-items-center rounded-1 mb-2">
        <Messenger className="me-3 h5 mb-0 text-danger" />
        <p className="mb-0 small">Click here for messenger live chat</p>
      </div>
      <div className="messenger bg-white shadow-sm p-3 d-flex align-items-center rounded-1 mb-2">
        <Whatsapp className="me-3 h5 mb-0 text-danger" />
        <p className="mb-0 small">Click here to mail us</p>
      </div>
      <div className="messenger bg-white shadow-sm p-3 d-flex align-items-center rounded-1 mb-2">
        <i className="icofont-support me-3 h5 mb-0 text-danger"></i>
        <p className="mb-0 small">Customer Care</p>
      </div>
    </div>
  );
};
export default Support;
