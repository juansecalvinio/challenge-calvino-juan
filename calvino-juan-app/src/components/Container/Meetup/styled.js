import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const StyledMeetupCard = styled(Card)`
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.15);
    margin: 1em;
    min-height: 350px;
    max-height: 350px;
    transition: all .2s ease-in-out;

    &:hover {
        box-shadow: 0 12px 15px 0 rgba(0,0,0,0.15);
    }

    .card-title {
        margin-bottom: 1em !important;
    }

    .card-subtitle {
        font-size: .9rem !important;
        margin: .6rem 0;
    }
`;

export const StyledCardFooterWrapper = styled.span`
    display: flex;
    font-weight: 700;
    justify-content: space-between;
`;

export const StyledCenterIcon = styled.img`
    margin: 0 5px;
`;

export const StyledLeftIcon = styled.img`
    margin-right: 5px;
`;

export const StyledRightIcon = styled.img`
    margin-left: 5px;
`;
