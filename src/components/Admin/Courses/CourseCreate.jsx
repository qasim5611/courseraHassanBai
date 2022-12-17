import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { useMediaQuery, Grid} from "@mui/material";
// import Investtab from "./Investtab";

import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

import Popper from "@mui/material/Popper";
import { makeStyles, createStyles } from "@mui/styles";

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
  styled,
  
} from "@mui/material";



import "react-toastify/dist/ReactToastify.css";

import { createCourse } from "../../../redux/actions/Course_action.js";

import { getNftPopularRefresh } from "../../../redux/actions/adminDash_action.js";

import API from "../../../redux/url.js";
import axios from "axios";
import Cookies from "universal-cookie";
import LoadingSvg from "../../Loader/Loader";

const cookies = new Cookies();

const AutocompleteStyle = styled(Autocomplete)(() => ({
  '&.MuiAutocomplete-root': {
    borderRadius: '10px',
    color: '#fff',
    backgroundColor: "#fff",
  },
  '&.Mui-focused': {
    color: 'red',
    backgroundColor: "#fafafa"
  },
 
}));

const TextFieldStyle = styled(TextField)(() => ({
  '.MuiFilledInput-root': {
    color: 'black !important',
  },
  '&.MuiTextField': {
    color: 'black !important',
  }

}));


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const CourseCreate = () => {
  const dispatch = useDispatch();


  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    title: "",
    auther: "",
    image: null,
  });
  
  const [description, setDescription] = useState(null);

  const [moduleList, setModuleList] = useState(null);
  const [instructorBio, setInstructorBio] = useState(null);

  const [learnList, setLearnList] = useState(null);
  

  // Error Hanflers
  const [titleerr, settitleerr] = useState("");
  const [imgerr, setimgerr] = useState("");
  const [instructrErr, setinstructrErr] = useState("");

  const [instructrBioErr, setinstructrBioErr] = useState("");
  const [descerr, setdescerr] = useState("");
  const [levelerr, setlevelerr] = useState("");


  const [learnListErr, setLearnListErr] = useState("");
  const [moduleListErr, setModuleListErr] = useState("");

  const useStyles = makeStyles({
    paper: {
      border: "5px solid black",
      color: "red",
      backgroundColor: "green",
    },
  });
  const classNamees = useStyles();

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

  const learnLists = [
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



  let success = useSelector((state) => state.CourseReducer);
  console.log("success.courseCreate", success.courseCreate);
  useEffect(() => {
    if (success.courseCreate) {
      setLoading(false);
    }
  }, [success]);


  const errmsg = {
    color: "red",
    position: "relative",
    top: "-15px",
    fontSize: "12px"
  };

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

  const [module, setModule] = useState(0);




  const onChangeHandler = (e) => {
    if (e.target.name == "image") {
      let val = e.target.files[0];
      setState({ ...state, [e.target.name]: val });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };
  const handleChange = (content) => {
    setDescription(content); //Get Content Inside Editor
  };
  const handleBioChange = (content) => {
    setInstructorBio(content); //Get Content Inside Editor
  };

  const editorRef = useRef < SunEditor > null;
  useEffect(() => {
    // Get underlining core object here
    // Notice that useEffect is been used because you have to make sure the editor is rendered.
    console.log(editorRef.current?.editor.core);
  }, []);


  const onSubmit = (e) => {
    e.preventDefault();
   

    let obj = {
      ...state,
      module,
      description,
      instructorBio,
      learnList,
      moduleList,
    };

    var isFormvalid = validate();
    console.log("isvalid", isFormvalid);
      window.scrollTo(0, 200);
 
    if (isFormvalid) {
      console.log(obj);
       setLoading(true);
      dispatch(createCourse(obj));
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
    }     else if(description == null){
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
    else if (
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
  {loading === true && <Box className="loading" style={{zIndex: "9999"}} >Loading&#8230;</Box>}

    <Box className="content-wrapper">
      <Box
        id="order_preview"
        className="wow fadeInUp content_box"
        style={{ visibility: "visible", animationName: "fadeInUp" }}
      >
        <Row classNameName="table-header">
          <Col xs="12" md="12">
            <h2 className="section-title">Enter New Course</h2>
          </Col>
        </Row>
       













        <Container>

        <Grid container spacing={2}>
          
          <Grid item md={6} xs={12} sx={{color: "black"}}>
          <Box className="form-group">
                  <label for="pwd">Course Title</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="title"
                    onChange={onChangeHandler}
                    // value={state.title}
                  />
                  <Typography variant="span" align="right">
                    {titleerr ? <Box style={errmsg}>{titleerr}</Box> : null}
                  </Typography>
                </Box>
          </Grid>
          <Grid item md={6} xs={12} sx={{color: "black"}}>
          <Box className="form-group">
                  <label for="pwd">Course Level</label>
                  <select
                    name="module"
                    id="module"
                    className="form-control"
                    onChange={(e) => setModule(e.target.value)}
                  >
                    <option value="0" selected disabled hidden>
                      Select...
                    </option>
                    <option value="Beginner">Beginner Level</option>
                    <option value="Intermediate">Medium Level</option>
                    <option value="Advanced">Advanced Level</option>
                  </select>
                  <Typography variant="span" align="right">
                    {levelerr ? <Box style={errmsg}>{levelerr}</Box> : null}
                  </Typography>
                </Box>
          </Grid>

          {/* .................... */}
        
          
        </Grid>


        <Grid container spacing={2}>
           <Grid item md={12} xs={12} sx={{color: "black"}}>
           <Box className="form-group">
                  <label for="pwd">Course Descriptions</label>

                  <SunEditor
                    setOptions={{
                      height: 200,
                      // width: "60%",
                      buttonList: formatting,
                      buttonList: basic,
                      buttonList: complex,
                    }}
                    onChange={handleChange}
                  />
                  <Typography variant="span" align="right" style={{marginTop: "15px"}}>
                    {descerr ? <Box style={errmsg}>{descerr}</Box> : null}
                  </Typography>
                </Box>
           </Grid>
           

        </Grid>

        <Grid container spacing={2}>
           <Grid item md={6} xs={12} sx={{color: "black"}}>
           <Box className="form-group">
                  <label for="pwd"> Course Modules </label>

                  <Box className="form-group">
                    <Stack spacing={3}>
                      <AutocompleteStyle
                        multiple
                        id="tags-filled"
                        options={defaultModules.map((option) => option.title)}
                        freeSolo
                        onChange={(event, value) =>
                          onChangeHandlerModule(value)
                        }
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                            color="primary"
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextFieldStyle
                            {...params}
                            variant="filled"
                            label="Enter Modules Names For this Particular Course*"
                            name="list"
                          />
                        )}
                      />
                     
                    </Stack>
                  
                  </Box>
                  <Typography variant="span" align="right" style={{marginTop: "15px"}}>
                        {moduleListErr ? <Box style={errmsg}>{moduleListErr}</Box> : null}
                      </Typography>
                </Box>

             
           </Grid>
           <Grid item md={6} xs={12} sx={{color: "black"}}>
           <label for="pwd"> Course Learning List </label>
           <Box className="form-group">
                  <Stack spacing={3} >
                    <AutocompleteStyle
                      multiple
                      id="tags-filled"
                      options={learnLists.map((option) => option.title)}
                      // defaultValue={courseModules.map((option) => option.title)}
                      // defaultValue={[courseModules[1].title]}
                      freeSolo
                      onChange={(event, value) => onChangeHandlerMap(value)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            color="primary"
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextFieldStyle
                          {...params}
                          variant="filled"
                          label="What you will learn In Overall Course*"
                          // placeholder="Favorites"
                          name="list"
                        />
                      )}
                    />
                   
                  </Stack>
                  <Typography variant="span" align="right" style={{marginTop: "15px"}}>
                      {learnListErr ? <Box style={errmsg}>{learnListErr}</Box> : null}
                    </Typography>
               
                </Box>
           </Grid>

        </Grid>

   

    





        <Grid container spacing={2}>
           <Grid item md={12} xs={12} sx={{color: "black"}}>
           <Box className="form-group">
                  <label for="pwd">Instructor BIO</label>

                  <SunEditor
                    setOptions={{
                      height: 200,
                      // width: "60%",
                      buttonList: formatting,
                      buttonList: basic,
                      buttonList: complex,
                    }}
                    onChange={handleBioChange}
                  />
                   
                  <Typography variant="span" align="right" style={{marginTop: "15px"}}>
                    {instructrBioErr ? <Box style={errmsg}>{instructrBioErr}</Box> : null}
                  </Typography>
                </Box>
           </Grid>

        </Grid>


        
        <Grid container spacing={2}>
        <Grid item md={6} xs={12} sx={{color: "black"}}>
          <Box className="form-group">
                  <label for="pwd"> Instructor Name </label>
                  <input
                    name="auther"
                    type="text"
                    className="form-control"
                    required
                    onChange={onChangeHandler}
                  />
                  <Typography variant="span" align="right">
                    {instructrErr ? <Box style={errmsg}>{instructrErr}</Box> : null}
                  </Typography>
                </Box>
          </Grid>
          <Grid item md={6} xs={12} sx={{color: "black"}}>
          <Box className="form-group">
                  <label for="pwd">Course Image </label>
                  <input
                    type="file"
                    className="form-control"
                    required
                    name="image"
                    onChange={onChangeHandler}
                  />
                </Box>
                <Typography variant="span" align="right">
                  {imgerr ? <Box style={errmsg}>{imgerr}</Box> : null}
                </Typography>
          </Grid>
        </Grid>
      
      </Container>


      <button
                  type="submit"
                  className="btn btn-default"
                  onClick={onSubmit}
                  style={{
                    marginTop: 10,
                    float: "right",
                    padding: "8px 16px",
                    fontSize: 16,
                  }}
                >
                  Create Course
                </button>















       
      </Box>
    </Box>
    </>
   
  );
};

export default CourseCreate;
