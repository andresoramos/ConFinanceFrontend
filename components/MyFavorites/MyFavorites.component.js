import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-elements";
import { View, Text, BackHandler, Dimensions, Button } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
import findFavorites from "../../services/findFavorites";
// function TestingScreen(props) {
//   return <Text>{props.rerenderNum}</Text>;
// }

class MyFavorites extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = async () => {
    console.log("my favorites is re-rendering");
    this.props.history.push("/likedList");

    if (!this.props.backValue) {
      this.props.updateHistory(this.props.history.location.pathname);
    }

    BackHandler.addEventListener("hardwareBackPress", this.backOne);
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.backOne);
  };
  generateList = (array) => {
    let output = [];
    for (var i = 0; i < array.length; i++) {
      output.push(<Text key={i}>{i}</Text>);
    }
    return output;
  };
  render() {
    // const favCopyMapped = this.generateList(favCopy);
    return (
      <View>
        <Button
          onPress={() => {
            this.props.history.push("/likedList");
          }}
          title="See liked list"
        />
      </View>
    );
    // return this.props.favoritedBusinesses.map((item, i) => {
    //   return (
    //     <Text key={i}>Hello</Text>
    //     // <View
    //     //   key={i}
    //     //   style={{
    //     //     padding: 0,
    //     //     justifyContent: "center",
    //     //     alignItems: "center",
    //     //     alignContent: "center",
    //     //     marginBottom: 10,
    //     //     borderRadius: 20,
    //     //     height: this.height / 5,
    //     //     marginRight: this.width / 19,
    //     //     marginLeft: this.width / 19,
    //     //     width: (this.width / 19) * 18,
    //     //     backgroundColor: "green",
    //     //     flexDirection: "row",
    //     //   }}
    //     // >
    //     //   <View style={{ width: "50%", backgroundColor: "pink" }}>
    //     //     <Avatar rounded icon={{ name: "restaurant" }} size="large" />
    //     //   </View>
    //     //   <View
    //     //     style={{
    //     //       backgroundColor: "grey",
    //     //       width: "50%",
    //     //       flexDirection: "column",
    //     //     }}
    //     //   >
    //     //     <View
    //     //       style={{ flexDirection: "row", justifyContent: "space-between" }}
    //     //     >
    //     //       <Text style={{ fontSize: 15 }}>{item.name}</Text>
    //     //       <Avatar
    //     //         onPress={() => {
    //     //         }}
    //     //         rounded
    //     //         size="medium"
    //     //         icon={{ name: "favorite" }}
    //     //       />
    //     //     </View>
    //     //     <Text>{item.rating}</Text>
    //     //   </View>
    //     // </View>
    //   );
    // });
  }
}

export default MyFavorites;
