import React from "react";
import styled from 'styled-components'

const WrapperMonitor = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #1e1f23;
    color:#dcdddd;
    padding: 16px;

`;

const WrapperText = styled.span`
    font-size: 32px;

`;

const WrapperTitle = styled(WrapperText)`
    font-weight: bold;
    margin-right: 8px;

`;
const WrapperButton = styled.div`
    display:flex;
    padding-top: 8px;
`;
const MonitorButton = styled.button`
    border: unset;
    background-color: #565759;
    height: 20px;
    margin-right: 2px;
    border-radius: 4px;
    color: #e6e6e6;
`;

const ButtonToDay = styled(MonitorButton)`
    padding-left: 16px;
    padding-right: 16px;
    font-weight: bold;

`;



const Monitor = ({today,prevHandler,todayHandler,nextHandler}) => {

    return(
        <WrapperMonitor>
            <div>
                <WrapperTitle>{today.format('MMMM')}</WrapperTitle>
                <WrapperText>{today.format('YYYY')}</WrapperText>
            </div>
            <WrapperButton>
                <MonitorButton onClick={prevHandler}> &lt; </MonitorButton>
                <ButtonToDay onClick={todayHandler}> Today </ButtonToDay>
                <MonitorButton onClick={nextHandler}> &gt; </MonitorButton>
            </WrapperButton>
        </WrapperMonitor>
    );
};

export {Monitor};