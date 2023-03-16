import React, { useEffect, useState } from "react";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  Avatar,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Badge,
  Select,
} from "@chakra-ui/react";
import ToastComponent from "../components/ToastComponent";
import axios from "axios";
import ErrorRoute from "./ErrorRoute";

interface User {
  avatar: string;
  active: number;
  email: string;
  fullName: string;
  role: string;
  userId: number;
}

const BASE_URL = "https://cotizacionapi.azurewebsites.net/Api/User";

function PanelAdmin({ token }: any) {
  const statusColor = (status: any) => {
    if (status === 0) {
      return "red";
    }
    if (status === 1) {
      return "green";
    }
  };
  const statusLabel = (status: any) => {
    if (status === 0) {
      return "Disable";
    }
    if (status === 1) {
      return "Active";
    }
  };
  const config = {
    headers: {
      // "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/GetUsers", config)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [isMounted,setIsMounted] = useState(false)

  return (
    <Flex mb={155} direction="column" mx="10rem">
      <TableContainer bg="#fff" borderRadius={5}>
        <Table variant="simple">
          <TableCaption>Desea Agregar un nuevo usuario?</TableCaption>
          <Thead>
            <Tr>
              <Th color="black">Avatar</Th>
              <Th color="black">User</Th>
              <Th color="black">Status</Th>
              <Th color="black">Email</Th>
              <Th color="black">Role</Th>
              <Th color="black">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user,key) => (
              <Tr>
                <Th>
                  <Avatar src={user.avatar} />
                </Th>
                <Th>
                  <Text color="black">{user.fullName}</Text>
                </Th>
                <Th>
                  <Badge
                    borderRadius={50}
                    colorScheme={statusColor(user?.active)}
                  >
                    {statusLabel(user.active)}
                  </Badge>
                </Th>
                <Th>
                  <Text color="black">{user.email}</Text>
                </Th>
                <Th>
                  <Text color="black">{user.role}</Text>
                </Th>
                <Th>
                  <ButtonGroup>
                    <EditComponent userId={user.userId} token={token}/>
                    <DeleteComponent userId={user.userId} token={token} />
                  </ButtonGroup>
                </Th>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr></Tr>
          </Tfoot>
        </Table>
        <AddUser />
      </TableContainer>
    </Flex>
  );
}

// async function TableComponent()
// {
//   const statusColor = (status:any) =>
//   {
//     if(status === 0)
//     {
//       return 'red'
//     }
//     if(status === 1)
//     {
//       return 'green'
//     }
//   }
//   const statusLabel = (status:any) =>
//   {
//     if(status === 0)
//     {
//       return 'Disable'
//     }
//     if(status === 1)
//     {
//       return 'Active'
//     }
//   }
//     const config = {
//     headers: {
//       // "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json; charset=utf-8",
//     },
//   };
// const [users,setUsers] = useState<User[]>([]);

// useEffect(() => {
//   axios
//     .get(BASE_URL + 'User/GetUsers',config)
//     .then((res) => {
//       setUsers(res.data)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }, [])

//     return(
//         <TableContainer bg='#fff' borderRadius={5}>
//       <Table variant="simple">
//         <TableCaption>Desea Agregar un nuevo usuario?</TableCaption>
//         <Thead>
//           <Tr>
//             <Th color='black'>Avatar</Th>
//             <Th color='black'>User</Th>
//             <Th color='black'>Status</Th>
//             <Th color='black'>Email</Th>
//             <Th color='black'>Role</Th>
//             <Th color='black'>Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {users.map((user) => (
//             <Tr>
//               <Th>
//                 <Avatar src={user.avatar} />
//               </Th>
//               <Th>
//                 <Text color='black'>{user.fullName}</Text>
//               </Th>
//               <Th>
//                 <Badge borderRadius={50} colorScheme={statusColor(user?.active)}>{statusLabel(user.active)}</Badge>
//               </Th>
//               <Th>
//                 <Text color='black'>{user.email}</Text>
//               </Th>
//               <Th>
//                 <Text color='black'>{user.role}</Text>
//               </Th>
//               <Th>
//                 <ButtonGroup>
//                     <EditComponent />
//                     <DeleteComponent />
//                 </ButtonGroup>
//               </Th>
//             </Tr>
//           ))}
//         </Tbody>
//         <Tfoot>
//           <Tr>
//           </Tr>
//         </Tfoot>
//       </Table>
//             <AddUser />
//     </TableContainer>
//     )
// }
function EditComponent({ userId,token } : any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [user, setUser] = useState<User>();

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const[role,setRole] = useState("")
  const [status,setStatus] = useState(0)
  const config = {
    headers: {
      // "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

const getUserInfo = () =>
{


  const url  = BASE_URL + "/GetSingleUser/"

      axios
      .get(url + userId, config)
      .then((res) => {
        const vName = res.data.fullName
        const vEmail = res.data.email
        const vRole = res.data.role
        const vStatus = res.data.active
        setUser(res.data);
        setName(vName)
        setEmail(vEmail)
        setRole(vRole)
        setStatus(vStatus)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
const sendEdit = () =>
{
  const data = {
    userId: userId,
    avatar:"",
    fullName:name,
    active:status,
    email:email,
    role:role
  }
  axios.put(BASE_URL + "/EditUser",data,config)
  .then(response => {
    console.log(response)
    location.reload()
  })
  .catch(err => console.log(err))
}

  return (
    <div>
      <Button colorScheme="whatsapp" onClick={onOpen}>
        Edit
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack mx={8} direction="column">
            <Button w='full' colorScheme='blue' onClick={getUserInfo}>GetUser</Button>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                    value={name}
                  onChange={(e)=>setName(e.target.value)}
                  ref={initialRef}
                  placeholder="Full Name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                    value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Role</FormLabel>
                {/* <Input
                    value={role}
                  onChange={(e)=>setRole(e.target.value)}
                  placeholder="Role"
                /> */}
                <Select bg={role === 'Admin' ? 'green.300' : 'blue.300'} value={role} onChange={(e)=>setRole(e.target.value)}>
                  <option value='Admin'>Administrador</option>
                  <option value='User'>Usario</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Status</FormLabel>
                <Select value={status} onChange={(e)=>setStatus(parseInt(e.target.value))}>
                  <option value={0}>Inactivo</option>
                  <option value={1}>Activo</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={sendEdit}>
        Submit
      </Button>
            {/* <ToastComponent
              colorScheme="purple"
              Label="Submit"
              Title="Submitted"
              Description="Users Submitted Successfully"
              Status="success"
              clicazo={sendEdit}
            /> */}
            <Button colorScheme="telegram" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
function DeleteComponent({ userId,token }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const config = {
    headers: {
      // "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const handleDelete = () => {
    axios.delete(BASE_URL + "/DeleteUser/" + userId,config)
  .then(response => {
    console.log(response)
    location.reload()
  })
  .catch(err => console.log(err))
  }
  return (
    <div>
      <Button colorScheme="red" onClick={onOpen}>
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this user?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            {/* <ToastComponent
              colorScheme="red"
              Label="Delete"
              Title="Deleted"
              Description="Users Deleted Successfully"
              Status="success"
            /> */}
            <Button variant="ghost" colorScheme="whatsapp" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
function AddUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [user,setUser] = useState<User[]>([]);
  return (
    <div>
      <Button
        mb={5}
        w="full"
        colorScheme="whatsapp"
        variant="ghost"
        onClick={onOpen}
      >
        Add
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>
          <VStack mx={8} direction="column">
            <FormControl>
              <FormLabel>Fist Name</FormLabel>
              <Input ref={initialRef} placeholder="First Name" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="Last Name" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input placeholder="Password" type="password" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" placeholder="Confirm Password" />
            </FormControl>
          </VStack>
          <ModalFooter>
            {/* <Button colorScheme="purple" mr={3}>
              Submit
            </Button> */}
            <ToastComponent
              colorScheme="purple"
              Label="Delete"
              Title="Added"
              Description="Users Added Successfully"
              Status="success"
            />
            <Button colorScheme="telegram" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PanelAdmin;
