import { createBrowserRouter } from "react-router-dom";
import CameraComponent from "./component/CameraComponent"

const router = createBrowserRouter([
  {
    path: "/3rdAeye",
    element: <CameraComponent />,
  },
]);
export default router;
