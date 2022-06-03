import { Typography, Checkbox, FormControlLabel, IconButton, useMediaQuery, Switch } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { amber, grey, red, blue } from "@mui/material/colors";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styled from "styled-components";

const TodoContainer = styled.div``;

function Todo({ todo, toggleDone, toggleImprt, deleteTodo, markImm }) {
    const [textColor, setTextColor] = useState('black');
    const mid = useMediaQuery("(min-width:700px)");
    const sml = useMediaQuery("(min-width:500px)");
   
    useEffect(() => {
        if(todo.done === true || !markImm) {
            setTextColor('black');
        }
        else {
            const now = new Date();
            const due = new Date(todo.start);    
            if((due - now) <= 86400000){
                setTextColor(red[400]); // D-1
            } else if ((due - now) <= 259200000) { 
                setTextColor(amber[500]); // D-3
            }
        }
    },  [todo.done, todo.start, markImm]);
    
    return (
        <TodoContainer>
            <div className="d-flex flex-row align-itmes-center justify-content-between">
                <FormControlLabel
                    control={<Checkbox checked={todo.done} sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }} />}
                    label={<Typography sx={{ color : textColor }}>{todo.description}</Typography>}
                    onChange={() => toggleDone(todo.id)}
                    sx={todo.done ? { textDecoration: "line-through" } : {}}
                />
                <div>
                    {todo.start !== "" && sml && (
                        <Typography variant="caption" sx={todo.done ? { textDecoration: "line-through" } : {}}>
                            {todo.start}
                            {mid ? " - " + todo.end : " ~ "}
                        </Typography>
                    )}
                    <Checkbox
                        className="ms-2"
                        id="todo-important"
                        checked={todo.imprtFlag}
                        onChange={() => toggleImprt(todo.id)}
                        icon={
                            <StarOutlineOutlinedIcon
                                sx={
                                    todo.done
                                        ? { fontSize: "30px", color: grey[400] }
                                        : { fontSize: "30px", color: amber[300] }
                                }
                            />
                        }
                        checkedIcon={
                            <StarOutlinedIcon
                                sx={
                                    todo.done
                                        ? { fontSize: "30px", color: grey[400] }
                                        : { fontSize: "30px", color: amber[300] }
                                }
                            />
                        }
                        color="warning"
                    />
                    <IconButton onClick={() => deleteTodo(todo.id)}>
                        <DeleteOutlineOutlinedIcon sx={todo.done ? { color: red[400] } : { color: grey[400] }} />
                    </IconButton>
                </div>
            </div>
        </TodoContainer>
    );
}

export default Todo;
