import React from "react"
import { Animated, Easing, View, TouchableOpacity, Image, StyleSheet, Dimensions, Text } from "react-native"

export default class AnimatedTurnTableDrawPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawData: [
                { id: 1, title: "谢谢参与", icon: require('./imgs/cry_coin.png') },
                { id: 2, title: "手机1", icon: require('./imgs/phone1_coin.png') },
                { id: 3, title: "+20金币", icon: require('./imgs/gold_coin.png') },
                { id: 4, title: "手机2", icon: require('./imgs/phone2_coin.png') },
                { id: 5, title: "手机50", icon: require('./imgs/gold_coin.png') },
                { id: 6, title: "+100金币", icon: require('./imgs/gold_coin.png') },
                { id: 7, title: "谢谢参与", icon: require('./imgs/cry_coin.png') },
                { id: 8, title: "手机3", icon: require('./imgs/phone3_coin.png') }
            ],
            offOn: true,
            rotateDeg: new Animated.Value(0)
        };
    }

    rotateImg = () => {
        if (this.state.offOn) {
            this.rotateImg1();
        }
    };

    rotateImg1 = () => {
        //获取抽奖位置
        let number = Math.floor(Math.random() * 8);
        if((number/8)==0.875){
            number=1;
        }
        // 在获取到随机数的基础上加3.0625圈。整数部分可以自定义设定。
        // 3.0625 = 3 + 0.625，意思就是在转满3圈 + 0.0625 圈，动画则逐渐停止。
        // 所谓的0.0625，是将每个大的格子又一份为二，这样一圈总共是16（8*2）个小的格子，每个小的格子则为0.0625（1/16）。
        // 目的是为了将中心点的指针指向大格子的中间位置。
        let oneTimeRotate = number / 8 + 3.0625;
        Animated.timing(this.state.rotateDeg, {
            toValue: oneTimeRotate,
            duration: 5000,
            easing:Easing.out(Easing.quad)
        }).start(() => {
            this.setState({
                offOn: !this.state.offOn,
            });
            //动画结束时，会把toValue值，回调给callback
            this.state.rotateDeg.stopAnimation(() => {
                this.changeValue(number);
            })
        });
    };

    changeValue = (postion) => {
        alert("定位到了" + postion + "上了");
    };


    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.mainImg, {
                    transform: [{
                        rotate: this.state.rotateDeg.interpolate({
                            inputRange: [0, 3],
                            outputRange: ['0deg', '1080deg']
                        })
                    }]
                }]}>
                    <View style={{ height: 360, width: 360, alignItems: "center" }}>
                        <Image style={{position:"absolute", height: 360, width:360, resizeMode: 'stretch' }} source={require('./imgs/circle_bg.png')} />
                        {this.state.drawData.map((one, index) => {
                            const rotateDeg = 22.5;
                            let translateX = 0;
                            let translateY = 0;
                            const rotateTemp = -rotateDeg - (index * 45);
                            const sinTemp = Math.sin(rotateDeg * Math.PI / 180) * 105;
                            const consTemp = Math.cos(rotateDeg * Math.PI / 180) * 105;
                            switch (index) {
                                case 0:
                                    translateX = -sinTemp;
                                    translateY = -consTemp;
                                    break;
                                case 1:
                                    translateX = -consTemp;
                                    translateY = -sinTemp;
                                    break;
                                case 2:
                                    translateX = -consTemp;
                                    translateY = sinTemp;
                                    break;
                                case 3:
                                    translateX = -sinTemp;
                                    translateY = consTemp;
                                    break;
                                case 4:
                                    translateX = sinTemp;
                                    translateY = consTemp;
                                    break;
                                case 5:
                                    translateX = consTemp;
                                    translateY = sinTemp;
                                    break;
                                case 6:
                                    translateX = consTemp;
                                    translateY = -sinTemp;
                                    break;
                                case 7:
                                    translateX = sinTemp;
                                    translateY = -consTemp;
                                    break;
                                default:
                                    break
                            }
                            return (
                                <View key={one.ident} style={{justifyContent:"center",alignItems:"center", position: "absolute", zIndex: 99, height: 70, width: 60, top: 145, transform: [{ translateX: translateX }, { translateY: translateY}, { rotateZ: `${rotateTemp}deg` }] }}>
                                    <Text style={{fontSize:12, color:"#74340A", fontFamily:"STYuanti-SC-Regular",marginBottom:10}}>{one.name}</Text>
                                    <Image style={{width: 50, height: 50, resizeMode: "contain" }} source={{uri:one.icon}} />
                                </View>
                            )
                        })}
                    </View >
                </Animated.View>
                <TouchableOpacity activeOpacity={0.9} onPress={() => { this.rotateImg() }} style={styles.centerPoint}>
                    <Image source={require('./imgs/point_new.png')} style={{height: 134, width: 107, resizeMode: "stretch", position:"absolute"}} />
                    <Text style={{color:"#ffffff", textAlign:"center", fontSize:17, fontWeight:'bold',width:45, marginTop:20}}>{"开始抽奖" || "start game"}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:Dimensions.get('window').width,
        height:360,
        alignItems: 'center',
        backgroundColor:"#ffffff"
    },
    imgPoint: {
        width: 100,
        height: 100,
    },
    centerPoint: {
        position: 'absolute',
        left: Dimensions.get('window').width / 2 - 53,
        top: 100,
        zIndex: 100,
        height: 134, 
        width: 107,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainImg: {
        width: 360,
        height: 360,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    }
});
