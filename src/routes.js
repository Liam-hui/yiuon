import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import{ useSelector} from 'react-redux';

import AuthStack from '@/navigation/AuthStack';
import MainStack from '@/navigation/MainStack';


// const Routes = createAppContainer(createSwitchNavigator(
//     {
//         Auth: AuthStack,
//         Main: MainStack,
//     },
//     {
//         initialRouteName: 'Auth',
//     }
// ));



const Routes = () => {
    const loggedIn = useSelector(state => state.auth_state.loggedIn);

    return (
        <NavigationContainer>
            { !loggedIn && <AuthStack/>}
            { loggedIn && <MainStack/>}
        </NavigationContainer>
    );
};
export default Routes;
