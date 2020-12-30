import React, { useState, useEffect } from "react";
import { Avatar, Header, Card } from "react-native-elements";
import {
  View,
  Text,
  BackHandler,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
import findFavorites from "./../../services/findFavorites";
import BusinessCard from "./../BusinessCard/BusinessCard.component";
import SubheaderCard from "./../SubheaderCard/SubheaderCard.component";
import TopHeader from "./../TopHeader/TopHeader.component";
import TabNavigator from "react-native-tab-navigator";
import Icon from "react-native-vector-icons/FontAwesome";

// function TestingScreen(props) {
//   return <Text>{props.rerenderNum}</Text>;
// }
const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
  return (px * deviceW) / basePx;
}

class LikedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
    };
  }

  componentDidMount = async () => {
    if (!this.props.backValue) {
      this.props.updateHistory(this.props.history.location.pathname);
    }
    await this.refreshHearts();
    BackHandler.addEventListener("hardwareBackPress", this.backOne);
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.backOne);
  };

  refreshHearts = async () => {
    const favorites = await findFavorites();
    this.setState({ favorites: favorites.data });
  };
  render() {
    return (
      <View style={{ height: "100%" }}>
        {/* <Header
          backgroundColor="#44484c"
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{
            text: "The Creme de la Creme",
            style: { color: "#fff" },
          }}
        /> */}
        <TopHeader />

        <ScrollView>
          <SubheaderCard
            title="The Creme de La Creme"
            centerText="Share your favorite places with your favorite people!"
          />
          {this.state.favorites.length > 0 ? (
            this.state.favorites.map((item, i) => {
              return (
                <BusinessCard
                  refreshHearts={this.refreshHearts}
                  dontFixHeart={true}
                  business={item}
                  key={i}
                />
              );
            })
          ) : (
            <Text>Welp, we tried</Text>
          )}
          <Button
            title="Home"
            onPress={() => {
              this.props.history.push("/search");
            }}
          />
        </ScrollView>
        <TabNavigator tabBarStyle={{}} sceneStyle={{}}>
          <TabNavigator.Item
            selectedTitleStyle={{ color: "#3496f0" }}
            renderIcon={() => (
              <Icon name="plus-circle" size={px2dp(22)} color="#667" />
            )}
            renderSelectedIcon={() => (
              <Icon name="plus-circle" size={px2dp(22)} color="#3496f0" />
            )}
            //badgeText="1"
            onPress={() => {
              this.props.history.push("/search");
              this.props.setSearchTab("addBusiness");
            }}
          />
          <TabNavigator.Item
            selectedTitleStyle={{ color: "#3496f0" }}
            renderIcon={() => (
              <Icon name="heart" size={px2dp(22)} color="#666" />
            )}
            renderSelectedIcon={() => (
              <Icon name="heart" size={px2dp(22)} color="#3496f0" />
            )}
            //badgeText="1"
            onPress={() => {
              console.log("The press just happened");
            }}
          />
          <TabNavigator.Item
            selectedTitleStyle={{ color: "#3496f0" }}
            renderIcon={() => (
              <Icon name="plus-circle" size={px2dp(22)} color="#667" />
            )}
            renderSelectedIcon={() => (
              <Icon name="plus-circle" size={px2dp(22)} color="#3496f0" />
            )}
            //badgeText="1"
            onPress={() => {
              console.log("The press just happened");
            }}
          />
          <TabNavigator.Item
            selectedTitleStyle={{ color: "#3496f0" }}
            renderIcon={() => (
              <Icon name="plus-circle" size={px2dp(22)} color="#667" />
            )}
            renderSelectedIcon={() => (
              <Icon name="plus-circle" size={px2dp(22)} color="#3496f0" />
            )}
            //badgeText="1"
            onPress={() => {
              console.log("The press just happened");
            }}
          />
        </TabNavigator>
      </View>
    );
  }
}

export default LikedList;
