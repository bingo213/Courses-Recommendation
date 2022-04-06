import { ReactElement } from "react";
import { Account, Login, MyGrade, Predict, Recommend, SignUp } from "../pages";

interface RouteProps {
    name: string;
    path: string;
    exact: boolean;
    component: ReactElement;
    /* props?: any; */
}

export const routes: RouteProps[] = [
    {
        name: 'Recommend',
        path: '/',
        exact: true,
        component: <Recommend />
    },
    {
        name: 'Recommend',
        path: '/recommend',
        exact: true,
        component: <Recommend />
    },
    {
        name: 'Account',
        path: '/account',
        exact: true,
        component: <Account />
    },
    {
        name: 'Login',
        path: '/login',
        exact: true,
        component: <Login />
    },
    {
        name: 'Sign Up',
        path: '/sign_up',
        exact: true,
        component: <SignUp />
    },
    {
        name: 'My Grade',
        path: '/my_grade',
        exact: true,
        component: <MyGrade />
    },
    {
        name: 'Predict',
        path: '/predict',
        exact: true,
        component: <Predict />
    }
]