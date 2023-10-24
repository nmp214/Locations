import React, { useState } from 'react';
import 'firebase/storage';

const ImageUploader: React.FC<any> = (props: any) => {
  // const [selectedFile, setSelectedFile] = useState([]);
  const [files, setFiles] = useState('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event: ', event);
    setFiles(event.target.value);
    const file = event.target.value;
    console.log('files: ', files);
    if (file) {
      console.log(file);
      // setSelectedFile(file);
      props.handleFile(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        value={files}
      />
      {/* {selectedFile && (<p>נבחרו הקבצים: {selectedFile[0]}  {selectedFile[1]}</p>)} */}
    </div>
  );
};

export default ImageUploader;