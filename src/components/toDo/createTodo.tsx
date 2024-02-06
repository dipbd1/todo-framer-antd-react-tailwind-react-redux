import React, { useState } from 'react';
import { Input, Button, Card } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/state/todo.slice';

import { useAnimate } from 'framer-motion';

const CreateTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const [scope, animate] = useAnimate();

  const handleSaveTodo = () => {
    // Save the todo using hooks or any other logic
    if (!title || !content) {
      // animation for error
      // a simple shake animation that stays for 1 second
      animate(scope.current, { x: [0, -10, 5, -5, 5, -5, 5, 0], transition: { duration: 1 } });
      return;
    }
    dispatch(addTodo({
      id: Math.random() * 10000,
      title,
      content,
      completed: false,
    }));
    setTitle('');
    setContent('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div ref={scope} className="flex items-center">
      <Card className="w-80 mx-auto mt-8 shadow-md hover:shadow-lg" title={
        <Input
          variant='borderless'
          className="mr-2 text-2xl font-semibold"
          placeholder="Enter your Title"
          value={title}
          onChange={handleInputChange}
        />
      }>
        <TextArea
          variant='borderless'
          className="mr-2"
          placeholder="Enter your Content"
          value={content}
          onChange={handleContentInputChange}
          autoSize={{ minRows: 3 }}
        />
        <Button type="primary" onClick={handleSaveTodo}>
          Save
        </Button>
      </Card>


    </div>
  );
};

export default CreateTodo;
