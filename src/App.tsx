import React, { useEffect } from 'react';
import { Button, Col, ConfigProvider, Layout, Menu, Row, Space, theme } from 'antd';
import ToDoListWrapper from './components/flex/ToDoListWrapper';
import { useSelector } from 'react-redux'; import { RootState } from './store/state';
import Title from 'antd/es/typography/Title';
import { saveToLocalStorage } from './utils/SyncIntoLocal';
import { HighlightFilled } from '@ant-design/icons';
import ExportImportModal from './components/modals/exportImport.modal';
import antdThemeConfig from './configs/antdThemeConfig';


const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [items, setItems] = React.useState<{ key: string; label: string; }[]>([]);
  const [openExportImportModal, setOpenExportImportModal] = React.useState(false);

  const todos = useSelector((state: RootState) => state.todos.todos);

  const onClickSaveToLocalStorage = () => {
    saveToLocalStorage(todos);
  }

  useEffect(() => {
    const _items = todos.map(
      (todo, index) => ({
        key: String(index + 1),
        label: todo?.title,
      }),
    );
    setItems(_items);
  }, [todos]);

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      // onBreakpoint={(broken) => {
      //   console.log(broken);
      // }}
      // onCollapse={(collapsed, type) => {
      //   console.log(collapsed, type);
      // }}
      >
        <div
          className="text-center align-middle justify-center flex items-center"
          style={{
            height: "32px",
            margin: "16px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <HighlightFilled />
        </div>
        <Menu selectable={false} theme="dark" mode="inline" items={items} className='mt-' />
      </Sider>
      <ConfigProvider
        theme={antdThemeConfig}
      >
        <Layout
          style={{ minHeight: "100vh" }}
        >
          <Header style={{ position: 'sticky', padding: 0, background: colorBgContainer }}>
            <Row justify={'center'} align={'middle'} style={{ height: "100%" }}>
              <Col span={8}>
                <Row justify="start" align="middle" style={{ height: "100%" }} className='ms-4'>
                  <Title style={{ margin: "0px" }} level={3}>Todo by XaliT</Title>
                </Row>
              </Col>
              <Col span={8} offset={8}>
                <Row justify="end" align="middle" style={{ height: "100%" }} className='me-4'>
                  <ExportImportModal open={openExportImportModal} handleCancel={() => { setOpenExportImportModal(false) }} />
                  <Space>
                    <Button onClick={() => setOpenExportImportModal(true)}>Export/Import</Button>
                    <Button onClick={onClickSaveToLocalStorage}>Save to browser storage</Button>
                  </Space>
                </Row>
              </Col>
            </Row>
          </Header>

          <Content style={{ margin: '24px 16px 0' }}
          >
            <div
              className='min-h-screen'
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <ToDoListWrapper />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            XaliT ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </ConfigProvider>
    </Layout>
  );
};

export default App;