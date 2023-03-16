import { Image, ChakraProvider, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Bg from "./assets/4280871.jpg";
import ErrorRoute,{NotFoundError,ServerError,TeaPotError,UnAuthenticatedError} from "./pages/ErrorRoute";
import PanelAdmin from "./pages/PanelAdmin";
import car3 from "./assets/5b1c63107b08b5894de645fbcfc971d1.png";
import CreateCotizaciones, { Total, Oferta } from "./pages/CreateCotizaciones";
import ModalLogin from "./components/ModalLogin";
import Home,{ VerOferta, VerTotal } from './pages/Home'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { VerLast5Oferta, VerLast5Total } from "./pages/Last5";
import avatar from "./assets/avatarCollection/avatar1.svg";
import avatar3 from "./assets/avatarCollection/avatar3.svg";
import avatar4 from "./assets/avatarCollection/avatar4.svg";
import avatar5 from "./assets/avatarCollection/avatar5.svg";
import avatar6 from "./assets/avatarCollection/avatar6.svg";
import avatar7 from "./assets/avatarCollection/avatar7.svg";
import avatar8 from "./assets/avatarCollection/avatar8.svg";
import avatar9 from "./assets/avatarCollection/avatar9.svg";
import avatar10 from "./assets/avatarCollection/avatar10.svg";
import avatar11 from "./assets/avatarCollection/avatar11.svg";
import avatar12 from "./assets/avatarCollection/avatar12.svg";
import avatar13 from "./assets/avatarCollection/avatar13.svg";
import avatar14 from "./assets/avatarCollection/avatar14.svg";
import avatar15 from "./assets/avatarCollection/avatar15.svg";
import avatar16 from "./assets/avatarCollection/avatar16.svg";
import avatar17 from "./assets/avatarCollection/avatar17.svg";
import avatar18 from "./assets/avatarCollection/avatar18.svg";
import avatar19 from "./assets/avatarCollection/avatar19.svg";
import avatar20 from "./assets/avatarCollection/avatar20.svg";
import avatar21 from "./assets/avatarCollection/avatar21.svg";
import avatar22 from "./assets/avatarCollection/avatar22.svg";
import avatar23 from "./assets/avatarCollection/avatar23.svg";
import avatar24 from "./assets/avatarCollection/avatar24.svg";
import avatar25 from "./assets/avatarCollection/avatar25.svg";
import avatar26 from "./assets/avatarCollection/avatar26.svg";
import avatar27 from "./assets/avatarCollection/avatar27.svg";
import avatar28 from "./assets/avatarCollection/avatar28.svg";
import avatar29 from "./assets/avatarCollection/avatar29.svg";
import avatar30 from "./assets/avatarCollection/avatar30.svg";


const avatarArray = [
  avatar4,
  avatar6,
  avatar8,
  avatar9,
  avatar13,
  avatar14,
  avatar17,
  avatar18,
  avatar20,
  avatar21,
  avatar22,
  avatar23,
  avatar24,
  avatar26,
  avatar27,
  avatar29,
  avatar30,
  avatar,
  avatar3,
  avatar5,
  avatar15,
  avatar16,
  avatar19,
  avatar25,
  avatar28,
avatar7, avatar10, avatar11, avatar12];

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

function App() {
  const [userId, setUserId] = useState(0);
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name,setName] = useState("")

  interface DecodedToken {
    userId: String;
    role: String;
    name:string;
    nbf: number;
    exp: number;
    iat: number;
  }

  // const decodedToken = jwtDecode(token) as DecodedToken;
    // const role = decodedToken.role.toString();
    // const userId = decodedToken.userId.toString();


  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");

    if (tokenLocal) {
      const decodedToken = jwtDecode(tokenLocal) as DecodedToken;
      localStorage.setItem("name", decodedToken.name)
      // localStorage.setItem("userId", decodedToken.userId)
      setIsAuthenticated(true);
      setToken(tokenLocal)
    }
  }, []);

  // Define a router guard to protect routes that require authentication
  const requireAuth = (element: React.ReactElement) => {
    return isAuthenticated ? element : <ErrorRoute />;
  };

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Flex bg="transparent">
          <Image ml={20} boxSize="50vw" transform={"scaleX(-1)"} src={car3} />
        </Flex>
      ),
    },
    {
      path: "/Admin",
      element: requireAuth(<PanelAdmin token={token} />),
    },
    {
      path: "/Login",
      element: <ModalLogin />,
    },
    {
      path: "/CotizacionTotal",
      element: requireAuth(<Total />),
    },
    {
      path: "/CotizacionOferta",
      element: requireAuth(<Oferta />),
    },
    {
      path:"/VerOferta",
      element:<VerOferta />
    },
    {
      path:"/VerTotal",
      element:<VerTotal />
    },
    {
      path: "/CreateCotizacion",
      element: requireAuth(<CreateCotizaciones />),
    },
    {
      path:"/VerLastOferta",
      element:<VerLast5Oferta />
    },
    {
      path:"/VerLastTotal",
      element:<VerLast5Total />
    }
  ]);

  return (
    <div className="App">
      <Flex
        // bgImage={Bg}
        // backgroundPosition="center"
        // backgroundRepeat="no-repeat"
        // bgSize={"100% 100%"}
        // direction="column"

        bgImage={Bg}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      bgSize={{ base: "cover", md: "100% 100%" }}
      direction="column"
      minHeight="100vh"
      // justify="center"
      // align="center"
      >
        <Navbar avatarArray={avatarArray} authentication={isAuthenticated} />
        <RouterProvider router={routes} />
        {/* <Total /> */}
        {/* <Oferta /> */}
      </Flex>
    </div>
  );
}

export default App;
