interface Todo {
  id: number;
  title: string;
  content: string;
}

const fakeTodos: Todo[] = [
  {
    id: 1,
    title: "Buy groceries",
    content: "Milk, eggs, bread",
  },
  {
    id: 2,
    title: "Finish homework",
    content: "Math, Science, English",
  },
  {
    id: 3,
    title: "Go for a run",
    content: "5 kilometers",
  },
];

export default fakeTodos;
