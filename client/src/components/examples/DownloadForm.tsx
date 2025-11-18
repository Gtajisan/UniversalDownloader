import DownloadForm from '../DownloadForm';

export default function DownloadFormExample() {
  return (
    <DownloadForm 
      onDownloadResult={(result) => console.log('Download result:', result)} 
    />
  );
}
