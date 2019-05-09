

import { combineReducers } from 'redux'
import numbers from './CounterReducer'
import themeColor from './ThemeReducer'

export default combineReducers({
    number:numbers, //store.getState().number.number
    theme:themeColor //store.getState().theme.themeColor
})