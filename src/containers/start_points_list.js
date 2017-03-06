import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDestinations, setStartPoint, setDestinationsLoading} from '../actions/index';

class StartPointsList extends Component {
    constructor(props){

        super(props);

        const startPointsList = _.sortBy(
            fakeStartPointsList,
            //RuInturistStore.startPoint,
            (o) => [o.popular_weight, o.value ]
        );
        const selectedStartPoint = startPointsList.filter(startPoint => startPoint.default)[0] || {};

        this.state = {
            selectedStartPoint,
            startPointsList,
        }
    }


    componentDidMount(){
        if(this.state.selectedStartPoint){
            this.setStartPoint(this.state.selectedStartPoint);
        }
    }

    setStartPoint(city){
        this.rmErrorLabel();
        this.props.setStartPoint(city);
        this.props.fetchDestinations(city.id);
        this.props.setDestinationsLoading();

        refreshAvaliableDates({
            inputCity: city.id,
            inputCountry: $('input[name=selected-country]').val(),
        });
    }


    onSelectChangeHandler(e){
        let city = this.getStartPointById(e.target.value);
        this.setStartPoint(city);
    }

    rmErrorLabel(){
        $('.input-from').removeClass('error-fld').find('.error-fld').removeClass('error-fld');
    }

    getStartPointById(id){
        if(!id) return false;
        return this.state.startPointsList.filter(elem => +elem.id === +id)[0];
    }

    renderstartPointsList(){

        if(this.state.startPointsList.length){
            return (
                <select
                    id="autocomplete-city"
                    onChange={this.onSelectChangeHandler.bind(this)}
                >

                    {!this.state.selectedStartPoint.id ? <option disabled selected> </option> : ''}

                    {this.state.startPointsList.map((city) => {
                        return (
                            <option
                                selected={this.state.selectedStartPoint && +this.state.selectedStartPoint.id === +city.id}
                                key={city.id}
                                className="list__item"
                                data-item_id={city.id}
                                value={city.id}
                            >
                                {city.value}
                            </option>
                        )})}
                </select>
            )
        }else{
            return (<div></div>); 
        }
    }

    render(){


       /* return (

            <div></div>
        );
*/

        return(
            <div className="col__left row input input-from">
                <div className="input__label">Откуда</div>
                <div>
                    <div className="input__field ">
                        {this.renderstartPointsList()}
                        <input type="hidden"  name="StartPointName"  value={this.state.selectedStartPoint.value} />
                        <input type="hidden" name="selected-city" value={this.state.selectedStartPoint.id} />
                    </div>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({setStartPoint, fetchDestinations, setDestinationsLoading}, dispatch);
}


function mapStateToProps(state) {

    return {
        selectedStartPoint: state.selectedStartPoint,
        isDestinationsLoading: state.isDestinationsLoading
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPointsList);