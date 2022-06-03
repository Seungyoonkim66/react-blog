import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext, ThemeStyleContext } from "../context/ThemeContext";
import Button from "@mui/material/Button";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DragHandleOutlinedIcon from "@mui/icons-material/DragHandleOutlined";
import { Container } from "@mui/material";

const HeaderContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  border-bottom: 1px solid #e0e3e7;
  .header-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }
`;

function Header() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const theme = useContext(ThemeStyleContext);
  const themeToggleIcon = isDark ? (
    <LightModeOutlinedIcon />
  ) : (
    <DarkModeOutlinedIcon />
  );
  return (
    <HeaderContainer id="main-header" theme={isDark ? theme.dark : theme.light}>
      <Container className="header-container">
        <a href="/">
          <img src="/static/images/logo.svg" alt="seungyoon" />
        </a>
        <div>
          <Button
            variant="outlined"
            className="root-btn"
            onClick={() => setIsDark(!isDark)}>
            {themeToggleIcon}
          </Button>
          <Button
            variant="outlined"
            className="root-btn"
            onClick={() => console.log("menu open")}>
            <DragHandleOutlinedIcon />
          </Button>
        </div>
      </Container>
    </HeaderContainer>
  );
}

export default Header;
