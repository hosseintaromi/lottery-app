import {createBrowserRouter} from "react-router-dom";
import Login from './src/components/Login.tsx'
import Layout from "./src/pages/Layout.tsx";
import InputData from "./src/components/InputData.tsx";
import VideoPlayer from "./src/components/VideoPlayer.tsx";
import Result from "./src/components/Result.tsx";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true, element: <Login/>
            },
            {
                path: 'inputs/', element: <InputData/>,
            },

            {
                path: 'medias/', element: <VideoPlayer/>
            },
            {
                path: 'result/', element: <Result/>
            }


        ]
    }



]);

export default router;