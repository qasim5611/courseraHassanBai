import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { useMediaQuery } from "@mui/material";
// import Investtab from "./Investtab";
import { FormControlLabel } from "@mui/material";
import ImageUploading from "react-images-uploading";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

import "./../style.css";
import "./../create.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { basic, complex, formatting } from "../../misc/buttonList.js";

import { Row, Col } from "reactstrap";
// Import Swiper styles
// import 'swiper/css';

import {
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import "react-toastify/dist/ReactToastify.css";

import { updateCourse } from "../../../redux/actions/Course_action.js";

import API from "../../../redux/url.js";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const CourseUpdate = () => {
  const params = useParams();
  const dispatch = useDispatch();


  

  const [record, setrecord] = useState(false);
  const [idtoUpdate, setidtoUpdate] = useState(false);

  console.log("myid");
  console.log(params.id);

  const [module, setModule] = useState(0);
  const [instructorBio, setInstructorBio] = useState(null);

const [learnList, setLearnList] = useState(null);
  const [moduleList, setModuleList] = useState(null);

  const [state, setState] = useState({
    title: "",
    auther: "",
    image: null,
    
  });
  const [loading, setLoading] = useState(false);

    // Error Hanflers
    const [titleerr, settitleerr] = useState("");
    const [imgerr, setimgerr] = useState("");
    const [instructrErr, setinstructrErr] = useState("");
  
    const [instructrBioErr, setinstructrBioErr] = useState("");
    const [descerr, setdescerr] = useState("");
    const [levelerr, setlevelerr] = useState("");
  
  
    const [learnListErr, setLearnListErr] = useState("");
    const [moduleListErr, setModuleListErr] = useState("");

  const [description, setDescription] = useState(null);

  const isCourseUpdated = useSelector((state) => state.CourseReducer.isCourseUpdated);

  console.log("isCourseUpdated");
  console.log(isCourseUpdated);

  useEffect(() => {
    axios.get(API + "/getCourseByid", { params }).then((res) => {
      console.log("getCourseByid.data", res.data);
      console.log(res.data.user[0]);

      setrecord(res.data.user);

      setDescription(res.data.user[0].description);

      setState({
        title: res.data.user[0].title,
        auther: res.data.user[0].auther,
      });
      setidtoUpdate(res.data.user[0]._id);
      // setEditRecordBefore(res.data.user[0]);
    });
  }, [isCourseUpdated]);



  const filesstyle = {
    color: "black",
    border: "1px black solid",
    width: "100%",
    background: "white",
    height: "36px",
    padding: "7px",
    border: "1px solid rgb(190, 194, 199)",
    borderRadius: "7px",
    marginBottom: "20px",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  };

  const labls = {
    color: "#101924",
    flex: "1",
    marginLeft: "2px",
  };

  const errmsg = {
    color: "red",
    position: "relative",
    top: "-11px",
  };

  const errmsgs = {
    color: "red",
 
  }

  const inputstyle = {
    padding: "3px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "1px solid #bec2c7",
    borderRadius: "7px",
    marginBottom: "20px",
  };

  const check = useMediaQuery("(max-Width:900px)");

  const onChangeHandler = (e) => {
    if (e.target.name == "image") {
      let val = e.target.files[0];
      setState({ ...state, [e.target.name]: val });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

  const onChangeHandlerMap = (value) => {
    setLearnList(value);
  };
  const onChangeHandlerModule = (value) => {
    setModuleList(value);
  };
  const courseModules = [
    { title: "The history of money" },
    { title: "What is cryptocurrency" },
    { title: "The basics of blockchain" },
    { title: "The differences between cryptocurrencies" },
    { title: "How to research cryptocurrencies" },
    { title: "How to setup a wallet" },
    { title: "How to secure your wallet" },
    { title: "Avoiding the most common scams" },
  ];
  const defaultModules = [
    { title: "History" },
    { title: "Basics" },
    { title: "Advance" },
    { title: "Latest" },
  ];



  const editorRef = useRef < SunEditor > null;
  useEffect(() => {
    // Get underlining core object here
    // Notice that useEffect is been used because you have to make sure the editor is rendered.
    console.log(editorRef.current?.editor.core);
  }, []);

  const handleChange = (content) => {
    setDescription(content); //Get Content Inside Editor
  };
  const handleBioChange = (content) => {
    setInstructorBio(content); //Get Content Inside Editor
  };


  const onSubmit = (e) => {
    e.preventDefault();
    let obj = {
      ...state,
      module,
      description,
      instructorBio,
      learnList,
      moduleList,
      idtoUpdate
    };

 
    var isFormvalid = validate();
    console.log("isvalid", isFormvalid);
    window.scrollTo(0, 200);
    if (isFormvalid) {
      console.log(obj);

      //  setLoading(true);
      dispatch(updateCourse(obj));
      //  alert("ok");
    }
  };

  const validate = () => {
    console.log("validate called");
    console.log("modile", module);
    console.log("instructorBio.length", instructorBio);

    
    let isvalid = true;

    if (
      state.title.length < 5 ||
      state.title.length > 30 ||
      state.title.length == 0
    ) {
      isvalid = false;
      settitleerr("Course Title Should be 5 to 30 characters long");
      setimgerr("");
      setinstructrErr("");
      setinstructrBioErr("");
      setdescerr("");
      setlevelerr("");
      setLearnListErr("");
      setModuleListErr("");
    } 
    else if (module == 0) {
      isvalid = false;
      setLearnListErr("");
      setModuleListErr("");
      settitleerr("");
      setimgerr("");
      setinstructrErr("");
      setinstructrBioErr("");
      setdescerr("");
      setlevelerr("Level Selection is Required");
    } else if (
      state.auther.length < 5 ||
      state.auther.length > 20 ||
      state.auther.length == 0
    ) {
      isvalid = false;
      settitleerr("");
      setimgerr("");
      setinstructrErr("Auther Name Should be 5 to 20 characters long");
      setinstructrBioErr("");
      setdescerr("");
      setlevelerr("");
      setLearnListErr("");
      setModuleListErr("");
    }
    else if(instructorBio == null ){
      isvalid = false;
      settitleerr("");
      setimgerr("");
      setinstructrErr("");
      setinstructrBioErr("Auther Detail Should not empty");
      setdescerr("");
      setlevelerr("");
      setLearnListErr("");
      setModuleListErr("");
    }

    else if (moduleList == null) {
      isvalid = false;
      setLearnListErr("");
      setModuleListErr("Modules List Should not empty");
      settitleerr("");
      setimgerr("");
      setinstructrErr("");
      setinstructrBioErr("");
      setdescerr("");
      setlevelerr("");
    } 
  
    else if(description == null){
      isvalid = false;
      settitleerr("");
      setimgerr("");
      setinstructrErr("");
      setinstructrBioErr("");
      setdescerr("Description Should not empty");
      setlevelerr("");
      setLearnListErr("");
      setModuleListErr("");
    }
  

    
    else if (learnList == null) {
      isvalid = false;
      setLearnListErr("Learn List Should not empty");
      setModuleListErr("");
      settitleerr("");
      setimgerr("");
      setinstructrErr("");
      setinstructrBioErr("");
      setdescerr("");
      setlevelerr("");
    }
   
   
    else if (state.image == null) {
      isvalid = false;
      settitleerr("");
      setimgerr("Course Image is Required");
      setinstructrErr("");
      setinstructrBioErr("");
      setdescerr("");
      setlevelerr("");
      setLearnListErr("");
      setModuleListErr("");
    } 
    
    else {
      setLearnListErr("");
      setModuleListErr("");
      settitleerr("");
      setimgerr("");
      setinstructrErr("");
      setinstructrBioErr("");
      setdescerr("");
      setlevelerr("");
    }

    return isvalid;
  };

  return (
 <>
  {loading === true && <div className="loading" style={{zIndex: "9999"}} >Loading&#8230;</div>}
  <div class="content-wrapper">
      <div
        id="order_preview"
        class="wow fadeInUp content_box"
        style={{ visibility: "visible", animationName: "fadeInUp" }}
      >
        <Row className="table-header">
          <Col xs="12" md="12">
            <h2 class="section-title">Edit Your Course</h2>
          </Col>
        </Row>

        <div class="row">
          <Row>
            <Col xs="12" md="9">
              {record ? (
                <div>
                  {record.map((item, index) => {
                    return (
                      <form>
                        <div class="form-group">
                          <label for="pwd">Course title</label>
                          <input
                            type="text"
                            class="form-control"
                            required
                            name="title"
                            onChange={onChangeHandler}
                            defaultValue={state.title}

                          />
                          <center>
                          {titleerr ? <div style={errmsg}>{titleerr}</div> : null}

                          </center>
                        </div>

                        <div class="form-group">
                        <label for="pwd">Course Level</label>
                        <select
                          name="module"
                          id="module"
                          class="form-control"
                          onChange={(e) => setModule(e.target.value)}
                        >
                          <option value="0" selected disabled hidden>
                            Select...
                          </option>
                          <option value="Beginner">Beginner Level</option>
                    <option value="Intermediate">Medium Level</option>
                    <option value="Advanced">Advanced Level</option>
                        </select>
                        <center>
                        {levelerr ? <div style={errmsg}>{levelerr}</div> : null}

                        </center>
                       </div>

                   

                       <div class="form-group">
                  <label for="pwd"> Instructor Name </label>
                  <input
                    name="auther"
                    type="text"
                    class="form-control"
                    required
                    onChange={onChangeHandler}
                    defaultValue={state.auther}

                  />
                  <center>
                  {instructrErr ? <div style={errmsg}>{instructrErr}</div> : null}

                  </center>
                </div>
                <div class="form-group">
                  <label for="pwd">Instructor BIO</label>

                  <SunEditor
                    setOptions={{
                      height: 200,
                      width: "60%",
                      buttonList: formatting,
                      buttonList: basic,
                      buttonList: complex,
                    }}
                    onChange={handleBioChange}
                    defaultValue={item.instructorBio}

                  />
                      <center style={{marginTop: "15px"}}>
                    {instructrBioErr ? <div style={errmsg}>{instructrBioErr}</div> : null}
                  </center>
                </div>
                <div class="form-group">
                  <label for="pwd"> Course Module </label>

                  <div class="form-group">
                    <Stack spacing={3} sx={{ width: "60%" }}>
                      <Autocomplete
                        style={{ color: "black" }}
                        multiple
                        id="tags-filled"
                        defaultValue={item.moduleLists.map((option) => option)}
                        options={item.moduleLists.map((option) => option)}
                        freeSolo
                        onChange={(event, value) =>
                          onChangeHandlerModule(value)
                        }
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              color="primary"
                              style={{ color: "black !important" }}
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            style={{ color: "black !important" }}
                            {...params}
                            variant="filled"
                            label="Enter Modules Names For this Particular Course*"
                            name="list"
                          />
                        )}
                      />
                    
                    </Stack>
                    <center style={{marginTop: "15px"}}>
                        {moduleListErr ? <div style={errmsg}>{moduleListErr}</div> : null}
                      </center>
                  </div>
                
                </div>
                <div class="form-group">
                  <label for="pwd">Course Descriptions</label>

                  <SunEditor
                    setOptions={{
                      height: 200,
                      width: "60%",
                      buttonList: formatting,
                      buttonList: basic,
                      buttonList: complex,
                    }}
                    onChange={handleChange}
                    defaultValue={item.description}
                  />
                     <center style={{marginTop: "15px"}}>
                    {descerr ? <div style={errmsg}>{descerr}</div> : null}
                  </center>
                </div>

                <div class="form-group">
                  <Stack spacing={3} sx={{ width: "60%" }}>
                    <Autocomplete
                      style={{ color: "black" }}
                      multiple
                      id="tags-filled"
                      options={item.learnLists.map((option) => option)}
                      
                      defaultValue={item.learnLists.map((option) => option)}
                      freeSolo
                      onChange={(event, value) => onChangeHandlerMap(value)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            color="primary"
                            // sx={inputStyles}
                            style={{ color: "black !important" }}
                            // sx={{ color: "black" }}
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          style={{ color: "black !important" }}
                          {...params}
                          variant="filled"
                          label="What you will learn In Overall Course*"
                          // placeholder="Favorites"
                          name="list"
                        />
                      )}
                    />
                   
                  </Stack>
                  <center style={{marginTop: "15px"}}>
                      {learnListErr ? <div style={errmsg}>{learnListErr}</div> : null}
                    </center>
                </div>

                        <div class="form-group">
                          <label for="pwd">Course Image </label>
                          <img
                            src={API + "/uploads/" + item.image}
                            alt={item.image}
                            height="200"
                            width="200"
                          />
                          <input
                            type="file"
                            class="form-control"
                            required
                            name="image"
                            onChange={onChangeHandler}
                          />
                        </div>
                        <center>
                          {imgerr ? <div style={errmsg}>{imgerr}</div> : null}
                        </center>

                        <button
                          type="submit"
                          class="btn btn-default"
                          onClick={onSubmit}
                          style={{
                            marginTop: 10,
                            float: "right",
                            padding: "8px 16px",
                            fontSize: 16,
                          }}
                        >
                          Update Course
                        </button>
                      </form>
                    );
                  })}
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
 </>

   
  );
};

export default CourseUpdate;
