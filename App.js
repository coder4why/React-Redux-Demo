
import { Provider } from 'react-redux';
import React, {Component} from 'react';
import {StyleSheet, Text, View,Button,TouchableWithoutFeedback} from 'react-native';
import configureStore from './store';
const store = configureStore();

/**
 * Redux原理：
 *    1.组件component要干什么；
 *    2.组件component将事件actions发送给store（相当于神经中枢）；
 *    3.store神经中枢通过dispatch讲组件actions告知reducers（相当于大脑）；
 *    4.大脑判断组件是否可以执行actions，可以的话执行actions，同时更新store的
 *      state，最后神经中枢store将state更新到组件上，完成整个redux过程；
 * 
 *    ex:耳朵想听歌，耳朵通过神经中枢将想听歌这件事告知大脑皮层，大脑发送指令开始拿起耳机播放音乐；
 * 
 *    综上：完成一个Redux流程需要三个角色（组件component、神经中枢store、大脑reducer）；
 *      component___actions___>store___dispatch___>reducer___state___>store___state;
 *      
 */

 var number = 100;

export default class App extends Component{

  constructor(props){
      super(props);
      //生命周期函数中，从store中获得state作为当前的state；
      this.state = store.getState();
      //当前界面绑定store更新事件；
      store.subscribe(()=>this._storeChanged());
      this._selectColorIndex = this._selectColorIndex.bind(this._selectColorIndex);
  }

  //监听store是否更新了；
  _storeChanged(){
    //store更新后 重新获取store的state作为当前的state；当前界面上的组件就会被刷新；
    this.setState(store.getState());
  }
  
  //组件发送事件给store；
  _clickAdd(){
    number = number+1;
    const action = {
      //每个action绑定一个type；
          type:'change_number_add',
          //需要更新store中的相关数据；
          value:number
    };
    //store将事件派发给reducer；
    store.dispatch(action);
  }
  _clickPlus(){
    number = number-1;
    const action = {
          type:'change_number_plus',
          value:number
    };
    store.dispatch(action);
  }

  _selectColorIndex(index){
    const colors = ['black','green','#8E388E','red'];
    const action={
        type:'change_theme_color',
        value:colors[index],
    };
    store.dispatch(action);
  }

   _colorViews(){
    var colorViews = [];
    var styleYS = [styles.blackContainer,styles.greenContainer,styles.purpureContainer,styles.redContainer];
    styleYS.map((item)=>{
      colorViews.push(
        <TouchableWithoutFeedback key={styleYS.indexOf(item)} onPress={()=>this._selectColorIndex(styleYS.indexOf(item))}>
          <View style={item}></View>
        </TouchableWithoutFeedback>
      );
    });
    return colorViews;
  }

  render() {
    const desString = 'Redux原理：\n\t1.组件component要干什么；\n\t2.组件component将事件actions发送给store（相当于神经中枢）；\n\t3.store神经中枢通过dispatch将组件actions告知reducers（相当于大脑）；\n\t4.大脑判断组件是否可以执行actions，可以的话执行actions，同时更新store的state，最后神经中枢store将state更新到组件上，完成整个redux过程；';
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text style={{
            fontSize: 30,textAlign: 'center',margin: 10,color:this.state.themeColor,fontWeight:"bold",textDecorationLine:'underline'
          }}>React-Redux</Text>
          <Text style={{
            fontSize: 13,textAlign: 'left',margin: 10,color:this.state.themeColor,lineHeight:23,letterSpacing:1.5
          }}>{desString}</Text>
          <View style={{justifyContent:"center",flexDirection:'row',marginTop:5}}>
            {this._colorViews()}
          </View>
          <View style={{justifyContent:"center",flexDirection:'row',marginTop:5}}>
              <Button onPress={()=>this._clickPlus()} title='➖'></Button>
              {/* 读取当前state的number值 */}
              <Text style={{
                fontSize: 20,textAlign: 'center',margin: 5,color:this.state.themeColor,fontWeight:"bold",width:60
              }}>{this.state.number}</Text>
              <Button onPress={()=>this._clickAdd()} title="➕"></Button>
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
  blackContainer: {
    width:50,
    height:50,
    borderRadius:5,
    backgroundColor:'black',
    margin:10,
  },

  greenContainer: {
    width:50,
    height:50,
    borderRadius:5,
    backgroundColor:'green',
    margin:10,
  },

  purpureContainer: {
    width:50,
    height:50,
    borderRadius:5,
    backgroundColor:'#8E388E',
    margin:10,
  },

  redContainer: {
    width:50,
    height:50,
    borderRadius:5,
    backgroundColor:'red',
    margin:10,
  }
});
