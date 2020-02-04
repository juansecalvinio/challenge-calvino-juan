import React, { Component } from 'react'
import { StyledContainer } from './styled';

import Meetup from './Meetup';

class Container extends Component {
    
    render() {
        const { data, loading } = this.props;
        return (
            <StyledContainer> 
                {loading && data.length === 0 && Array.from({ length: 4 }, (_, index) => <Meetup data="" key={index} />)}
                {data.length > 0 && data.map(meetup => <Meetup data={meetup} key={meetup._id} />)}
            </StyledContainer> 
        )
    }
}

export default Container;
