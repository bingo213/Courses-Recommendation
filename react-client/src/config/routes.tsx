import { ReactElement } from "react";
import { Profile, Login, MyGrade, Predict, Recommend } from "../pages";

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
        name: 'Recommend',
        path: 'recommend',
        component: <Recommend />
    },
    {
        name: 'Account',
        path: 'account',
        component: <Profile />
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