import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import './index.css'
import {Provider} from './react-redux'

export default class Index extends Component {
    
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

//构建创建store函数
function createStore(storeChange) {
    let state = null
    const listeners = [];
    const subscribe = (listener) => {listeners.push(listener)};
    const getState = () => state;
    const dispatch = (action => {
        state = storeChange(state, action);
        listeners.forEach((listener) => listener())
    })
    dispatch({})   //初始化dispatch
    return {getState, dispatch, subscribe}
}

const themeReducer = (state, action) => {
    if(!state) return {
        themeColor: 'red'
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {
                ...state,
                themeColor: action.themeColor
            }
        default: 
            return state
    }
}
const store = createStore(themeReducer);

ReactDOM.render(<Provider store={store}><Index /></Provider>, document.getElementById('root'))
