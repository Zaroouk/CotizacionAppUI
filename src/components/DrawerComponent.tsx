import { useEffect, useState } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Text,
  IconButton,
  Flex,
  Heading,
  Spacer,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
  Accordion,
  useTheme,
} from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import axios from 'axios';

interface User{
  userId:number;
  avatar:number;
  fullName:string;
  active:number;
  email:string;
  role:string
}

const token = localStorage.getItem("token");

const config = {
  headers: {
    // "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json; charset=utf-8",
  },
};

function DrawerComponent(avatar:any) {
  const [user,setUser] = useState<User>()
  const [index,setIndex] = useState(0)

  useEffect(() => {
    axios.get("https://cotizacionesback.azurewebsites.net/Api/User/GetCurrentUserInfo",config)
        .then(res=>{
          setUser(res.data)
          setIndex(res.data.avatar)
          // console.log(res.data)
        })
        .catch(err=>console.log(err))
  }, [])
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
              {/* <MenuDrawerUser avatar={avatar} /> */}
              <Heading size='lg' mb={5}>{user?.fullName}</Heading>
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
  const theme = useTheme()
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
export default DrawerComponent