import React, { Component } from 'react';
import Loader from '../../components/Loader';

const SeriesDetails = ({show}) => (
    <div>
        <h3> {show.name} </h3>
        <div> Premiered - {show.premiered} </div>
        <div> Ratings - {show.rating.average} </div>
        {/* <div> Summary - {show.summary} </div> */}
        {/* <div> Episodes - {show._embedded.episodes.length} </div> */}
        <p>
            <img alt={`{show.name} poster`} src={show.image.medium} />
        </p>
    </div>
)

class SingleSeries extends Component {
    state = {
        show: null
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`http://api.tvmaze.com/shows/${id}?embed-episodes`)
            .then((res) => res.json())
            .then(res => this.setState({ show: res }));
    }

    render() {
        const { show } = this.state;
        console.log(show);
        return (
            <div>
                {show === null && <Loader />}
                {show !== null
                    && 
                <SeriesDetails show = {show} />          
                }
            </div>
        );
    }
}

export default SingleSeries;