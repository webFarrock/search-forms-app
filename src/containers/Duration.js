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

    componentDidMount() {
        this.initData();
    }

    initData() {
        if (RuInturistStore && RuInturistStore.initForm && RuInturistStore.initForm.duration) {

            let duration = RuInturistStore.initForm.duration

            if(duration < this.max && duration > this.min){
                this.props.setDuration(duration);
            }else{
                this.props.setDuration(8);
            }

        }
    }

    render() {

        const {duration} = this.props;
        const day = duration +1;
        const night = duration;

        const value = `${day } ${this.getDayWord(day)} / ${night} ${this.getNightWord(night)}`;

        let arDurationClass = ['form-item', 'form-type-duration'];

        if(this.props.wpCls){
            arDurationClass.push(this.props.wpCls);
        }

        return (
            <div className={arDurationClass.join(' ')}>
                <div className="input__min icon-font" onClick={this.dec}><span className="icon-reduce"></span></div>
                <div className="input__max icon-font" onClick={this.inc}><span className="icon-add"></span></div>
                <div className="input__field">
                    <input type="text" ref="duration" value={value} readOnly/>
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

