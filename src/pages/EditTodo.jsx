import { useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

export default function EdtTodo() {
    const setTodos = useContext(TodoContext).setTodos;
    const todos = useContext(TodoContext).todos;
    const navigate = useNavigate();
    const id = parseInt(useParams().id); //use useParams hook to get id from the route
    const currentTodo = todos.filter((todo) => todo.id === id)[0];
    const [title, setTitle] = useState(currentTodo.title);
    const [description, setDescription] = useState(currentTodo.description);
    const [completed, setCompleted] = useState(currentTodo.completed);

    function updateTodo(event) {
        event.preventDefault();
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { id, title, description, completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
        navigate("/");
    }

    return (
        <Container>
            <h1 className="my-3">Edit Todo</h1>
            <Form onSubmit={updateTodo}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Get software developer job"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder={`1. Create amazing project\n2. Apply to Google & Netflix\n3. Crush interview`}
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                </Form.Group>

                <Form.Check
                    type="checkbox"
                    id="completed"
                    label="Mark  as completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="mb-3"
                />
                <Button type="submit" variant="secondary">
                    Edit
                </Button>
            </Form>
        </Container>
    )
}