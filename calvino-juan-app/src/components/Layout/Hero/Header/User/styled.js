import styled, { keyframes } from 'styled-components';

// Creo la animación para girar la monedita
const flipBeer = () => {
    const rotation = keyframes`
        0% {
            transform: rotateY(0deg);
        }
        40% {
            transform: rotateY(2turn);
        }
        100% {
            transform: rotateY(2turn);
        }
    `;
    return rotation;
}

export const StyledUserInfoWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const StyledUserName = styled.span`
    color: #FFFFFF;
    cursor: pointer;
    font-weight: 700;
    position: relative;
    -webkit-transition: all 3s;
    transition: all 3s;

    &:hover:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1.5px;
        background: #FFFFFF;
        bottom: -2px;
        left: 0;
    }
`;

export const StyledUserBeers = styled.div`
    align-items: center;
    background: rgba(233, 63, 51, 0.7);
    border-radius: 50px;
    color: #FFFFFF;
    cursor: pointer;
    display: flex;
    font-weight: 700;
    justify-content: center;
    margin-left: 0.6em;
    padding: 0.4em 0.5em 0.4em 1em;
`;

export const StyledBeer = styled.img`
    animation: ${flipBeer} 15s infinite;
    animation-delay: 5s;
    margin-left: 4px;
`;
