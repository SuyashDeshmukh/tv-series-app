import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList'
import Loader from '../../components/Loader';
import Intro from '../../components/Intro';

class Series extends Component {
    state = {
        series: [],
        seriesName: '',
        isFetching: false
    }

    onSeriesInputChanged = e => {
        this.setState({seriesName : e.target.value, isFetching: true})
        fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
            .then((res) => res.json())
            .then(res => this.setState({ series: res, isFetching: false }));
    }
 
    render() {
        const {series, seriesName, isFetching} = this.state;
        return (
            <div>
                <Intro message="Here you can find all of your most loved series" />
                <div>
                    <input 
                    value = {seriesName}
                    type="text" 
                    onChange={this.onSeriesInputChanged} />
                </div>
                { 
                    !isFetching && series.length === 0 && seriesName.trim() === ''
                    &&
                    <p>Please Enter the Series Name</p>
                }
                {
                    !isFetching && series.length === 0 && seriesName.trim() !== ''
                    &&
                    <p>No Tv Series Found!</p>
                }
                {
                    isFetching && <Loader />
                }
                {
                    !isFetching && <SeriesList list = {this.state.series} />
                }
                
            </div>
        )
    }
}

export default Series;