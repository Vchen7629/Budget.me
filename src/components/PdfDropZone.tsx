import React from 'react';
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

const PdfDropZone = () => {
  return (
    <div className="flex justify-center items-center bg-white rounded-lg shadow-md p-4">
      <div className="flex h-full w-full">
        <div className="w-full h-full">
          <h2 className="text-xl font-bold">Upload Statement</h2>
          <FilePond 
            allowMultiple={true}
            acceptedFileTypes={['application/pdf']}
            server="http://127.0.0.1:5000/parsePDF"  
            labelIdle='Drag & Drop your PDF or <span class="filepond--label-action">Browse</span>'
          />
          <p className='text-gray-500 text-xs mt-5'>
            *Document details will be automatically parsed by Gemini and added to your data
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfDropZone;