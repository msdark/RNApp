import { StackNavigator } from "react-navigation";

import SigninScreen from "../screens/Signin";
import TabNavigator from "./TabNavigator";
import LoadingScreen from "../screens/Loading";
import IndicadoresScreen from "../screens/Indicadores";

const AppNavigator = StackNavigator({
  Home: { screen: SigninScreen },
  Tabs: { screen: TabNavigator },
  Loading: { screen: LoadingScreen },
  Indicadores: { screen: IndicadoresScreen }
});

export default AppNavigator;
