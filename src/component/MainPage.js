import React, { useContext } from "react";
import styled from "styled-components";
import { Divider } from "@mui/material";
import TodoList from "./TodoList";
import PostBoard from "./PostBoard";
import { ThemeContext, ThemeStyleContext } from "../context/ThemeContext";

const MainPageContainer = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
`;

function MainPage() {
    const { isDark, setIsDark } = useContext(ThemeContext);
    const theme = useContext(ThemeStyleContext);
    return (
        <MainPageContainer className="pb-4" theme={isDark ? theme.dark : theme.light}>
            <PostBoard />
            <Divider variant="middle" className="my-4" />
            <TodoList />
        </MainPageContainer>
    );
}

export default MainPage;
