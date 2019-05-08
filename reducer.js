

const defaluteState = {
    number:100,
    themeColor:'black',
}

//redux接受store.dispatch事件；state为store中保存的所有state；
export default (state=defaluteState,actions)=>{

    //reducer判断事件类型；
    if(actions.type==='change_number_plus' || actions.type==='change_number_add'){
        //深拷贝store的state；
        const newState = JSON.parse(JSON.stringify(state));
        //设置新的state的属性值；
        newState.number = actions.value;
        //将新的state作为返回值，返回给store，作为store的新的state，完成store的更新；
        return newState;
    }else if(actions.type==='change_theme_color'){
        //深拷贝store的state；
        const newState = JSON.parse(JSON.stringify(state));
        //设置新的state的属性值；
        newState.themeColor = actions.value;
        return newState;

    }

    //返回store默认的state；
    return state;
}