import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import jwtDecode from 'jwt-decode';


interface DecodedToken {
  userId:String,
  name:string,
  role:String,
  avatar:String,
  nbf:number,
  exp:number,
  iat:number
}

const BASE_URL = "https://cotizacionapi.azurewebsites.net/Api/Auth/";
function ModalLogin({TokenSetter,RoleSetter,UserSetter}:any) {
  return (
  <div>
    <ButtonGroup>
      <SignIn setToken={TokenSetter} setRole={RoleSetter} setUser={UserSetter} />
      <SignUp />
    </ButtonGroup>
  </div>
  );
}
function SignIn({setToken,setRole,setUser}:any) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = (e:any) => {
    e.preventDefault();
    const datos = {
      email: email,
      password: password,
    };
    const data = JSON.stringify(datos);
    const config = {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }
    axios.post(BASE_URL+"Login",data,{headers:config})
    .then(res => {
      // console.log(res.data)
      const decodedToken = jwtDecode(res.data.Token) as DecodedToken
      const role = decodedToken.role.toString();
      const userId = decodedToken.userId.toString()
      const avatar = parseInt(decodedToken.toString())

      // setToken(res.data.Token)
      // setRole(decodedToken.role)
      // setUser(parseInt(userId))
      localStorage.setItem('token',res.data.Token)
      localStorage.setItem('userRole', role)
      localStorage.setItem('username',decodedToken.name)
      localStorage.setItem('avatar',decodedToken.avatar.toString())
      location.reload()
    })
    .catch(err => {
      console.log(err)
    })

  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <form>
      <Button colorScheme="purple" onClick={onOpen} ml={4}>
        Sign In
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='slideInBottom'
      >
        <ModalOverlay
          backdropFilter='blur(10px)'
          bg='blackAlpha.700'
          boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"

        />
        <ModalContent
        bg="transparent"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        backdropFilter="blur(100px)"
        borderRadius="10px"
        borderWidth="3px 3px 3px 3px"
        borderStyle="solid"
        borderColor="rgba(255, 255, 255, 0.2)"
        color="#fff"
        >
          <ModalHeader>Inicia Sesion</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack>
              <FormControl>
                <FormLabel>Correo</FormLabel>
                <Input
                  type="email"
                  ref={initialRef}
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme='purple'
              mr={3}
              onClick={loginHandler}
            >
              Ingresar
            </Button>
            <Button colorScheme="blackAlpha" onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
}
function SignUp() {

  const loginHandler = () => {
    const datos = {
      email: email,
      password: password,
    };
    const data = JSON.stringify(datos);
    const config = {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }
    axios.post(BASE_URL+"Login",data,{headers:config})
    .then(res => {
      // console.log(res.data)
      const decodedToken = jwtDecode(res.data.Token) as DecodedToken
      const role = decodedToken.role.toString();
      const userId = decodedToken.userId.toString()

      localStorage.setItem('token',res.data.Token)
      localStorage.setItem('userRole', role)
      location.reload()
    })
    .catch(err => {
      console.log(err)
    })

  };


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");



  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const registerHandler = () => {
    const fullName = firstName + lastName
    const datos = {
      fullName: fullName,
      email: email,
      password: password,
      passwordConfirm: passwordConfirmation,
    };
    const data = JSON.stringify(datos);
    const config = {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }

    axios.post(BASE_URL+"Register",data,{headers:config})
    .then(res => {
      loginHandler()
    })
    .catch(err => console.log(err))
  };
  return (
    <div>
      <Button colorScheme="purple" variant="outline" onClick={onOpen}>
        Sign Up
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay
          backdropFilter='blur(10px)'
          bg='blackAlpha.700'
          boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"

        />
        <ModalContent
        bg="transparent"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        backdropFilter="blur(100px)"
        borderRadius="10px"
        borderWidth="3px 3px 3px 3px"
        borderStyle="solid"
        borderColor="rgba(255, 255, 255, 0.2)"
        color="#fff"
        >
          <ModalHeader>Crea Tu Cuenta</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack>
              <FormControl>
                <FormLabel>Primer Nombre</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Primer Nombre"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Segundo Nombre</FormLabel>
                <Input
                  placeholder="Segundo Nombre"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Correo</FormLabel>
                <Input
                  type="email"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  placeholder="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Confirma Tu Contraseña</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirma Tu Contraseña"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="purple"
              mr={3}
              onClick={registerHandler}
            >
              Ingresar
            </Button>
            <Button colorScheme="blackAlpha" onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalLogin;
