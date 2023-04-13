import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Avatar } from "@mui/material";
import { profileUserApi, uploadApi } from "../redux/user/userReducer";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { options } from "./Login";
// import IconButton from "@mui/material/IconButton";
export default function Profile() {
  const { profileUser } = useSelector(
    (state) => state.persistedReducer.userReducer
  );
  const { user } = useSelector(
    (state) => state.persistedReducer.userReducer.userLogin
  );
  useEffect(() => {
    const action = profileUserApi(user.id);
    dispatch(action);
  }, []);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(user.gender);
  const [file, setFile] = useState(false);
  const handleInputChange = (event) => {
    setFile(event.target.files[0]);
  };
  const upload = async (e) => {
    const formData = new FormData();
    formData.append("formFile", file);
    try {
      const action = uploadApi(formData);
      await dispatch(action);
    } catch (error) {
      toast.error(error.response.data.content, options);
    }
  };
  return (
    <div className="profile">
      <div className="container emp-profile">
        <div method="post">
          <div
            className="row"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
              borderRadius: "10px",
              marginBottom: "8px",
            }}
          >
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <div className="profile-img">
                <Avatar
                 
                  src={profileUser.avatar}
                  sx={{ width: 240, height: 240 }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="profile-head">
                <h5>{profileUser.name}</h5>
                <h6>{profileUser.role}</h6>
                <div className="proile-rating">
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      Giới tính
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={value}
                    >
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="Nữ"
                      />
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Nam"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div>
                <h2>Đổi avatar</h2>
                <br />
                <input type="file" onChange={handleInputChange} />
                <br />
                <br />
                <Button variant="contained" component="label" onClick={upload}>
                  Upload
                </Button>
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
              borderRadius: "10px",
            }}
          >
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profileUser.id}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Tên</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profileUser.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profileUser.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Số điện thoại</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profileUser.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Ngày sinh</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profileUser.birthday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
