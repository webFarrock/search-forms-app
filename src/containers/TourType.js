import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAllowedDates, setTourType} from '../actions/index';

class TourType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            acShow: false,
        }

        this.tourTypesList = RuInturistStore.tourTypesList || [];

        this.onFocusInput = this.onFocusInput.bind(this);
    }

    componentDidMount() {

        $('body').on('click', (e) => {
            if (!$(e.target).parents('.form-type-type').length) {
                if (this.state.acShow) {
                    this.setState({
                        acShow: false,
                    });
                    $('body').removeClass('opened-filter');
                }
            }
        });

        this.initData();

    }

    initData() {

        if (RuInturistStore && RuInturistStore.initForm && RuInturistStore.initForm.pack_type) {

            let pack_type = RuInturistStore.initForm.pack_type

            if (pack_type instanceof Array) {

                pack_type.forEach((pack_id) => {
                    this.props.setTourType(this.tourTypesList.filter((i) => i.id == pack_id)[0]);
                });
            }
        }
    }

    onFocusInput() {
        this.setState({
            acShow: true,
        });
        $('body').addClass('opened-filter');
    }

    setTourType(tourType) {
        this.props.setTourType(tourType);
    }

    componentWillReceiveProps(nextProps) {

        this.props.fetchAllowedDates({
            selectedCity: nextProps.selectedStartPoint.id,
            selectedCountry: nextProps.selectedCountry.id,
            packType: nextProps.tourTypes,
        });

    }

    render() {

        let arFormItemClass = ['form-item', 'form-type-type', 'with-autocomplete'];

        if (this.state.acShow) {
            arFormItemClass.push('autocomplete-open')
        }

        if (this.props.wpCls) {
            arFormItemClass.push(this.props.wpCls)
        }

        let selectAllCls = ['list__item', 'select-all'];

        if (!Object.keys(this.props.tourTypes).length) {
            selectAllCls.push('-active');
        }

        let placeholder = null;


        if (Object.keys(this.props.tourTypes).length == Object.keys(this.tourTypesList).length) {
            placeholder = 'все';
        } else {

            placeholder = [];

            for (let key in this.props.tourTypes) {
                placeholder.push(this.props.tourTypes[key].value);
            }

            placeholder = placeholder.join(', ') || 'все';
        }

        return (
            <div className={arFormItemClass.join(' ')} title={placeholder}>

                <span className="icon-font icon-arrow-right"></span>
                <label>
                    <div className="wrapper">
                        <span className="title">Тип тура:</span>
                    </div>
                </label>
                <input type="text"
                       placeholder={placeholder}
                       value={placeholder}
                       onFocus={this.onFocusInput}
                       className="form-text"
                       readOnly
                />

                <div className="filter-popup">
                    <div className="autocomplete">
                        <div className="quick-dropdown">
                            <div className="wrapper-data col__left filter__row__100">
                                <div className="header-dropdown">Выберите тип тура</div>

                                <ul className="list quick-dropdown__list">
                                    <li key="all"
                                        onClick={() => this.setTourType({})}
                                        className={selectAllCls.join(' ')}>все <i></i></li>
                                    {this.tourTypesList.map(tourType => {

                                        let cls = 'list__item';

                                        if (this.props.tourTypes[tourType.id]) {
                                            cls += ' -active';
                                        }

                                        return (
                                            <li
                                                key={tourType.id}
                                                className={cls}
                                                onClick={() => this.setTourType(tourType)}
                                            >{tourType.value}<i></i>
                                            </li>
                                        );
                                    })}
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="filter-popup__buttons row column">
                        <div className="column__item col__left">
                            <button type="button" className="cancel"><span className="icon-font icon-close"></span>Отмена</button>
                        </div>
                        <div className="column__item col__left">
                            <button type="button" className="apply"><span className="icon-icon-login"><span className="path1"></span><span className="path2"></span></span>Далее</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchAllowedDates, setTourType}, dispatch);
}

function mapStateToProps(state) {
    return {
        selectedStartPoint: state.selectedStartPoint,
        selectedCountry: state.selectedCountry,
        tourTypes: state.tourTypes,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TourType);

