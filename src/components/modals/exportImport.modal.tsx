import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/state";
import TodoSchemaValidator from "../../utils/TodoSchemaValidator";
import { setAllTodos } from "../../store/state/todo.slice";
import { toast } from "react-toastify";
import Title from "antd/es/typography/Title";
import { saveToLocalStorage } from "../../utils/SyncIntoLocal";

type ExportImportModalProps = {
  open: boolean;
  handleCancel: () => void;
}



const ExportImportModal: React.FC<ExportImportModalProps> = ({ open, handleCancel }) => {

  const todos = useSelector((state: RootState) => state.todos.todos);

  const dispatch = useDispatch();

  const exportJson = () => {
    const data = JSON.stringify(todos);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  const importJson = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result;
          if (typeof content === 'string') {
            try {
              const data = JSON.parse(content);
              const validatedData = TodoSchemaValidator(data);
              console.log(validatedData)
              dispatch(setAllTodos(validatedData as RootState['todos']['todos']))
              saveToLocalStorage(validatedData as RootState['todos']['todos'])
              toast.success('Data Imported Successfully')
              handleCancel();
            }
            catch (error: unknown) {
              toast.error('Error parsing JSON');
              if (error instanceof Error) {
                toast.error(error.message)
              }
            }
          }
        }
        reader.readAsText(file);
      }
    }
    input.click();
  }


  return <Modal
    title="Export or Import Your Data"
    open={open}
    onCancel={handleCancel}
    cancelText="Back"
    footer={null}
    width={400}
  >
    <Col className="mt-6 mb-2">
      <Row align="middle" justify="center">
        <Title className="mb-0" level={5}>Export your data to a JSON file or Import from a JSON File</Title>
        <Typography.Text type="warning">After import click "Save to browser storage" in top right portion to persist the import data</Typography.Text>
      </Row>

      <Row align="middle" justify="center">
        <Button onClick={exportJson} icon={<UploadOutlined />}>Export</Button>
      </Row>
      <Row align="middle" justify="center" className="mt-2">
        <Button onClick={importJson} icon={<DownloadOutlined />}>Import</Button>
      </Row>
    </Col>
  </Modal>
}

export default ExportImportModal;