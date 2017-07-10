import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCake, deleteCake, editCake} from '../actions';

class SingleCake extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            editEnabled: false,
            record: {
                title: '',
                desc: ''
            }
        }
        
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onFinishedClick = this.onFinishedClick.bind(this);
    }
    
    componentWillMount() {
        const {id} = this.props.match.params;
        this.props.fetchCake(id);
    }
    
    onDeleteClick() {
        const {id} = this.props.match.params;
        this.props.deleteCake(id, () => {
            this.props.history.push('/');
        });
    }
    
    onFinishedClick() {
        const {id} = this.props.match.params;
        const {cake} = this.props;
        const {record} = this.state;
        
        const newObj = {
            title: record.title.length > 3 ? record.title : cake.title,
            desc: record.desc.length > 3 ? record.desc : cake.desc,
            image: cake.image
        };
        
        this.setState({editEnabled: false});
        this.props.editCake(id, newObj, () => {
            this.props.history.push('/');
        });        
    }
    
    onChangeHandler(event, input) {
        const {record: {title, desc}} = this.state;
        
        if (input === 'title') {
            this.setState({record: {title: event.target.value, desc: desc}});
        }
        
        if (input === 'desc') {
            this.setState({record: {title: title, desc: event.target.value}});
        }
    }
    
    render() {
        
        const {cake} = this.props;
        if (!cake) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <div>
                    <button
                        className='btn btn-danger pull-xs-right'
                        onClick={this.onDeleteClick}
                        >
                        Delete Cake
                    </button>
                    <Link to='/'>Go Back</Link>
                </div>
                <div className='cake-info'>
                    <div className='single-cake-img'>
                        <img src={cake.image}/>
                    </div>
                    <label>Title</label>
                    <input 
                        defaultValue={cake.title}
                        disabled={!this.state.editEnabled}
                        onChange={event => this.onChangeHandler(event, 'title')}/>
                    <label>Description</label>
                    <input 
                        defaultValue={cake.desc}
                        disabled={!this.state.editEnabled}
                        onChange={event => this.onChangeHandler(event, 'desc')}/>                    
                </div>
                { 
                    this.state.editEnabled
                ?
                    <button
                        className='btn btn-success edit-btn'
                        onClick={this.onFinishedClick}
                        >
                        Finished
                    </button>
                :
                    <button
                        className='btn btn-primary edit-btn'
                        onClick={() => this.setState({editEnabled: true})}
                        >
                        Edit Cake
                    </button>
                }
            </div>
            
        );
    }
}

function mapStateToProps({cakes}, ownProps) {
    return {
        cake: cakes[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, {fetchCake, deleteCake, editCake})(SingleCake);