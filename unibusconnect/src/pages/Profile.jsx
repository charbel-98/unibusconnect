import { PersonFill } from "react-bootstrap-icons";
import myPic from "../img/myPic.jpg";
const Profile = () => {
  return (
    <div className="px-3 pt-3 pb-5">
      <form action="profile.html">
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
              <label className="text-muted f-10 mb-1">User Name</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter User Name"
                value="osahantech"
              />
            </div>
            <div className="form-group">
              <label className="text-muted f-10 mb-1">Mobile Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Mobile Number"
                value="1234567890"
              />
            </div>
            <div className="form-group">
              <label className="text-muted f-10 mb-1">Your Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email"
                value="example@mail.com"
              />
            </div>
            <div className="form-group">
              <label className="text-muted f-10 mb-1">City</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter City"
                value="Ludh."
              />
            </div>
            <div className="form-group">
              <label className="text-muted f-10 mb-1">State</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter State"
                value="Pun."
              />
            </div>
            <div className="form-group">
              <label className="text-muted f-10 mb-1">Address</label>
              <textarea
                className="form-control"
                placeholder="Enter Address"
                data-gramm="false"
                wt-ignore-input="true"
              >
                House #675, Sector #12, Road #20 Dhaka-123001
              </textarea>
            </div>

            <div className="mb-5">
              <a
                href="home.html"
                className="btn btn-danger btn-block osahanbus-btn rounded-1"
              >
                UPDATE PROFILE
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Profile;
