

const defaluteState = {
    themeColor:'black',
}

//redux接受store.dispatch事件；state为store中保存的所有state；
export default function themeColor(state=defaluteState,actions){

    if(actions.type==='change_theme_color'){
        //深拷贝store的state；
        const newState = JSON.parse(JSON.stringify(state));
        //设置新的state的属性值；
        newState.themeColor = actions.value;
        return newState;
    }

    //返回store默认的state；
    return state;
}