import { Typography, Checkbox, TextField, Button, Alert } from "@mui/material";
import { amber } from "@mui/material/colors";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewTodoContainer = styled.div``;

function NewTodo({ openNewTodo, addTodo }) {
    const [showAlert, setShowAlert] = useState(false);
    const [checkImprt, setCheckImprt] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 86400000));// start date + 1
   
    const handleClickAddBtn = () => {
        const start = document.getElementById("todo-start");
        const end = document.getElementById("todo-end");
        if (new Date(start.value) >= new Date(end.value)) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            },5000);
            return;
        } else {
            setShowAlert(false);
            addTodo();
            setStartDate(null);
            setEndDate(null);
        }
    }

    return (
        <NewTodoContainer>
            {openNewTodo && (
                <>
                    <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                        <Typography variant="h5" sx={{ fontWeight: "bold" }} color="primary">
                            New Todo
                        </Typography>
                        <Button id="todo-submit-btn" variant="outlined" onClick={handleClickAddBtn}>
                            <CheckOutlinedIcon />
                        </Button>
                    </div>

                    {showAlert && <Alert className="mb-3" severity="error">시작일이 종료일 이전이어야 합니다.</Alert>}

                    <TextField id="todo-description" fullWidth label="할 일" size="small" className="mb-3" />
                    <div className="d-flex flex-row align-items-center justify-conent-between">
                        <DatePicker
                            id="todo-start"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeIntervals={5}
                            dateFormat="MMMM dd, yyyy h:mm aa"
                            customInput={
                                <TextField fullWidth size="small" label="시작일" placeholder="MMMM D, YYYY h:mm aa" />
                            }
                            isClearable
                        />
                        <Typography variant="span" className="mx-3 text-muted"> - </Typography>
                        <DatePicker
                            id="todo-end"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            showTimeSelect
                            timeIntervals={5}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            customInput={
                                <TextField fullWidth size="small" label="종료일" placeholder="MMMM D, YYYY h:mm aa" />
                            }
                            isClearable
                        />
                        <Checkbox
                            className="ms-2"
                            id="todo-important"
                            checked={checkImprt}
                            onChange={() => setCheckImprt(!checkImprt)}
                            icon={<StarOutlineOutlinedIcon sx={{ fontSize: "30px", color: amber[300] }} />}
                            checkedIcon={<StarOutlinedIcon sx={{ fontSize: "30px", color: amber[300] }} />}
                            color="warning"
                        />
                    </div>
                </>
            )}
        </NewTodoContainer>
    );
}

export default NewTodo;
