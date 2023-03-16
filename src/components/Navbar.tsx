import React, { useEffect, useState } from "react";
import {
  Avatar,
  Flex,
  Text,
  Image,
  IconButton,
  Spacer,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
  Button,
  DrawerFooter,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  Drawer,
  Heading,
  Accordion,
  DrawerOverlay,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import ModalLogin from "./ModalLogin";
import avatar from "../assets/avatarCollection/avatar1.svg";
import avatar3 from "../assets/avatarCollection/avatar3.svg";
import avatar4 from "../assets/avatarCollection/avatar4.svg";
import avatar5 from "../assets/avatarCollection/avatar5.svg";
import avatar6 from "../assets/avatarCollection/avatar6.svg";
import avatar7 from "../assets/avatarCollection/avatar7.svg";
import avatar8 from "../assets/avatarCollection/avatar8.svg";
import avatar9 from "../assets/avatarCollection/avatar9.svg";
import avatar10 from "../assets/avatarCollection/avatar10.svg";
import avatar11 from "../assets/avatarCollection/avatar11.svg";
import avatar12 from "../assets/avatarCollection/avatar12.svg";
import avatar13 from "../assets/avatarCollection/avatar13.svg";
import avatar14 from "../assets/avatarCollection/avatar14.svg";
import avatar15 from "../assets/avatarCollection/avatar15.svg";
import avatar16 from "../assets/avatarCollection/avatar16.svg";
import avatar17 from "../assets/avatarCollection/avatar17.svg";
import avatar18 from "../assets/avatarCollection/avatar18.svg";
import avatar19 from "../assets/avatarCollection/avatar19.svg";
import avatar20 from "../assets/avatarCollection/avatar20.svg";
import avatar21 from "../assets/avatarCollection/avatar21.svg";
import avatar22 from "../assets/avatarCollection/avatar22.svg";
import avatar23 from "../assets/avatarCollection/avatar23.svg";
import avatar24 from "../assets/avatarCollection/avatar24.svg";
import avatar25 from "../assets/avatarCollection/avatar25.svg";
import avatar26 from "../assets/avatarCollection/avatar26.svg";
import avatar27 from "../assets/avatarCollection/avatar27.svg";
import avatar28 from "../assets/avatarCollection/avatar28.svg";
import avatar29 from "../assets/avatarCollection/avatar29.svg";
import avatar30 from "../assets/avatarCollection/avatar30.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { ImExit } from 'react-icons/Im'

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

interface User{
  userId:number;
  avatar:number;
  fullName:string;
  active:number;
  email:string;
  role:string
}
interface DecodedToken {
  userId:String,
  role:String,
  nbf:number,
  exp:number,
  iat:number
}
const token = localStorage.getItem("token");
const avatarIndex = localStorage.getItem("avatar")
// const Index = parseInt(avatarIndex ? avatarIndex : 0)



const config = {
  headers: {
    // "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json; charset=utf-8",
  },
};

const profile =
  "https://i.pinimg.com/736x/bc/0e/80/bc0e8046763e357a2b8b70829f3e4660.jpg";

  function Navbar({authentication}:any) {

    const [user,setUser] = useState<User>()

  const [token,setToken] = useState("")
  const [role,setRole] = useState("")
  const [index,setIndex] = useState(0)
  const fullName = localStorage.getItem('username')

  // const decodedToken = jwtDecode(token) as DecodedToken
  //     const role = decodedToken.role.toString();
  //     const userId = decodedToken.userId.toString()

  useEffect(() => {
    const tokenString = window.localStorage.getItem('authToken')
    setToken(tokenString != null ? tokenString : "")
  }, [])

  return (
    <div>
      {authentication ?
    <Flex bg="" p={5}>
      <DrawerComponent name={fullName} index={avatarIndex} />
      <Spacer />
        <MenuNavbarUser index={avatarIndex} />
    </Flex>:
    <Flex bg="" p={5}>
      <IconButton h="auto" borderRadius={50} aria-label={"Logo Apps"}>
        <Avatar onClick={()=>window.location.href = '/'} src={"https://sm.ign.com/ign_es/gallery/o/one-piece-/one-piece-odyssey-first-trailer-screenshots_4q1w.jpg"} />
      </IconButton>
      <Spacer />
      <ModalLogin />
    </Flex>
      }
    </div>
  );
}

function MenuNavbarUser({index}:any) {
  const i = parseInt(index)
  const signOut = () =>
  {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    if(location.href != '/')
    {
      location.href = '/'
    }else
    {
      location.reload()
    }
  }
  return (
    <Menu>
      <MenuButton borderRadius={50}>
        <Avatar src={avatarArray[i]} />
      </MenuButton>
      <MenuList>
        <MenuItem minH="48px">
          <Flex align="center">
            <Image
              boxSize="2rem"
              borderRadius="full"
              src={avatarArray[i]}
              alt="Fluffybuns the destroyer"
              mr="12px"
            />
            <Text>Account</Text>
          </Flex>
        </MenuItem>
        <MenuItem minH="40px" onClick={signOut}>
          <Flex align="center">
            <Image
              boxSize="2rem"
              borderRadius="full"
              src={avatarArray[i]}
              alt="Simon the pensive"
              mr="12px"
            />
            <Text>Sign Out</Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
function MenuDrawerUser({index}:any) {
  const i = parseInt(index)
  const [user,setUser] = useState<User>()
  axios.get("https://cotizacionesback.azurewebsites.net/Api/User/GetCurrentUserInfo",config)
        .then(res=>{

          setUser(res.data)
        })
        .catch(err=>console.log(err))
  const signOut = () =>
  {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    if(location.href != '/')
    {
      location.href = '/'
    }else
    {
      location.reload()
    }
  }
  return (
    <Menu>
      <MenuButton borderRadius={50}>
        <Avatar size="xl" src={avatarArray[i]}>
        </Avatar>
      </MenuButton>
      <MenuList>
        <MenuItem minH="48px">
          <Flex align="center">
            <Image
              boxSize="2rem"
              borderRadius="full"
              src={avatarArray[i]}
              alt="Fluffybuns the destroyer"
              mr="12px"
            />
            <Text>Account</Text>
          </Flex>
        </MenuItem>
        <MenuItem onClick={signOut} minH="40px">
          <Flex align="center">
            <Image
              boxSize="2rem"
              borderRadius="full"
              src={avatarArray[i]}
              alt="Simon the pensive"
              mr="12px"
            />
            <Text>Edit Profile</Text>
          </Flex>
        </MenuItem>
        <MenuItem onClick={signOut} minH="40px"><Icon mr={5} as={ImExit}/>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
}
function DrawerComponent({index,name}:any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
      <>
      <IconButton size='md' borderRadius={50} colorScheme='purple' onClick={onOpen} aria-label={'Drawer Open'}>
        <GiHamburgerMenu />
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay
        backdropFilter='blur(10px)'
        bg='blackAlpha.700'
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
        />
        <DrawerContent
                bg="transparent"
                boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                backdropFilter="blur(100px)"
                borderRadius="10px"
                borderWidth="0 4px 0 0"
                borderStyle="solid"
                borderColor="rgba(255, 255, 255, 0.2)"
                color="#fff"
        >
          <DrawerCloseButton />
          <DrawerHeader>Profile</DrawerHeader>

          <DrawerBody>
            <Flex direction={'column'} align={'center'} gap={2}>
              {/* <Avatar size="xl" src={avatar[index]}/> */}
              <MenuDrawerUser index={index} />
              <Heading size='lg' mb={5}>{name}</Heading>
              <AccordionComponent />
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="purple" mr={3}>
              Sign Out
            </Button>
            {/* <Button colorScheme='blue' onClick={onClose}>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>

    </div>
  )
}
function AccordionComponent()
{
  return(
  <Accordion w="full" allowToggle>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Flex w="full">
        <Text>
          Crear Cotizacion Nueva
        </Text>
        <Spacer />
        <AccordionIcon />
        {/* <Avatar size="sm"/> */}
        </Flex>
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Button colorScheme="whatsapp" w='full' mb={2} borderRadius={0} onClick={()=>location.href = '/CotizacionTotal'}>Total</Button>
      <Button colorScheme="messenger" w='full' borderRadius={0} onClick={()=>location.href = '/CotizacionOferta'}>Oferta</Button>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
      <Flex w="full">
        <Text>
          Ver Todas Las Cotizaciones
        </Text>
        <Spacer />
        <AccordionIcon />
      </Flex>
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <Button colorScheme='whatsapp' w='full' mb={2} borderRadius={0} onClick={()=>location.href = '/VerTotal'}>Total</Button>
      <Button colorScheme='messenger' w='full' borderRadius={0} onClick={()=>location.href = '/VerOferta'}>Oferta</Button>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
      <Flex w="full">
        <Text>
          Ver Las Ultimas Cotizaciones
        </Text>
        <Spacer />
        <AccordionIcon />
      </Flex>
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Button colorScheme='whatsapp' w='full' mb={2} borderRadius={0} onClick={()=>location.href = '/VerLastTotal'}>Total</Button>
      <Button colorScheme='messenger' w='full' borderRadius={0} onClick={()=>location.href = '/VerLastOferta'}>Oferta</Button>
    </AccordionPanel>
  </AccordionItem>
</Accordion>
)
}
export default Navbar;
