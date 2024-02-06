import React from 'react';
import { Card } from 'antd';
import Title from 'antd/es/typography/Title';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../store/state/todo.slice';

const ToDoCard: React.FC<{ title: string; content: string, id: number }> = ({ title, content, id }) => {

  const [hover, setHover] = React.useState(false);
  const dispatch = useDispatch();

  const CardTitle = () => {
    return <Title
      style={{ marginBottom: "0px" }} level={3}
      className='text-wrap'
    >{title}</Title>
  }

  const onClickDeleteTodo = () => {
    dispatch(deleteTodo(id));
  }

  return (
    <Card
      className="mt-8 shadow-sm hover:shadow-md min-h-52"
      title={<CardTitle />}
      extra={<CloseCircleTwoTone onClick={onClickDeleteTodo} twoToneColor={hover ? "#C41E3A" : ""} className="ps-6" />}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p>{content}</p>
    </Card>
  );
};

export default ToDoCard;
