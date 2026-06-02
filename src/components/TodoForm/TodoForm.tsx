import { useState, type FormEvent } from "react";

type TodoFormProps = {
    onAdd: (label: string) => void;
}

export function TodoForm(props: TodoFormProps) {
    const { onAdd } = props;
    const [label, setLabel] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedLabel = label.trim();

        if (!trimmedLabel) {
            return;
        }

        onAdd(trimmedLabel);
        setLabel("");
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <label className="todo-input-wrap">
                <span className="input-icon" aria-hidden="true">+</span>
                <input
                    type="text"
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                    placeholder="Новая задача"
                    aria-label="Текст новой задачи"
                />
            </label>
            <button type="submit">Добавить</button>
        </form>
    )
}
