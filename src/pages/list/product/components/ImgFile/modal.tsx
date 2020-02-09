import * as React from 'react';
import { Modal, List, Icon, Popconfirm } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';

interface Props {
  files: UploadFile[];
  visible: boolean;
  toggle: () => void;
  onRemove: (file: UploadFile) => void;
}

const FileListModal: React.FC<Props> = ({ files, visible, toggle, onRemove }) => {
  return (
    <Modal
      visible={visible}
      title="View File"
      footer={false}
      onCancel={toggle}
      width={640}
    >
      <List
        bordered
        dataSource={files}
        renderItem={item => (
          <List.Item>
            <Icon type="paper-clip" style={{ marginRight: 8 }} />
            {item.name}
            <Popconfirm
              title="Are you sure delete this file?"
              onConfirm={() => onRemove(item)}
            >
              <Icon type="delete" style={{ marginLeft: 8 }} />
            </Popconfirm>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default FileListModal;