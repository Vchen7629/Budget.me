import React from 'react';
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useEffect, useState } from "react";
import { FilePondFile } from "filepond";
import { useSelector } from "react-redux";
import { selectCurrentusername } from "@/app/api-slices/userSlice";

const PdfDropZone = () => {
    const [file, setFiles] = useState<FilePondFile[]>([]);
    //const username = useSelector(selectCurrentusername)

    useEffect(() => {
        console.log("Files:", file);
      }, [file]);

    return (
        <div className="flex justify-center items-center bg-white rounded-lg shadow-md p-4">
            <div className='flex h-[15vh] w-full'>
                <FilePond 
                    files={file}
                    onupdatefiles={(fileItems: FilePondFile[]) => {
                        setFiles(fileItems);
                    }}
                    allowMultiple={true}
                    acceptedFileTypes={['application/pdf']}
                    name="files"
                    server="http://127.0.0.1:5000/parsePDF"
                    labelIdle='Drag & Drop your PDF or <span class="filepond--label-action">Browse</span>'
                />
            </div>
        </div>
  );
};

export default PdfDropZone;