import React from 'react';
import styled from 'styled-components';

const NotFoundPageContainer = styled.div`
    text-align: center;
`;

function NotFoundPage(){
    return(
        <NotFoundPageContainer>
            404 Error
        </NotFoundPageContainer>
    );
}

export default NotFoundPage;