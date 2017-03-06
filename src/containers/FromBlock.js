import React, {Component} from 'react';
//import StartPointsListAutocomplete from '../components/StartPointsListAutocomplete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStartPoints, setStartPoint } from '../actions/index';
import {isMatchUserInput} from '../tools/index';
import fakeStartPointsList from '../../fakedata/start_points_list.json';


class FromBlock extends Component{

    constructor(props){
        super(props);

        this.state = {
            acShow: false,
            term: '',
            userInputStarted: false,
        }

        this.startPoints = fakeStartPointsList;

        this.onFocusInput = this.onFocusInput.bind(this);
        this.onKeyUpInput = this.onKeyUpInput.bind(this);
        this.onStartPointItemClick = this.onStartPointItemClick.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    componentDidMount(){

        $('body').on('click', (e) => {
            if(!$(e.target).parents('.form-type-from').length){
                this.setState({
                    acShow: false,
                    userInputStarted: false,
                });

                if(this.props.selectedStartPoint.value){
                   this.setState({
                       term: this.props.selectedStartPoint.value,
                   });
                }

            }
        });
    }

    onFocusInput(){
        this.setState({
            acShow: true,
        });
    }


    onStartPointItemClick(startPoint){

        this.setState({
            term: startPoint.value,
            acShow: false,
        });

        if(this.props.selectedStartPoint.id !== startPoint.id){
            this.props.setStartPoint(startPoint)
        }

    }

    onKeyUpInput(){
        this.setState({
            userInputStarted: true,
        });
    }

    onChangeInput(e){

        const term = e.target.value;
        let startPoints = this.startPoints;

        this.setState({term});

        if(term){
            startPoints = startPoints.filter(city => isMatchUserInput(term, city));
        }

        if(startPoints.length === 1){
            this.props.setStartPoint(startPoints[0]);
        }else{
            this.props.setStartPoint({});
        }

    }

    render(){

        let arFormItemClass = ['form-item', 'form-type-from', 'with-autocomplete'];

        if(this.state.acShow){
            arFormItemClass.push('autocomplete-open')
        }

        let startPoints = this.startPoints;

        if(this.state.term && this.state.userInputStarted){
            startPoints = startPoints.filter(city => isMatchUserInput(this.state.term, city));
        }

        startPoints = _.sortBy(startPoints, (city) => [city.popular_weight, city.value ]);

        const placeholder = this.state.term || this.state.acShow ? '' : <span className="placeholder">(Укажите город отправления)</span>;

        return (
            <div className={arFormItemClass.join(' ')}>

                <input type="hidden" name="selected-city" value="" />

                <span className="icon-font icon-arrow-right"></span>

                <label>
                    <div className="wrapper">
                        <span className="title">Откуда:</span>
                        {placeholder}
                    </div>
                </label>
                <input
                    type="text"
                    placeholder=""
                    id="autocomplete-city"
                    value={this.state.term}
                    onFocus={this.onFocusInput}
                    onKeyUp={this.onKeyUpInput}
                    onChange={(e) => {this.onChangeInput(e)}}
                    className="form-text hidden"
                />

                <div className="autocomplete">
                    <div className="quick-dropdown">
                        <div className="wrapper-data col__left filter__row__100">
                            <div className="header-dropdown">Города</div>

                            <ul className="list quick-dropdown__list">
                                {startPoints.map(item => {
                                    let liClass = 'list__item';

                                    if(item.id === this.props.selectedStartPoint.id){
                                        liClass += ' -active';
                                    }

                                    return (
                                        <li key={item.id}
                                            className={liClass}
                                            onClick={() => this.onStartPointItemClick(item)}
                                        >
                                            {item.value}
                                            <i></i>
                                        </li>
                                    );
                                })}
                                {!startPoints.length ? <li className="list__item">Ничего не найдено</li>: ''}
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({setStartPoint}, dispatch);
}

function mapStateToProps(state) {
    return {
        selectedStartPoint: state.selectedStartPoint,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FromBlock);
