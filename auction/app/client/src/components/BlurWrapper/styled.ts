import styled, { css } from 'styled-components';

interface BlurWrapperProps {
    lock: number;
}

export const HeightWrapper = styled.div<BlurWrapperProps>`
    ${props => props.lock !== undefined && css<BlurWrapperProps>`
        max-height: 100vh;
        overflow: hidden;
    `};
`;

export const BlurWrapper = styled.div<BlurWrapperProps>`
    ${props => props.lock !== undefined && css<BlurWrapperProps>`
        filter: blur(6px);
        transform: translateY(-${props.lock}px);
        pointer-events: none;
    `};
`;
