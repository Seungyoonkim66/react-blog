import { Container, Typography, Button, Paper, Switch, FormControlLabel } from "@mui/material";
import React, { useReducer, useState } from "react";
import { TodoReducer as reducer } from "../reducer/Reducer";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "react-datepicker/dist/react-datepicker.css";
import { TODO_ACTION_TYPES as ACTION_TYPES } from "../action/ActionTypes";
import NewTodo from "./TodoList/NewTodo";
import Todo from "./TodoList/Todo";

const TodoListContainer = styled.div``;
const initTodos = [
    { id: 1, description: "선반 당근", start: "June 04, 2022 10:10 AM", end: "", imprtFlag: true, done: true },
    {
        id: 2,
        description: "쇼파베드 당근",
        start: "June 11, 2022 08:00 AM",
        end: "June 11, 2022 08:30 AM",
        imprtFlag: false,
        done: false,
    },
    { id: 3, description: "민주 송별회", start: "June 06, 2022 12:00 AM", end: "", imprtFlag: true, done: false },
    {
        id: 4,
        description: "3일 뒤 이사",
        start: "June 04, 2022 12:00 AM",
        end: "June 6, 2022 12:00 AM",
        imprtFlag: true,
        done: false,
    },
    {id: 5, description: '오늘 했어야 하는데 안 한 일', start: 'June 03, 2022 1:35 PM', end: '', imprtFlag: false, done: false }
];

function TodoList() {
    const [openNewTodo, setOpenNewTodo] = useState(true);
    const [markImm, setMarkImm] = useState(true);
    const [markDDay, setMarkDDay] = useState(true);
    const [todos, dispatch] = useReducer(reducer, initTodos);

    const addTodo = () => {
        const description = document.getElementById("todo-description");
        const start = document.getElementById("todo-start");
        const end = document.getElementById("todo-end");
        const imprt = document.getElementById("todo-important").checked;

        const payload = {
            newTodo: {
                id: todos.length !== 0 ? todos[todos.length - 1].id + 1 : 1,
                description: description.value,
                start: start.value,
                end: end.value,
                imprtFlag: imprt,
                done: false,
            },
        };
        dispatch({ type: ACTION_TYPES.ADD_TODO, payload: payload });
        description.value = "";
        description.focus();
    };

    const toggleDone = (id) => {
        dispatch({ type: ACTION_TYPES.TOGGLE_TODO_DONE, payload: { id: id } });
    };

    const toggleImprt = (id) => {
        dispatch({ type: ACTION_TYPES.TOGGLE_TODO_IMPRT, payload: { id: id } });
    };

    const deleteTodo = (id) => {
        dispatch({ type: ACTION_TYPES.DELETE_TODO, payload: { id: id } });
    };

    return (
        <TodoListContainer className="mb-5">
            <Container>
                <div className="d-flex flex-row align-items-center justify-content-between">
                    <Typography variant="h4" className="mb-3" sx={{ fontWeight: "bold" }}>
                        Todo List
                    </Typography>

                    <div>

                        <FormControlLabel
                            labelPlacement="bottom"
                            control={<Switch size="small" checked={markDDay} onChange={() => setMarkDDay(!markDDay)} />}
                            label={
                                <Typography className="text-muted" variant="caption">
                                    D-day 표시
                                </Typography>
                            }
                        />

                        <FormControlLabel
                            labelPlacement="bottom"
                            control={<Switch size="small" checked={markImm} onChange={() => setMarkImm(!markImm)} />}
                            label={
                                <Typography className="text-muted" variant="caption">
                                    급한 일정 표시
                                </Typography>
                            }
                        />

                        <Button variant="contained" onClick={() => setOpenNewTodo(!openNewTodo)}>
                            {openNewTodo ? <CloseOutlinedIcon /> : <AddOutlinedIcon />}
                        </Button>
                    </div>
                </div>

                <NewTodo openNewTodo={openNewTodo} addTodo={addTodo} />

                <Paper className="d-flex flex-column mt-3 p-2 ps-3">
                    {todos.map((todo) => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            toggleImprt={toggleImprt}
                            toggleDone={toggleDone}
                            deleteTodo={deleteTodo}
                            markImm={markImm}
                            markDDay={markDDay}
                        />
                    ))}
                </Paper>
            </Container>
        </TodoListContainer>
    );
}

export default TodoList;
