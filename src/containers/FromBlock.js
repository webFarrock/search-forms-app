import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllowedDates, setStartPoint } from '../actions/index';
import {isMatchUserInput} from '../tools/index';

class FromBlock extends Component{

    constructor(props){

        super(props);

        this.state = {
            acShow: false,
            term: '',
            userInputStarted: false,
        }

        this.placeholder = 'Укажите город отправления';
        let RuInturistStore = window.RuInturistStore || {}

        this.startPoints = RuInturistStore.startPoint || [];

        this.onFocusInput = this.onFocusInput.bind(this);
        this.onKeyUpInput = this.onKeyUpInput.bind(this);
        this.onStartPointItemClick = this.onStartPointItemClick.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onFieldIconClick = this.onFieldIconClick.bind(this);

    }


    componentDidMount(){

        $('body').on('click', (e) => {
            if(!$(e.target).parents('.form-type-from').length){

                if(this.state.acShow){
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

            }
        });

        this.initData();

    }

    initData(){
        if(RuInturistStore && RuInturistStore.initForm && RuInturistStore.initForm.city){

            let cityId = +RuInturistStore.initForm.city

            if(cityId){
                let obCity = this.startPoints.filter(i => i.id == cityId)[0] || {};
                this.props.setStartPoint(obCity);
                this.setState({term: obCity.value});
            }

        }
    }

    onFocusInput(){
        this.setState({
            acShow: true,
        });
    }


    onStartPointItemClick(startPoint){

        this.setState({
            term: startPoint.value,
            userInputStarted: false,
            acShow: false,
        });

        if(this.props.selectedStartPoint.id !== startPoint.id){
            this.props.setStartPoint(startPoint)
        }

    }

    setStartPoint(startPoint){
        this.props.setStartPoint(startPoint);

        this.props.fetchAllowedDates({
            selectedCity: startPoint.id,
            selectedCountry: this.props.selectedCountry.id,
            packType: this.props.tourTypes,
        });
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

    clearField(){
        this.setState({term: ''});
        this.props.setStartPoint({});
    }

    onFieldIconClick(){
        if(this.props.selectedStartPoint.id){
            this.clearField();
        }else{
            this.refs.input.focus();
        }
    }

    render(){
        
        console.log('render FromBlock.js');

        const {selectedStartPoint} = this.props;

        let arFormItemClass = ['form-item', 'form-type-from', 'with-autocomplete'];

        if(this.state.acShow){
            arFormItemClass.push('autocomplete-open')
        }

        if(this.props.selectedStartPoint.id){
            arFormItemClass.push('filled');
        }

        if(this.props.wpCls){
            arFormItemClass.push(this.props.wpCls);
        }

        if(this.props.formErrors.notSelectedStartPoint){
            arFormItemClass.push('error');
        }

        let startPoints = this.startPoints;

        if(this.state.term && this.state.userInputStarted){
            startPoints = startPoints.filter(city => isMatchUserInput(this.state.term, city));
        }

        if(selectedStartPoint.id){
            startPoints = startPoints.filter(city => +city.id !== +selectedStartPoint.id);
        }

        startPoints = _.sortBy(startPoints, (city) => [city.popular_weight, city.value ]);

        let inputValue = this.state.term;
        
        if(!inputValue && !this.state.acShow){
            inputValue = this.placeholder
        }

        return (
            <div className={arFormItemClass.join(' ')} title={inputValue || this.placeholder}>

                <span
                    className="icon-font icon-arrow-right"
                    onClick={this.onFieldIconClick}
                ></span>

                <label>
                    <div className="wrapper">
                        <span className="title">Откуда:</span>
                    </div>
                </label>
                <input
                    type="text"
                    ref="input"
                    placeholder={this.placeholder}
                    id="autocomplete-city"
                    value={inputValue}
                    onFocus={this.onFocusInput}
                    onKeyUp={this.onKeyUpInput}
                    onChange={(e) => {this.onChangeInput(e)}}
                    className="form-text"
                />

                <div className="autocomplete">
                    <div className="quick-dropdown">
                        <div className="wrapper-data col__left filter__row__100">
                            <div className="header-dropdown">Города</div>

                            <ul className="list quick-dropdown__list">
                                {selectedStartPoint.id ?
                                    <li key={selectedStartPoint.id}
                                        className="list__item -active"
                                        onClick={() => this.onStartPointItemClick(selectedStartPoint)}
                                    >
                                        {selectedStartPoint.value}
                                    </li>
                                    : ''
                                }
                                {startPoints.map(item => {
                                    return (
                                        <li key={item.id}
                                            className="list__item"
                                            onClick={() => this.onStartPointItemClick(item)}
                                        >
                                            {item.value}
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
    return bindActionCreators({fetchAllowedDates, setStartPoint}, dispatch);
}

function mapStateToProps(state) {
    return {
        selectedStartPoint: state.selectedStartPoint,
        formErrors: state.formErrors,
        tourTypes: state.tourTypes,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FromBlock);
