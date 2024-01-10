import { PersonFill } from "react-bootstrap-icons";
import myPic from "../img/myPic.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/auth/authSlice";
const Profile = () => {
  const user = useSelector((state) => state.auth);
  const [name, setName] = useState(user?.user?.name);
  const [email, setEmail] = useState(user?.user?.email);
  const [phone, setPhone] = useState(user?.user?.mobile);
  const [isRequestPending, setIsRequestPending] = useState(false);

  const nameChanegHandler = (e) => {
    setName(e.target.value);
  };
  const emailChanegHandler = (e) => {
    setEmail(e.target.value);
  };
  const phoneChanegHandler = (e) => {
    setPhone(e.target.value);
  };
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, phone);
    try {
      if (isRequestPending) {
        return;
      }

      setIsRequestPending(true);

      const response = await axiosPrivate.post(`/profile`, {
        name,
        email,
        phone,
      });

      console.log(response.data);
      dispatch(
        updateUser({
          name: response.data.name,
          email: response.data.email,
          mobile: response.data.mobile,
        })
      );
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);

      if (err.response?.status === 403) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    } finally {
      setIsRequestPending(false);
    }
  };

  return (
    <div className="px-3 pt-3 pb-5">
      <form onSubmit={submitHandler}>
        <div className="d-flex justify-content-center rounded-2 mb-4">
          <div className="form-profile w-100">
            <div className="text-center mb-3 position-relative">
              <div className="position-absolute edit-bt">
                <label htmlFor="upload-photo" className="mb-0">
                  <span className="icofont-pencil-alt-5 text-white"></span>
                </label>
                <input type="file" name="photo" id="upload-photo" />
              </div>
              <img src={myPic} className="rounded-pill w-25" />
            </div>
            <div className="form-group">
              <label className="text-muted f-10 mb-1">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter User Name"
                defaultValue={user?.user?.name}
                onChange={nameChanegHandler}
              />
            </div>
            <div className="form-group">
              <label className="text-muted f-10 mb-1">Mobile Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Mobile Number"
                defaultValue={user?.user?.mobile}
                onChange={phoneChanegHandler}
              />
            </div>
            <div className="form-group">
              <label className="text-muted f-10 mb-1">Your Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email"
                defaultValue={user?.user?.email}
                onChange={emailChanegHandler}
              />
            </div>

            <div className="mb-5">
              <button
                type="submit"
                disabled={
                  (name === user?.user?.name &&
                    email === user?.user?.email &&
                    phone === user?.user?.mobile) ||
                  name === "" ||
                  email === "" ||
                  phone === ""
                }
                className="btn btn-danger btn-block osahanbus-btn rounded-1"
              >
                {isRequestPending ? "Updating..." : "UPDATE PROFILE"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Profile;
