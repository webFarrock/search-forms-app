import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setDuration} from '../actions/index';


class Duration extends Component {
    constructor(props) {
        super(props);

        this.max = 21;
        this.min = 1;

        this.inc = this.inc.bind(this);
        this.dec = this.dec.bind(this);
    }

    inc(){
        if(this.props.duration < this.max){
            this.props.setDuration(this.props.duration + 1);
        }
    }

    dec(){
        if(this.props.duration > this.min){
            this.props.setDuration(this.props.duration - 1);
        }
    }

    getNightWord(n){
        switch(n){
            case 1:
            case 21: return 'ночь'
            case 2:
            case 3:
            case 4: return 'ночи'
            default: return 'ночей';
        }
    }

    getDayWord(n){
        switch(n){
            case 1:
            case 21: return 'день'
            case 2:
            case 3:
            case 22:
            case 4: return 'дня'
            default: return 'дней';
        }
    }

    render() {

        const {duration} = this.props;
        const day = duration +1;
        const night = duration;

        const value = `${day } ${this.getDayWord(day)} / ${night} ${this.getNightWord(night)}`;

        return (
            <div className="form-item form-type-duration">
                <div className="input__min icon-font" onClick={this.dec}><span>-</span></div>
                <div className="input__max icon-font" onClick={this.inc}><span>+</span></div>
                <div className="input__field">
                    <input type="text" ref="duration" value={value} readOnly/>
                    <input type="hidden" name="duration" value={duration}/>
                </div>
            </div>
        );
    }

}


function mapDispatchToProps(dispatch){
    return bindActionCreators({setDuration}, dispatch);
}

function mapStateToProps(state){
    return {
        duration: state.duration,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Duration);

