import * as React from 'react';
import { Button, Icon, Upload, message } from 'antd';
import {UploadFile} from 'antd/lib/upload/interface'
import { useToggle } from 'react-use';
import FileListModal from './modal';

interface Props {
  value: UploadFile[];
  onChange: (value: UploadFile) => void;
}

const ImgFile: React.FC<Props> = ({ value, onChange }) => {
  const [uploading, setUpload] = React.useState(false);
  const [modalVisible, toggleModalVisible] = useToggle(false);

  const handleRemove = (file: UploadFile) => {
    onChange(value.filter(f=>f!==file));
  };

  return (
    <>
      <Upload
        name="file"
        action="/server/api/seller/config/uploadFile"
        showUploadList={false}
        onChange={info => {
          setUpload(true);
          if (info.file.status === 'done') {
            setUpload(false);
            console.log("reponse ", info)
            onChange(info.fileList);
          } else if (info.file.status === 'error') {
            setUpload(false);
            message.error(`${info.file.name} file upload failed.`);
          }
        }}
      >
        <Button loading={uploading}>
          <Icon type="upload" /> {uploading ? 'Uploading' : 'Upload'}
        </Button>
      </Upload>
      <Button type="link" onClick={toggleModalVisible}>
        View File（{value.length}）
      </Button>
      <FileListModal
        visible={modalVisible}
        toggle={toggleModalVisible}
        files={value}
        onRemove={handleRemove}
      />
    </>
  );
};

export default ImgFile;