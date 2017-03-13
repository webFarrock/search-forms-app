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

    inc(){
        let max = +this.refs.adults.getAttribute('max');
        let value = this.refs.adults.value;

        if(value < max){
            this.props.setAdults(this.props.adults + 1);
        }else{
            this.props.setAdults(max);
        }

    }

    dec(){
        let min = +this.refs.adults.getAttribute('min');
        let value = this.refs.adults.value;

        if(value > min){
            this.props.setAdults(this.props.adults - 1);
        }else{
            this.props.setAdults(min);
        }
    }


    render() {

        return (
            <div className="col__left row input input-count input-adults">
                <div className="form-item form-type-adults">

                    <div className="input__min" onClick={this.dec}>
                        <span className="icon-reduce"></span>
                    </div>

                    <div className="input__label">
                        Взрослые <span className="icon-font icon-adult"></span>
                    </div>

                    <div className="input__field">
                        <input ref="adults" type="text" name="Adults" value={this.props.adults} min="1" max="4" readOnly/>
                    </div>

                    <div className="input__max" onClick={this.inc}>
                        <span className="icon-add"></span>
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

