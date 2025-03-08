import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

const PdfDropZone = () => {
    
    return (
        <div className="flex justify-center items-center bg-white rounded-lg shadow-md p-4">
            <div className='flex h-[15vh] w-full'>
                <FilePond 
                    allowMultiple={true}
                    acceptedFileTypes={['application/pdf']}
                    server="/api/upload" // your server endpoint
                    labelIdle='Drag & Drop your PDF or <span class="filepond--label-action">Browse</span>'
                />
            </div>
        </div>
    )
}

export default PdfDropZone