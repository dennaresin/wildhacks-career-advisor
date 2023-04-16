import { useState } from "react";
import { Modal, Label, TextInput } from "flowbite-react";
import { Button } from "@material-tailwind/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDbUpdate, useDbData } from "../../utilities/firebase";
import storage from "../../utilities/firebase";
import validator from "validator";

const UploadPDF = ({ showModal, onCloseModal}) => {
//   const [update] = useDbUpdate(`/`);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [data, error] = useDbData("/capsules/emmalovecapsuleuuid/photoLinks");

  const handleUpload = (e) => {
    const file = document.getElementById("add-photo-modal-input").files[0];

    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        // setPercent(percent);
        console.log(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url)
        //   update({ [`/capsules/emmalovecapsuleuuid/photoLinks`]: data });
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            onCloseModal();
          }, 2000);
        });
      }
    );
  };
  return (
    <Button
        onClick={handleUpload}
        // className="text-white bg-indigo-600 relative cursor-default select-none py-2 pl-3 pr-12 dropdown-option secondary-green-background"
    >
        Upload
    </Button>
    // <Modal show={showModal} size="md" popup={true} onClose={onCloseModal}>
    //   <Modal.Header />
    //   <Modal.Body>
    //     <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
    //       <h3 className="text-xl font-medium text-gray-900 dark:text-white">
    //         Upload PDF
    //       </h3>
    //       {showSuccessMessage && (
    //         <div
    //           className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
    //           role="alert"
    //         >
    //           <span className="font-medium">Successfully added!</span>
    //         </div>
    //       )}
    //       <div>
    //         <div className="mb-2 block">
    //           <Label htmlFor="imageUrl" value="Add Photo" />
    //         </div>
    //         <form>
    //           <input id="add-photo-modal-input" type="file"></input>
    //         </form>
    //       </div>
    //       <div>
    //         <Button
    //           onClick={handleUpload}
    //           className="text-white bg-indigo-600 relative cursor-default select-none py-2 pl-3 pr-12 dropdown-option secondary-green-background"
    //         >
    //           Upload
    //         </Button>
    //       </div>
    //     </div>
    //   </Modal.Body>
    // </Modal>
  );
};

export default UploadPDF;
