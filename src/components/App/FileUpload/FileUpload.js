import React from 'react';
import { FaRegImage } from 'react-icons/fa';
import './FileUpload.scss';

type Props = {
  file: any,
  handleFileUpload: Function,
}

class FileUpload extends React.Component<Props> {
  render () {
    const { file, handleFileUpload } = this.props;

    return (
      <div className="file-upload">
        <div className="label-text">Upload file</div>
        <label htmlFor="upload-file">
          <>
            <p>Upload single file</p>
            <FaRegImage />
          </>
          {file ? (
            <p>{file.name}</p>
          ) : (
            <p>Click or drag and drop</p>
          )}
        </label>
        <input
          id="upload-file"
          type="file"
          onChange={handleFileUpload}
        />
      </div>
    );
  }
}

export default FileUpload;
