import React from "react";
import { Button } from "@material-tailwind/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { runResponse, findResumeDiff } from "../../utilities/openai"
// import { PdfViewer } from "../../utilities/utils_2"
import { convertPdfToString } from "../../utilities/utils"
import "./ResumeComponent.css";

const ResumeComponent = ({ previousStep, nextStep, handleChange, setResumeString, values }) => {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  const [fileExists, setFileExists] = React.useState(false);
  const [resume, setResume] = React.useState("");
  // ref
  const inputRef = React.useRef(null);
  let fileName = "";

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
      // console.log('hell');
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      fileName = file.name;

      if (!file) {
        alert("Please upload a file!");
      } 
      let pdfText = convertPdfToString(file).then((text) => {
        values["resumeString"] = text;
        console.log(values);
        console.log(text);
        setResume(text);
      });

      // setFileExists(true);
      let uploadAlert = fileName + " successfully loaded!"
      alert(uploadAlert);
      setFileExists(true); ////////////////////////// Use to change button to an active color
    }
  };

  // triggers when file is selected with click
  const handleChangeDrag = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log(e);
      const file = e.target.files[0];
      fileName = file.name;

      if (!file) {
        alert("Please upload a file!");
      } else {
        let pdfText = convertPdfToString(file).then((text) => {
          values["resumeString"] = text;
          console.log(values);
          console.log(text);
          setResume(text);
        });

        let uploadAlert = fileName + " successfully loaded!"
        alert(uploadAlert);
        setFileExists(true); ////////////////////////// Use to change button to an active color
      }
      // console.log(pdfText);
      // console.log(file.type);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };


  const GoBack = (e) => {
    e.preventDefault();
    previousStep();
  };

  const Continue = (e) => {
    e.preventDefault();

    // gettext("https://cdn.mozilla.net/pdfjs/tracemonkey.pdf").then(
    //   function (text) {
    //     alert("parse " + text);
    //   },
    //   function (reason) {
    //     console.error(reason);
    //   }
    // );

    runResponse(resume).then((res) => {
      let resume_string = res["message"]["content"];
      console.log(resume_string);
      findResumeDiff(resume_string, resume);

      // Write edited resume to 'updated_resume.txt' .
      // fs.writeFile("updated_resume.txt", resume_string, (err) => {
      //   // In case of a error throw err.
      //   if (err) throw err;
      // });
    });

    setResumeString(resume);
    nextStep();
  };

  return (
    <div>
      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChangeDrag} />
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
          </div>
        </label>
        {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
      </form>


      <Button onClick={Continue}>Continue</Button>
    </div>
  );
};

export default ResumeComponent;
