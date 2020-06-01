import React, {Component, Fragment} from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './style.css';

class TodoList extends Component {

  constructor(props){
    super(props);
    this.state={
      list: [],
      inputValue: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleBtnClick(){
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }));
  }

  handleInputChange(e){
    const value = e.target.value
    this.setState(()=>({
        inputValue: value
    }));
    // this.setState({
    //   inputValue: e.target.value
    // })
  }

  handleDelete(index){
    this.setState((prevState)=>{
      const list = [...prevState.list];
      list.splice(index, 1);
      return {list}
    });
  }

  componentDidMount(){
    axios.get('/api/todolist')
      .then((res)=>{
        // console.log(res.data);
        this.setState(()=>({
            // use ... to avoid manipulating the data directly
            list: [...res.data]
        }));
      })
      .catch(()=>{alert('error')})
  }

  getTodoItem(){
    return (
        this.state.list.map((item, index) => {
          return (
              <TodoItem
                  deleteItem={this.handleDelete}
                  key={index}
                  content={item}
                  index={index}
              />
          );
          // return <li key={index} onClick={this.handleItemClick.bind(this, index)}>{item}</li>
        })
    )
  }

  render(){
    return (
        <Fragment>
          <div className="TodoList">
            <label htmlFor="insertArea">输入内容</label>
            <input id="insertArea" className='input'
                   value={this.state.inputValue}
                   onChange={this.handleInputChange}
            />
            <button className='red-btn' onClick={this.handleBtnClick}>add</button>
          </div>
          <ul>{this.getTodoItem()}</ul>
        </Fragment>
    );
  }
}

export default TodoList;
