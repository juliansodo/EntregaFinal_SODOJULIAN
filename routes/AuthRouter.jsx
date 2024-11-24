import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navbar } from "../components";
import { LoginScreen } from "../screens";
import SignupScreen from "../screens/SignupScreen";

const Stack = createNativeStackNavigator();

export const AuthRouter = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}> 
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    )
}
