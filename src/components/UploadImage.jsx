import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

const UploadImage = ({ onUpload }) => {
  return (
    <FileUploaderRegular
      pubkey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY}
      maxLocalFileSizeBytes={2_000_000} // 2MB
      multiple={false}
      imgOnly
      sourceList="local, camera"
      onFileUploadSuccess={(file) => {
        onUpload(file.cdnUrl); // URL pública
      }} 
    />
  );
};

export default UploadImage;