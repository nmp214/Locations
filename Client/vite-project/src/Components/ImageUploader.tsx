import React, { useState } from 'react';
import 'firebase/storage';
import { upload } from '../create-reference/storage';

const ImageUploader: React.FC<any> = (props: any) => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [files, setFiles] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  // Handle file selection
  const handleMultipleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
    setSelectedFiles(files);
   props.handleMultipleFiles(files);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('in handleFileChange');
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log(file);
      setSelectedFile(file);
      props.handleFile(file);
    }
  };
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log('event: ', event);
  //   setFiles(event.target.value);
  //   const file = event.target.value;
  //   console.log('files: ', files);
  //   if (file) {
  //     console.log(file);
  //     // setSelectedFile(file);
  //     props.handleFile(file);
  //   }
  // };

  return (
    <div>
      <div>
        <p>בחר תמונה לתצוגה</p>
        <input type="file" onChange={handleFileChange} />
        {selectedFile && (<p>נבחרה תמונה: {selectedFile.name}</p>)}
      </div>
      <div>
        <p>יש לך עוד תמונות להתרשמות?</p>
        <input
          type="file"
          multiple
          // onChange={handleFileChange}
          onChange={handleMultipleFileChange

            // async (event) => {
            //   console.log(event.target.value);
            //   const f = event.target.files;
            //   // setFiles((prev) => [...prev, ...f!]);
            //   setFiles(event.target.value);
            //   files.forEach(file => {
            //     upload(new File([file], { type: f.[0].type }));
            //   });
            // }
          }
        />
        {selectedFiles && (
          <div>
            <h2>Selected Files:</h2>
            <ul>
              {Array.from(selectedFiles).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* {selectedFile && (<p>נבחרו הקבצים: {selectedFile[0]}  {selectedFile[1]}</p>)} */}
    </div>
  );
};

export default ImageUploader;