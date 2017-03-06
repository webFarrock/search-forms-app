import React, {Component} from 'react';
import CircleSpinning from './CircleSpinning';
import FromBlock from '../containers/FromBlock';
import ToBlock from '../containers/ToBlock';
import Adults from '../containers/Adults';
import Kids from '../containers/Kids';
import Duration from '../containers/Duration';
import TourType from '../containers/TourType';


export default class SearchFormMain extends Component {

    state = {
        startPointListShow: false,
        destinationsListShow: false,
        childsShow: false,
        tourTypesShow: false,
    }

    render() {
        return (
            <form action="/tour-search/" id="search-form-top">

                <div className="form-wrapper">

                    <FromBlock />
                    <ToBlock />
                    <TourType />

                    <div className="form-item form-type-out">
                        <span className="icon-font icon-calendar">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </span>
                        <label>
                            <div className="wrapper">
                                <span className="title">Вылет:</span> <span
                                className="placeholder">17 декабря 2017</span>
                            </div>
                        </label>
                        <input type="text" name="dateFrom" id="" placeholder="17 декабря 2017" value="" className="js-datepicker-from input__date form-text hidden" readOnly/>
                    </div>


                    <Duration />

                    <div className="col__2-wrapper">

                        <Adults />
                        <Kids />

                    </div>


                </div>
                <div className="form-actions">
                    <div className="filter__circle circle__container">
                        <CircleSpinning />


                        <button type="submit" className="filter__submit">
                            <span className="filter__submit__search blink_search_btn">ИСКАТЬ</span>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
