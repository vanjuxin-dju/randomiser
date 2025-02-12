import React from "react";
import styled from 'styled-components';

const StyledSector = styled.section<{ $rotateSector : number, $rotateBefore : number }>`
    transform: rotate(${props => props.$rotateSector}deg);
    &::before {
        transform: rotate(${props => props.$rotateBefore}deg);
    }
`;

const StyledText = styled.div<{ $rotateText : number, $rightPos : number, $bottomPos : number }>`
    transform: rotate(${props => props.$rotateText}deg);
    right: ${props => props.$rightPos}vmin;
    bottom: ${props => props.$bottomPos}vmin;
`;

function Sector({ text, sectorAngle, optionsLength, index } : { text : string, sectorAngle : number, optionsLength : number, index : number}) : React.JSX.Element {
    return <StyledSector $rotateSector={sectorAngle * index} $rotateBefore={180 - sectorAngle} className="sector">
        <StyledText $rotateText={optionsLength > 2 ? (-sectorAngle / 2) : 0} $rightPos={sectorAngle / 10} $bottomPos={optionsLength > 2 ? sectorAngle * 0.14 : 20} className="text">{text}</StyledText>
    </StyledSector>;
}

export default Sector;