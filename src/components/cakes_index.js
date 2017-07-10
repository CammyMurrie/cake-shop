import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCakes} from '../actions';

class CakesIndex extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            searchTerm: ''
        }
        
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    
    componentDidMount() {
        this.props.fetchCakes();
    }
    
    onChangeHandler(event) {
        this.setState({searchTerm: event.target.value});
    }
    
    renderCakes(criteria) {
        const {cakes} = this.props;
        const filteredCakes = _.filter(cakes, cake => {
            if (cake.title.toUpperCase().includes(criteria.toUpperCase())) {
                return cake;
            }   
        });

        return _.map(filteredCakes, cake => {
            return (
                <Link to={`/cakes/${cake.id}`} key={cake.id}>
                    <div className='cake-box'>
                        <div className='cake-box-img'>
                            <img src={cake.image} />
                        </div>
                        <div className='cake-title'>{cake.title}</div>
                    </div>
                </Link>
            );
        });
    }
    
    render() {
        const {cakes} = this.props;
        const {searchTerm} = this.state;
        
        if (!cakes) {
            return (<div>Cakes are loading...</div>);
        }
        
        return (
            <div>
                <div className='search-bar'>
                    <input
                        value={searchTerm}
                        className='form-control'
                        placeholder='Search for a Cake'
                        onChange={this.onChangeHandler}
                        />
                </div>
                <div className='text-xs-right'>
                    <Link className='btn btn-primary text-xs-right' to='/cakes/new'>
                        Add a Cake
                    </Link>
                </div>
                <h3>Cakes</h3>
                <div className='cake-container'>{this.renderCakes(searchTerm)}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {cakes: state.cakes};
}

export default connect(mapStateToProps, {fetchCakes})(CakesIndex);