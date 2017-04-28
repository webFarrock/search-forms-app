import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setAdults} from '../actions/index';


class Adults extends Component {
    constructor(props) {
        super(props);

        this.inc = this.inc.bind(this);
        this.dec = this.dec.bind(this);

    }

    componentDidMount(){
        this.initData();
    }

    initData(){
        if(RuInturistStore.initForm && RuInturistStore.initForm.adults){
            const initValue = RuInturistStore.initForm.adults;

            const max = +this.refs.adults.getAttribute('max');
            const min = +this.refs.adults.getAttribute('min');

            if(initValue <= max && initValue >= min){
                this.props.setAdults(initValue);
            }
        }
    }


    inc(){
        const max = +this.refs.adults.getAttribute('max');
        const value = this.refs.adults.value;

        if(value < max){
            this.props.setAdults(this.props.adults + 1);
        }else{
            this.props.setAdults(max);
        }

    }

    dec(){
        const min = +this.refs.adults.getAttribute('min');
        const value = this.refs.adults.value;

        if(value > min){
            this.props.setAdults(this.props.adults - 1);
        }else{
            this.props.setAdults(min);
        }
    }


    render() {

        let arAdultClass = ['col__left row input input-count input-adults'];
        if(this.props.wpCls){
            arAdultClass.push(this.props.wpCls);
        }

        return (

            <div className={arAdultClass.join(' ')}>
                <div className="form-item form-type-adults">

                    <div className="input__min" onClick={this.dec}>
                        <span className="icon-reduce"></span>
                    </div>
                    <div className="input__max" onClick={this.inc}>
                        <span className="icon-add"></span>
                    </div>

                    <div className="input__label">
                        {!this.props.hideLabel ? 'Взрослые' : ''}
                        <span className="icon-font icon-adult"></span>
                    </div>

                    <div className="input__field">
                        <input ref="adults" type="text" name="Adults" value={this.props.adults} min="1" max="4" readOnly/>
                    </div>


                </div>
            </div>
        );


    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({setAdults}, dispatch);
}

function mapStateToProps(state){
    return {
        adults: state.adults,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Adults);

