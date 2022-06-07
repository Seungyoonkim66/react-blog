import { Typography, Checkbox, FormControlLabel, IconButton, useMediaQuery, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { amber, grey, red } from "@mui/material/colors";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styled from "styled-components";

const TodoContainer = styled.div``;

function Todo({ todo, toggleDone, toggleImprt, deleteTodo, markImm, markDDay }) {
    const [textColor, setTextColor] = useState('black');
    const [dDay, setDDay] = useState(0);

    const mid = useMediaQuery("(min-width:700px)");
    const sml = useMediaQuery("(min-width:500px)");
   
    useEffect(() => {
        const now = new Date();
        const due = new Date(todo.start);  
        let dday =  Math.ceil((due-now)/86400000);
        if(dday === 0) setDDay("day");
        else setDDay(dday);
        
        if(todo.done === true || !markImm) {
            setTextColor('black');
        }
        else {
            
            if (dday === 0){
                setTextColor(red[400]); // D-day
            } else if (dday <= 3) { 
                setTextColor(amber[500]); // D-3
            } else if (dday < 0){ // 지난거 
                setTextColor(grey[500]);
            }
        }
        
    },  [todo.done, todo.start, markImm]);
    
    return (
        <TodoContainer>
            <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex flex-row align-items-center">
                    <FormControlLabel
                        control={<Checkbox checked={todo.done} sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }} />}
                        label={<Typography sx={{ color : textColor }}>{todo.description}</Typography>}
                        onChange={() => toggleDone(todo.id)}
                        sx={todo.done ? { textDecoration: "line-through" } : {}}
                    />
                    {!todo.done && markDDay && <Chip label={<Typography variant="caption">D-{dDay}</Typography>} variant="outlined" size="small"/>}
                    
                </div>
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
