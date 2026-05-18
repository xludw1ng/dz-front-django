import { useState } from "react";

type TodoFormProps = {
    onAdd: (label: string) => void;
}

type PreventDefaultEvent = {
    preventDefault: () => void;
}

export function TodoForm(props: TodoFormProps) {
    const { onAdd } = props;
    const [label, setLabel] = useState("");

    function handleSubmit(event: PreventDefaultEvent) {
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
            <input
                type="text"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                placeholder="Новая задача"
            />
            <button type="submit">Добавить задачу</button>
        </form>
    )
}
