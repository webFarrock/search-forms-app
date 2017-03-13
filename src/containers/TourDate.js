import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setTourDate} from '../actions/index';

class TourDate extends Component{
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

        /*
        let today = new Date();
        today.setDate(today.getDate() + 1);
        let t_dd = today.getDate();
        let t_mm = today.getMonth() + 1;
        let t_yyyy = today.getFullYear();

        if (t_dd < 10) t_dd = '0' + t_dd;
        if (t_mm < 10) t_mm = '0' + t_mm;
        let minDateDatePickFromVal = t_dd + '.' + t_mm + '.' + t_yyyy;
        console.log('minDateDatePickFromVal: ', minDateDatePickFromVal);
        $('.js-datepicker-from').datepick({
            showAnim: 'fade',
            showOnFocus: true,
            dateFormat: "dd.mm.yyyy",

            changeMonth: false, 
            minDate: minDateDatePickFromVal,
            monthsToShow: datepickerMonthToShow(),
            onShow: function () {
                //$from.blur();
            },
            onClose: function () {
                //$from.blur();
            },
            onDate: function (date) {

            },
            onSelect: function (dates) {



            },
            renderer: datepickerTemplate
        });
        */

    }

    onFocusInput(){
        this.setState({
            acShow: true,
        });
    }

    render(){


        return(
            <div className="form-item form-type-out">
                <span className="icon-font icon-calendar">
                    <span className="path1"></span><span className="path2"></span>
                </span>
                <label>
                    <div className="wrapper">
                        <span className="title">Вылет:</span>
                    </div>
                </label>
                <input type="text"
                       name="dateFrom"
                       placeholder="17 декабря 2017"
                       value=""
                       className="js-datepicker-from input__date form-text hidden" readOnly
                />
            </div>
        );
    }
}



function mapDispatchToProps(dispatch){
    return bindActionCreators({setTourDate}, dispatch);
}

function mapStateToProps(state){
    return {
        tourDate: state.tourDate,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TourDate);  

