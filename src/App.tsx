import { useState } from "react";
import './App.css'
import { TodoForm } from "./components/TodoForm/TodoForm.tsx";
import { TodoItem } from './components/TodoItem/TodoItem.tsx';
import type { TodoItemType } from "./shared/types.ts";

const mockTodos: TodoItemType[] = [{
  id: 1,
  label: 'Сдать чекпоинт по практике',
  isChecked: false
}, {
  id: 2,
  label: 'Закончить семестровую работу',
  isChecked: false
}, {
  id: 3,
  label: 'Купить хлеб и сосиски :)',
  isChecked: true
}]

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>(mockTodos);
  const completedTodos = todos.filter((todo) => todo.isChecked).length;
  const activeTodos = todos.length - completedTodos;
  const progress = todos.length > 0 ? Math.round((completedTodos / todos.length) * 100) : 0;

  const handleTaskCheckedChange = (id: number) => {
    setTodos((prevState) => {
      return prevState.map((value) => {
        if (value.id === id) {
          return {
            ...value,
            isChecked: !value.isChecked
          }
        }

        return value;
      })
    });
  }

  const handleAddTodo = (label: string) => {
    const todoItem: TodoItemType = {
      id: Date.now(),
      label,
      isChecked: false
    };

    setTodos((prevState) => [...prevState, todoItem]);
  }

  return (
    <main className="page">
      <section className="intro-card" aria-label="Описание приложения">
        <div className="logo">
          <span aria-hidden="true">✓</span>
          <p>Мой Todo</p>
        </div>

        <div>
          <p className="tag">Простой список</p>
          <h1>Мои задачи на сегодня</h1>
          <p className="intro-text">
            Небольшое приложение, чтобы потренировать стили, позиционирование, flex и grid.
          </p>
        </div>

        <div className="student-illustration" aria-hidden="true">
          <div className="sun" />
          <div className="paper">
            <span />
            <span />
            <span />
          </div>
          <div className="pencil" />
        </div>
      </section>

      <section className="todo-card" aria-labelledby="todo-heading">
        <div className="card-header">
          <div>
            <p className="tag">План на день</p>
            <h2 id="todo-heading">Список задач</h2>
          </div>
          <span className="progress">{progress}% готово</span>
        </div>

        <div className="stats-grid" aria-label="Статистика задач">
          <div>
            <strong>{todos.length}</strong>
            <span>Всего</span>
          </div>
          <div>
            <strong>{activeTodos}</strong>
            <span>Осталось</span>
          </div>
          <div>
            <strong>{completedTodos}</strong>
            <span>Готово</span>
          </div>
        </div>

        <TodoForm onAdd={handleAddTodo} />

        <div className="todo-list" aria-label="Список задач">
          {todos.map((value) => (
            <TodoItem
              id={value.id}
              key={value.id}
              label={value.label}
              done={value.isChecked}
              onChange={handleTaskCheckedChange}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
