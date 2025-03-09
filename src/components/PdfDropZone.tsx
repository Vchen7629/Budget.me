import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useState } from "react";
import { FilePondFile } from "filepond";

const PdfDropZone = ({ refetch }: any) => {
    const [_, setFiles] = useState<FilePondFile[]>([]);

    return (
        <div className="flex justify-center items-center bg-white rounded-lg shadow-md p-4">
            <div className='h-full w-full'>
                <FilePond 
                    onupdatefiles={(fileItems: FilePondFile[]) => {
                        setFiles(fileItems);
                    }}
                    allowMultiple={true}
                    acceptedFileTypes={['application/pdf']}
                    onprocessfile={() => {
                        refetch();
                    }}
                    name="files"
                    server="http://127.0.0.1:5000/parsePDF"
                    labelIdle='Drag & Drop your PDF or <span class="filepond--label-action">Browse</span>'
                />
            </div>
        </div>
  );
};

export default PdfDropZone;