import {
    Flex,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Image,
    Box,
    Heading,
    Text,
    Avatar,
    Spacer,
    Grid,
    GridItem,
    ButtonGroup,
    Icon,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { BiShare } from "react-icons/bi";
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
  import myersImage from "../assets/Myers.jpg";
  import AlfaImage from "../assets/Alfa.png";
  import axios, { AxiosRequestConfig } from "axios";
//   import PdfIcon from "../assets/pdf-svgrepo-com.svg"
import PDFIcon from '../assets/pdf-svgrepo-com.svg'
import PdfIcon from 'document-extension-file-file-format-file-type-format-18-svgrepo-com.svg'

  const maleAvatar = [
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
  ];
  const femaleAvatar = [
    avatar,
    avatar3,
    avatar5,
    avatar15,
    avatar16,
    avatar19,
    avatar25,
    avatar28,
  ];
const PDFSvg = () =>{
    return <Icon borderRadius={5} boxSize={7} viewBox="-5 15 40 10" color='red.500'>
    <path d="M25.6686 26.0962C25.1812 26.2401 24.4656 26.2563 23.6984 26.145C22.875 26.0256 22.0351 25.7739 21.2096 25.403C22.6817 25.1888 23.8237 25.2548 24.8005 25.6009C25.0319 25.6829 25.412 25.9021 25.6686 26.0962ZM17.4552 24.7459C17.3953 24.7622 17.3363 24.7776 17.2776 24.7939C16.8815 24.9017 16.4961 25.0069 16.1247 25.1005L15.6239 25.2275C14.6165 25.4824 13.5865 25.7428 12.5692 26.0529C12.9558 25.1206 13.315 24.178 13.6667 23.2564C13.9271 22.5742 14.193 21.8773 14.468 21.1894C14.6075 21.4198 14.7531 21.6503 14.9046 21.8814C15.5948 22.9326 16.4624 23.9045 17.4552 24.7459ZM14.8927 14.2326C14.958 15.383 14.7098 16.4897 14.3457 17.5514C13.8972 16.2386 13.6882 14.7889 14.2489 13.6185C14.3927 13.3185 14.5105 13.1581 14.5869 13.0744C14.7049 13.2566 14.8601 13.6642 14.8927 14.2326ZM9.63347 28.8054C9.38148 29.2562 9.12426 29.6782 8.86063 30.0767C8.22442 31.0355 7.18393 32.0621 6.64941 32.0621C6.59681 32.0621 6.53316 32.0536 6.44015 31.9554C6.38028 31.8926 6.37069 31.8476 6.37359 31.7862C6.39161 31.4337 6.85867 30.8059 7.53527 30.2238C8.14939 29.6957 8.84352 29.2262 9.63347 28.8054ZM27.3706 26.1461C27.2889 24.9719 25.3123 24.2186 25.2928 24.2116C24.5287 23.9407 23.6986 23.8091 22.7552 23.8091C21.7453 23.8091 20.6565 23.9552 19.2582 24.2819C18.014 23.3999 16.9392 22.2957 16.1362 21.0733C15.7816 20.5332 15.4628 19.9941 15.1849 19.4675C15.8633 17.8454 16.4742 16.1013 16.3632 14.1479C16.2737 12.5816 15.5674 11.5295 14.6069 11.5295C13.948 11.5295 13.3807 12.0175 12.9194 12.9813C12.0965 14.6987 12.3128 16.8962 13.562 19.5184C13.1121 20.5751 12.6941 21.6706 12.2895 22.7311C11.7861 24.0498 11.2674 25.4103 10.6828 26.7045C9.04334 27.3532 7.69648 28.1399 6.57402 29.1057C5.8387 29.7373 4.95223 30.7028 4.90163 31.7107C4.87693 32.1854 5.03969 32.6207 5.37044 32.9695C5.72183 33.3398 6.16329 33.5348 6.6487 33.5354C8.25189 33.5354 9.79489 31.3327 10.0876 30.8909C10.6767 30.0029 11.2281 29.0124 11.7684 27.8699C13.1292 27.3781 14.5794 27.011 15.985 26.6562L16.4884 26.5283C16.8668 26.4321 17.2601 26.3257 17.6635 26.2153C18.0904 26.0999 18.5296 25.9802 18.976 25.8665C20.4193 26.7844 21.9714 27.3831 23.4851 27.6028C24.7601 27.7883 25.8924 27.6807 26.6589 27.2811C27.3486 26.9219 27.3866 26.3676 27.3706 26.1461ZM30.4755 36.2428C30.4755 38.3932 28.5802 38.5258 28.1978 38.5301H3.74486C1.60224 38.5301 1.47322 36.6218 1.46913 36.2428L1.46884 3.75642C1.46884 1.6039 3.36763 1.4734 3.74457 1.46908H20.263L20.2718 1.4778V7.92396C20.2718 9.21763 21.0539 11.6669 24.0158 11.6669H30.4203L30.4753 11.7218L30.4755 36.2428ZM28.9572 10.1976H24.0169C21.8749 10.1976 21.7453 8.29969 21.7424 7.92417V2.95307L28.9572 10.1976ZM31.9447 36.2428V11.1157L21.7424 0.871022V0.823357H21.6936L20.8742 0H3.74491C2.44954 0 0 0.785336 0 3.75711V36.2435C0 37.5427 0.782956 40 3.74491 40H28.2001C29.4952 39.9997 31.9447 39.2143 31.9447 36.2428Z" fill="#EB5757"/>
</Icon>
}
  const unisexAvatar = [avatar7, avatar10, avatar11, avatar12];

  interface CotizacionOferta {
    transactionId: number;
    userId: number;
    company: string;
    name: string;
    date: string;
    quantity: string;
    price: string;
    code: string;
    product: string;
    offPrice: string;
    deliveryETA: string;
    paymentDetails: string;
    org: string;
    offerDuration: number;
  }
  interface CotizacionTotal {
    transactionId: number;
    userId: number;
    company: string;
    name: string;
    date: string;
    quantity: string;
    price: string;
    code: string;
    product: string;
    totalPrice: string;
    deliveryETA: string;
    paymentDetails: string;
    org: string;
    offerDuration: number;
  }
  interface User{
    userId:number;
    avatar:string;
    fullName:string;
    active:number;
    email:string;
    role:string
  }

  const BASE_URL_OFERTA = "https://cotizacionesback.azurewebsites.net/Api/CotizacionesOferta";
  const BASE_URL_TOTAL = "https://cotizacionesback.azurewebsites.net/Api/CotizacionesTotal";

  function Last5() {
    return <div>Last5</div>;
  }
  export function VerLast5Oferta() {
    const avatarUser = "https://bit.ly/sage-adebayo";
    const userName = "Segun Adebayo";
    const userRole = "Creator, Chakra UI";
    const cover = {
      myers: {
        image: myersImage,
        label: "Myers",
      },
      alfa: {
        image: AlfaImage,
        label: "Alfa y Omega",
      },
    };

    const imageCotizacion = (cotizacion: string) => {
      if (cotizacion === "Myers") {
        return myersImage;
      } else {
        return AlfaImage;
      }
    };

  const [cotizaciones,setCotizaciones] = useState<CotizacionOferta[]>([])
  const [user,setUser] = useState<User>()

      const token = localStorage.getItem("token");

    useEffect(() => {

      const config = {
        headers: {
          // "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      };
      axios
        .get(BASE_URL_OFERTA + "/GetLastFiveOferta", config)
        .then((res) => {
          setCotizaciones(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

        axios.get("https://cotizacionesback.azurewebsites.net/Api/User/GetCurrentUserInfo",config)
    .then(res=>{
      setUser(res.data)
      // console.log(res.data)
    })
    .catch(err=>console.log(err))
    }, [])


    const deleteCotizacion =(transactionId:number)=>
    {
      const config = {
        headers: {
          // "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      };
      axios.delete(BASE_URL_OFERTA+"/DeleteCotizacionOferta/"+transactionId,config)
      .then(res=>{
        console.log(res.data)
        location.reload()
      }
        )
      .catch(err =>console.error(err))
    }

    // console.log(localStorage.getItem("token"))

    const downloadPDF = (transactionId:number) =>
    {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "arraybuffer", // set the responseType to arraybuffer to receive the PDF file data
      };
      axios
        .get(BASE_URL_OFERTA + `CotizacionesOferta/downloadPDF/${transactionId}`, config)
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          const pdfUrl = URL.createObjectURL(pdfBlob);

          // Create a download link and simulate a click on it
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download = "Cotizacion.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return (
        <Grid
      textAlign="justify"
      mt={5}
      templateColumns="repeat(3, 1fr)"
      gap={1}
    >
        {cotizaciones.map((cotizacion,key) => (
      <GridItem key={key} colSpan={1}>


        <Card key={key} color="#ffffff" bg="#003459" m={10} maxW="md">
          <CardHeader>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={userName} src={maleAvatar[0]} size="md" />
                <Box>
                  <Heading size="sm">{user?.fullName}</Heading>
                  <Text>{user?.role}</Text>
                </Box>
              </Flex>
          </CardHeader>
          <CardBody>
            <Grid
              textAlign="justify"
              mt={5}
              templateColumns="repeat(2, 1fr)"
              gap={1}
              bg="#FFFFFF"
              color='black'
              p={2}
              borderRadius={5}
            >
              <GridItem colSpan={1}>
                <Text>Srs.</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text>{cotizacion.company}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text>Atencion a</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text>{cotizacion.name}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text>Fecha</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text>{cotizacion.date}</Text>
              </GridItem>
              {/* <GridItem colSpan={1}>{cotizacion.product}</GridItem> */}
            </Grid>
          </CardBody>
          <Image
            bg="white"
            p={2}
            m={5}
            borderRadius={10}
            objectFit="cover"
            src={imageCotizacion(cotizacion.org)}
            alt={cotizacion.org}
          />

          <CardFooter
            justify="space-around"
            flexWrap="wrap"
            color="black"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <ButtonGroup>
              <Button onClick={()=>downloadPDF(cotizacion.transactionId)} colorScheme="whatsapp" leftIcon={<PDFSvg />}>
                Descargar PDF
              </Button>
              <Spacer />
              <Button onClick={()=>deleteCotizacion(cotizacion.transactionId)} colorScheme="red" leftIcon={<BiShare />}>
                Delete
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        </GridItem>
        ))}
        </Grid>
    );
  }
  export function VerLast5Total() {
    const avatarUser = "https://bit.ly/sage-adebayo";
    const userName = "Segun Adebayo";
    const userRole = "Creator, Chakra UI";
    const cover = {
      myers: {
        image: myersImage,
        label: "Myers",
      },
      alfa: {
        image: AlfaImage,
        label: "Alfa y Omega",
      },
    };

    const imageCotizacion = (cotizacion: string) => {
      if (cotizacion === "Myers") {
        return myersImage;
      } else {
        return AlfaImage;
      }
    };
  const [user,setUser] = useState<User>()

  const token = localStorage.getItem("token");
  const [cotizaciones,setCotizaciones] = useState<CotizacionTotal[]>([])

    useEffect(() => {
      // const tokenLocal = localStorage.getItem("token");
      // if (tokenLocal) {
      //   setToken(tokenLocal)
      // }
      const config = {
        headers: {
          // "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      };
      axios
        .get(BASE_URL_TOTAL + "/GetLastFiveTotal", config)
        .then((res) => {
          setCotizaciones(res.data);
          // console.log(res.data)
          // console.log(cotizaciones[0].userId)
        })
        .catch((err) => {
          console.log(err);
        });

        axios.get("https://cotizacionesback.azurewebsites.net/Api/User/GetCurrentUserInfo",config)
    .then(res=>{
      console.log(res.data)
      setUser(res.data)
    })
    .catch(err=>console.log(err))
    }, [])

    const deleteCotizacion =(transactionId:number)=>
    {
      axios.delete(BASE_URL_TOTAL+"/DeleteCotizacionTotal/"+transactionId)
      .then(res=>{
        console.log(res.data)
        location.reload()
      }
        )
      .catch(err =>console.error(err))
    }

    const downloadPDF = (transactionId:number) =>
    {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "arraybuffer", // set the responseType to arraybuffer to receive the PDF file data
      };
      axios
        .get(BASE_URL_TOTAL + `CotizacionesTotal/downloadPDF/${transactionId}`, config)
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          const pdfUrl = URL.createObjectURL(pdfBlob);

          // Create a download link and simulate a click on it
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download = "Cotizacion.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return (
      <Flex>
        {cotizaciones.map((cotizacion,key) => (
        <Card key={key} color="#ffffff" bg="#003459" m={10} maxW="md">
          <CardHeader>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={userName} src={maleAvatar[0]} size="md" />
                <Box>
                  <Heading size="sm">{userName}</Heading>
                  <Text>{userRole}</Text>
                </Box>
              </Flex>
          </CardHeader>
          <CardBody>
            <Grid
              textAlign="justify"
              mt={5}
              templateColumns="repeat(2, 1fr)"
              gap={1}
            >
              <GridItem colSpan={1}>
                <Text>Srs.</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text>{cotizacion.company}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text>Atencion a</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text>{cotizacion.name}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text>Fecha</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text>{cotizacion.date}</Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Grid
                  textAlign="justify"
                  mt={5}
                  templateColumns="repeat(2, 1fr)"
                  gap={1}
                  bg='#FFFFFF'
                  p={2}
                  borderRadius={5}
                  color='black'
                >
                  <GridItem colSpan={1}>
                    <Text>Codigo</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text>{cotizacion.code}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text>Producto</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text>{cotizacion.product}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text>Cantidad</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text>{cotizacion.quantity}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text>Precio</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text>{cotizacion.price}</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text>Total</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text>{cotizacion.totalPrice}</Text>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </CardBody>
          <Image
            bg="white"
            p={2}
            m={5}
            borderRadius={10}
            objectFit="cover"
            src={imageCotizacion(cotizacion.org)}
            alt={cotizacion.org}
          />

          <CardFooter
            justify="space-around"
            flexWrap="wrap"
            color="black"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <ButtonGroup>
              {/* <Button onClick={()=>downloadPDF(cotizacion.transactionId)} colorScheme="whatsapp" leftIcon={<BiLike />}>
                Descargar PDF
              </Button> */}

                <Button onClick={()=>downloadPDF(cotizacion.transactionId)} colorScheme="whatsapp" leftIcon={<PDFSvg />}>
                    Descargar PDF
                </Button>

              <Spacer />
              <Button onClick={()=>deleteCotizacion(cotizacion.transactionId)} colorScheme="red" leftIcon={<BiShare />}>
                Delete
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        ))}
      </Flex>
    );
  }
  export default Last5;
