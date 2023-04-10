import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Avatar } from "@mui/material";
import { uploadApi } from "../redux/user/userReducer";

// import FileUpload from "react-material-file-upload";
import { toast } from "react-toastify";
import { options } from "./Login";
export default function Profile() {
  const { user } = useSelector(
    (state) => state.persistedReducer.userReducer.userLogin
  );

  const dispatch = useDispatch();
  const [value, setValue] = React.useState(user.gender);
  // const { control, handleSubmit } = useForm();
  // const newImageUri =  "file:///" + imageUri.split("file:/").join("");
  // const onSubmit = async (image) => {
  //   const formData = image.image;
  //   console.log(formData);
  //   try {
  //     const action = uploadApi(formData[0]);
  //     await dispatch(action);
  //   } catch (error) {
  //   toast.error('Chức năng này chưa fix được',options)
  //   }
  // };

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
                  alt={user.name}
                  src={user.avatar}
                  sx={{ width: 240, height: 240 }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{user.name}</h5>
                <h6>{user.role}</h6>
                <div className="proile-rating">
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      Giới tính
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={value}
                      // onChange={handleChange}
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
            <div className="col-md-2"></div>
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
                      <p>{user.id}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Tên</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Số điện thoại</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Ngày sinh</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.birthday}</p>
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
