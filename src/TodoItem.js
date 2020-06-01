import React, {Component} from 'react'
import PropTypes from 'prop-types';

class TodoItem extends Component {

    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(){
        const {deleteItem, index} = this.props;
        deleteItem(index);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext){
        if (nextProps.content !== this.props.content){
            return true;
        }
        else{
            return false;
        }
    }

    render(){
        const {content} = this.props;
        return(
            <div onClick={this.handleDelete}>
                {content}
            </div>
        )
    }
}

TodoItem.propTypes = {
    content: PropTypes.string,
    deleteItem: PropTypes.func,
    index: PropTypes.number
}

export default TodoItem