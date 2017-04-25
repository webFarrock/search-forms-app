import React from 'react';
import CircleSpinning from './CircleSpinning';

export default (props) => {
    return (
        <div className="form-actions">
            <div className="filter__circle circle__container">

                <CircleSpinning {...props} />

                <button type="submit" className="filter__submit">
                    <span className="filter__submit__search blink_search_btn">ИСКАТЬ</span>
                </button>
            </div>
        </div>
    )
}