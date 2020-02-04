import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import Skeleton from 'react-loading-skeleton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import beer from '../../../img/icons/beer.svg';
import beerbox from '../../../img/icons/beerbox.svg';
import weatherIcon from '../../../img/icons/weather.svg';
import calendarIcon from '../../../img/icons/calendar.svg';
import locationIcon from '../../../img/icons/location.svg';

import { StyledCardFooterWrapper,
    StyledMeetupCard,
    StyledLeftIcon, 
    StyledCenterIcon,
    StyledRightIcon
} from './styled';


class Meetup extends Component {

    state = {
        beers: null,
        annotated: false,
        checkIn: false,
        loading: false,
    }

    componentDidMount() {
        const { data } = this.props;
        const beers = this.calculateBeersMeetup(data);
        this.setState({ beers });
        this.filterMeetupsUser();
    }

    filterMeetupsUser = () => {
        const { meetupsUser, data } = this.props;
        meetupsUser.forEach(meetup => {
            if(meetup.meetup_id === data._id) this.setState({ annotated: true });
        })
    }

    calculateBeersMeetup = (meetup) => {
        const { weather, attendance } = meetup;
        if(weather >= 20 && weather <= 24) return Math.ceil(attendance * 1);
        if(weather < 20) return Math.ceil(attendance * 0.75);
        if(weather > 24) return Math.ceil(attendance * 2);
    }

    handleClickSignup = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ annotated: true, loading: false });
        }, 2000);
    }

    handleClickCheckIn = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ checkIn: true, loading: false });
        }, 2000);
    }

    objectNonEmpty = (obj) => {
        return Object.getOwnPropertyNames(obj).length >= 1;
    }

    render(){
        const { beers, annotated, loading, checkIn } = this.state;
        const { data, user } = this.props;
        return(
            <StyledMeetupCard style={{ width: '18rem' }}>
                <Card.Body>
                    {(data.title && 
                    <Card.Title>{data.title}</Card.Title>) || <Skeleton />}
                    <span>
                    {(data.date && 
                    <Card.Subtitle className="mb-2 text-muted">
                        <StyledLeftIcon src={calendarIcon} alt="calendar" width={16} />
                        <em>{data.date}</em>
                    </Card.Subtitle>) || <Skeleton />}
                    {(data.location && 
                    <Card.Subtitle className="mb-2 text-muted">
                        <StyledLeftIcon src={locationIcon} alt="location" width={16} />
                        <em>{data.location}</em>
                    </Card.Subtitle>) || <Skeleton />}
                    </span>
                    {(data.description && 
                    <Card.Text>{data.description}</Card.Text>) || <Skeleton />}
                </Card.Body>
                <Card.Footer>
                    <StyledCardFooterWrapper>
                        {(data.weather && <span><StyledLeftIcon src={weatherIcon} width={30} />{`${data.weather}º`}</span>) || <Skeleton />}
                        {user.type && user.type === "admin" && 
                        <OverlayTrigger
                        key="top"
                        placement="bottom"
                        trigger="hover"
                        overlay={
                            <Tooltip>
                                {`Para esta meetup se necesitan por lo menos ${Math.ceil(beers/6)} cajas de cervezas.`}
                            </Tooltip>}>
                            <span>
                                {beers}<StyledCenterIcon src={beer} width={30} />
                                {Math.ceil(beers/6)}<StyledRightIcon src={beerbox} width={30} />
                            </span>
                        </OverlayTrigger>}
                        {user.type && user.type === "guest" && !annotated && 
                        <Button variant="warning" onClick={this.handleClickSignup}>
                            {(!loading && 'Anotarme')
                            || <Loader type="ThreeDots" color="#222222" height={20} width={20} />}
                        </Button>}
                        {user.type && user.type === "guest" && annotated && !checkIn &&
                        <Button variant="success" onClick={this.handleClickCheckIn}>
                            {(!loading && 'Check-in')
                            || <Loader type="ThreeDots" color="#FFFFFF" height={20} width={20} />}
                        </Button>}
                        {user.type && user.type === "guest" && annotated && checkIn &&
                        <Button variant="secondary" disabled>Meetup asistida</Button>}
                    </StyledCardFooterWrapper>
                </Card.Footer>
            </StyledMeetupCard>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        meetupsUser: state.meetupsUser,
    }
}

export default connect(mapStateToProps, null)(Meetup);
