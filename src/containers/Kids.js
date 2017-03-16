import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setKids} from '../actions/index';

class Kids extends Component {
    constructor(props) {
        super(props);


        this.state = {
            acShow: false,
        }

        this.minKids = 0;
        this.maxKids = 4;

        this.kidMaxAge = 16;
        this.kidMinAge = 0;

        this.onClickAddKid = this.onClickAddKid.bind(this);
        this.onClickInputKids = this.onClickInputKids.bind(this);

    }


    onClickInputKids() {
        this.setState({
            acShow: true,
        });
    }

    componentDidMount() {
        $('body').on('click', (e) => {
            const $target = $(e.target);
            if (!$target.parents('.input-kids').length && !$target.hasClass('.input-kids')) {
                if(this.state.acShow){
                    this.setState({
                        acShow: false,
                    });
                }
            }
        });

        this.initData();

    }

    initData(){
        if(RuInturistStore && RuInturistStore.initForm && RuInturistStore.initForm.childs){

            let childs = RuInturistStore.initForm.childs
            if(childs instanceof Array){
                this.props.setKids(childs);
            }
        }
    }

    renderKid(age, num) {

        return (
            <div className="wrapper-kid" key={num}>
                <div className="input__label">
                    <span className="icon-remove" onClick={() => {this.onClickRemoveKid(num)}}></span>
                    Ребенок&nbsp;{num + 1 }
                </div>
                <div className="input__wrapper">
                    <div className="input__min" onClick={() => this.dec(age, num)}><span className="icon-reduce"></span></div>
                    <div className="input__max" onClick={() => this.inc(age, num)}><span className="icon-add"></span></div>
                    <div className="input__field">
                        <input type="text" name="Childs" value={age} min={this.kidMinAge} max={this.kidMaxAge} readOnly/>
                    </div>
                </div>
            </div>
        );
    }

    inc(age, num) {

        if (age < this.kidMaxAge) {
            this.props.setKids([
                ...this.props.kids.slice(0, num),
                this.props.kids[num] + 1,
                ...this.props.kids.slice(num + 1, this.props.kids.length)
            ]);

        }

    }

    dec(age, num) {

        if (age > this.kidMinAge){
            this.props.setKids([
                ...this.props.kids.slice(0, num),
                this.props.kids[num] - 1,
                ...this.props.kids.slice(num + 1, this.props.kids.length)
            ]);
        }
    }

    onClickAddKid(e) {

        e.preventDefault();

        if (this.props.kids.length < this.maxKids) {
            this.props.setKids([...this.props.kids, 0]);
        }
    }

    onClickRemoveKid(num){
        this.props.setKids([
            ...this.props.kids.slice(0, num),
            ...this.props.kids.slice(num + 1, this.props.kids.length)
        ]);
    }



    render() {
        
        console.log('render Kids.js');

        const kidsNum = this.props.kidsLengthInit || this.props.kids.length;
        
        let arInputKidsClass = ['col__left', 'row', 'input',  'input-count', 'input-kids'];

        if(this.props.wpCls){
            arInputKidsClass.push(this.props.wpCls);
        }

        if (this.state.acShow) {
            arInputKidsClass.push('autocomplete-open');
        }

        return (
            <div className={arInputKidsClass.join(' ')}
                 onClick={this.onClickInputKids}
            >
                <div className="form-item form-type-kids with-autocomplete">
                    <span className="icon-font icon-arrow-right"></span>
                    <label><span>
                        {!this.props.hideLabel ? 'Дети' : ''}
                        <span className="icon-font icon-children"></span></span></label>
                    <div className="input__field">
                        <input type="text" placeholder="2" value={kidsNum} className="form-text" readOnly/>
                    </div>
                    <div className="autocomplete">
                        <div className="quick-dropdown">
                            <div className="wrapper-data col__left filter__row__100">
                                <div className="header-dropdown">Укажите количество и возраст детей</div>

                                <div className="form-add-children">

                                    {this.props.kids.map((age, num) => {
                                        return this.renderKid(age, num);
                                    })}

                                    <div className="add-child">
                                        <a onClick={(e) => this.onClickAddKid(e)}
                                           href="">
                                            Добавить ребенка
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setKids}, dispatch);
}

function mapStateToProps(state) {
    return {
        kids: state.kids,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Kids);

