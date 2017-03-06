import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setTourType} from '../actions/index';
import tourTypesList from '../data/tourTypesList.json';

class TourType extends Component{
    constructor(props){
        super(props);

        this.state = {
            acShow: false,
        }

        this.onFocusInput = this.onFocusInput.bind(this);
    }

    componentDidMount(){

        $('body').on('click', (e) => {
            if(!$(e.target).parents('.form-type-type').length){
                this.setState({
                    acShow: false,
                });
            }
        });
    }

    onFocusInput(){
        this.setState({
            acShow: true,
        });
    }

    render(){
        
        let arFormItemClass = ['form-item', 'form-type-type', 'with-autocomplete'];

        if(this.state.acShow){
            arFormItemClass.push('autocomplete-open')
        }

        return(
            <div className={arFormItemClass.join(' ')}>

                <span className="icon-font icon-arrow-right"></span>

                <label>
                    <div className="wrapper">
                        <span className="title">Тип тура:</span> <span className="placeholder">{this.props.tourType.value}</span>
                    </div>
                </label>

                <input type="text"
                       onFocus={this.onFocusInput}
                       className="form-text hidden"/>

                <div className="autocomplete">
                    <div className="quick-dropdown">
                        <div className="wrapper-data col__left filter__row__100">
                            <div className="header-dropdown">Выберите тип тура</div>

                            <ul className="list quick-dropdown__list">
                                {tourTypesList.map(tourType => {

                                    let cls = 'list__item';

                                    if(tourType.id === this.props.tourType.id){
                                        cls += ' -active';
                                    }
                                    
                                    return (
                                        <li
                                            key={tourType.id}
                                            className={cls}
                                            onClick={() => this.props.setTourType(tourType)}
                                            >{tourType.value}<i></i>
                                        </li>
                                    );
                                })}
                            </ul>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}



function mapDispatchToProps(dispatch){
    return bindActionCreators({setTourType}, dispatch);
}

function mapStateToProps(state){
    return {
        tourType: state.tourType,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TourType);

