import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setTourDate} from '../actions/index';
import {initCalendar} from '../tools/index';
import moment from 'moment';
import LoaderMini from '../components/loader-mini';

class TourDate extends Component {
    constructor(props) {
        super(props);

        this.tomorrow = moment().add(1, 'day').format('DD.MM.YYYY');

        this.state = {
            minDate: this.tomorrow,
            tourDate: this.tomorrow,
            allowedDates: [],
        }

        if (RuInturistStore && RuInturistStore.initForm && RuInturistStore.initForm.dateFrom) {
            this.state.tourDate = RuInturistStore.initForm.dateFrom;
        } else {
            this.state.tourDate = this.tomorrow;
        }


    }

    componentDidUpdate() {
        $('.form-type-out').on('click', function () {
            $('body').find('.form-type-out input').focus();
        });

        $( window ).resize(() => {
            $('.js-datepicker-from').datepick("destroy");
            initCalendar(this);
        });

    }

    componentDidMount() {

        initCalendar(this);

        this.props.setTourDate(this.state.tourDate);

        this.dp = $('.js-datepicker-from');

        $('body').on('click', (e) => {
            if (!$(e.target).parents('.datepick').length && !$(e.target).parents('.form-type-out').length) {
                $('.datepick-popup').hide();
            }
        });
    }


    componentWillReceiveProps(nextProps) {
        this.dp.datepick('option', 'allowedDatesInited', nextProps.allowedDates.inited);
        this.dp.datepick('option', 'allowedDates', nextProps.allowedDates.dates);
    }

    onInputClick() {
        $('body').addClass('opened-filter');
        $('.datepick-popup').show();
    }

    render() {

        const {loading} = this.props.allowedDates;

        let arDateClass = ['form-item', 'form-type-out'];

        if (this.props.wpCls) {
            arDateClass.push(this.props.wpCls);
        }

        if (loading) {
            arDateClass.push('loading');
        }

        return (
            <div className={arDateClass.join(' ')} onClick={this.onInputClick}>
                {loading ? <LoaderMini/> : ''}
                <span className="icon-font icon-calendar">
                    <span className="path1"></span><span className="path2"></span>
                </span>
                <label>
                    <div className="wrapper">
                        <span className="title">Вылет:</span>
                    </div>
                </label>
                <input type="text"
                       ref="input"
                       name="dateFrom"
                       placeholder="17 декабря 2017"
                       value={this.props.tourDate}
                       className="js-datepicker-from input__date form-text hidden" readOnly
                />

            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({setTourDate}, dispatch);
}

function mapStateToProps(state) {
    return {
        tourDate: state.tourDate,
        allowedDates: state.allowedDates,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TourDate);  

