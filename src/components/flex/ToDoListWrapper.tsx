import React from 'react';
import { Flex } from 'antd';
import { motion } from 'framer-motion';
import ToDoCard from '../toDo/toDoCard.tsx';
import CreateTodo from '../toDo/createTodo.tsx';

import type { RootState } from "../../store/state/index.ts"

import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

const ToDoListWrapper: React.FC = () => {

  const todos = useSelector((state: RootState) => state.todos.todos);

  const childVariants = {
    hidden: { opacity: 0, scale: 0, width: 0, height: 0 },
    show: { opacity: 1, scale: 1, width: "auto", height: "auto", transition: { ease: "easeOut" } },
    exit: { opacity: 0, scale: 0, width: 0, height: 0, transition: { ease: 'easeInOut' } }
  };

  return <Flex wrap="wrap" gap="small">

    <AnimatePresence>
      <CreateTodo />
      {todos && todos?.map((item, index) => {
        // return <motion.div key={item.id} initial="hidden" animate="show" variants={childVariants} ><ToDoCard key={item.id} title={item.title} content={item.content} id={item.id} /> </motion.div>
        return <motion.div key={todos.length - index + 1} initial="hidden" animate="show" exit="exit" variants={childVariants} className='mx-2'>
          <ToDoCard key={item.id} title={item.title} content={item.content} id={item.id} />
        </motion.div>
      })}

    </AnimatePresence>
  </Flex>

};

export default ToDoListWrapper;
