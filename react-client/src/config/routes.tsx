import { ReactElement } from "react";
import { Account, Login, MyGrade, Predict, Recommend, SignUp } from "../pages";

interface RouteProps {
    name: string;
    path: string;
    component: ReactElement;
}

export const routes: RouteProps[] = [
    {
        name: 'Login',
        path: 'login',
        component: <Login />
    },
    {
        name: 'Sign Up',
        path: 'sign_up',
        component: <SignUp />
    },
    {
        name: 'Recommend',
        path: 'recommend',
        component: <Recommend />
    },
    {
        name: 'Account',
        path: 'account',
        component: <Account />
    },
    {
        name: 'My Grade',
        path: 'my_grade',
        component: <MyGrade />
    },
    {
        name: 'Predict',
        path: 'predict',
        component: <Predict />
    }
]