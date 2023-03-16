import { DeleteIcon } from "@chakra-ui/icons";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Grid,
  GridItem,
  Button,
  Heading,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import axios, { AxiosRequestConfig, ResponseType } from "axios";
import jwtDecode from "jwt-decode";
import React, { forwardRef, Fragment, useEffect, useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const token = localStorage.getItem("token");

const PDFSvg = () =>{
  return <Icon borderRadius={5} boxSize={7} viewBox="-5 15 40 10" color='red.500'>
  <path d="M25.6686 26.0962C25.1812 26.2401 24.4656 26.2563 23.6984 26.145C22.875 26.0256 22.0351 25.7739 21.2096 25.403C22.6817 25.1888 23.8237 25.2548 24.8005 25.6009C25.0319 25.6829 25.412 25.9021 25.6686 26.0962ZM17.4552 24.7459C17.3953 24.7622 17.3363 24.7776 17.2776 24.7939C16.8815 24.9017 16.4961 25.0069 16.1247 25.1005L15.6239 25.2275C14.6165 25.4824 13.5865 25.7428 12.5692 26.0529C12.9558 25.1206 13.315 24.178 13.6667 23.2564C13.9271 22.5742 14.193 21.8773 14.468 21.1894C14.6075 21.4198 14.7531 21.6503 14.9046 21.8814C15.5948 22.9326 16.4624 23.9045 17.4552 24.7459ZM14.8927 14.2326C14.958 15.383 14.7098 16.4897 14.3457 17.5514C13.8972 16.2386 13.6882 14.7889 14.2489 13.6185C14.3927 13.3185 14.5105 13.1581 14.5869 13.0744C14.7049 13.2566 14.8601 13.6642 14.8927 14.2326ZM9.63347 28.8054C9.38148 29.2562 9.12426 29.6782 8.86063 30.0767C8.22442 31.0355 7.18393 32.0621 6.64941 32.0621C6.59681 32.0621 6.53316 32.0536 6.44015 31.9554C6.38028 31.8926 6.37069 31.8476 6.37359 31.7862C6.39161 31.4337 6.85867 30.8059 7.53527 30.2238C8.14939 29.6957 8.84352 29.2262 9.63347 28.8054ZM27.3706 26.1461C27.2889 24.9719 25.3123 24.2186 25.2928 24.2116C24.5287 23.9407 23.6986 23.8091 22.7552 23.8091C21.7453 23.8091 20.6565 23.9552 19.2582 24.2819C18.014 23.3999 16.9392 22.2957 16.1362 21.0733C15.7816 20.5332 15.4628 19.9941 15.1849 19.4675C15.8633 17.8454 16.4742 16.1013 16.3632 14.1479C16.2737 12.5816 15.5674 11.5295 14.6069 11.5295C13.948 11.5295 13.3807 12.0175 12.9194 12.9813C12.0965 14.6987 12.3128 16.8962 13.562 19.5184C13.1121 20.5751 12.6941 21.6706 12.2895 22.7311C11.7861 24.0498 11.2674 25.4103 10.6828 26.7045C9.04334 27.3532 7.69648 28.1399 6.57402 29.1057C5.8387 29.7373 4.95223 30.7028 4.90163 31.7107C4.87693 32.1854 5.03969 32.6207 5.37044 32.9695C5.72183 33.3398 6.16329 33.5348 6.6487 33.5354C8.25189 33.5354 9.79489 31.3327 10.0876 30.8909C10.6767 30.0029 11.2281 29.0124 11.7684 27.8699C13.1292 27.3781 14.5794 27.011 15.985 26.6562L16.4884 26.5283C16.8668 26.4321 17.2601 26.3257 17.6635 26.2153C18.0904 26.0999 18.5296 25.9802 18.976 25.8665C20.4193 26.7844 21.9714 27.3831 23.4851 27.6028C24.7601 27.7883 25.8924 27.6807 26.6589 27.2811C27.3486 26.9219 27.3866 26.3676 27.3706 26.1461ZM30.4755 36.2428C30.4755 38.3932 28.5802 38.5258 28.1978 38.5301H3.74486C1.60224 38.5301 1.47322 36.6218 1.46913 36.2428L1.46884 3.75642C1.46884 1.6039 3.36763 1.4734 3.74457 1.46908H20.263L20.2718 1.4778V7.92396C20.2718 9.21763 21.0539 11.6669 24.0158 11.6669H30.4203L30.4753 11.7218L30.4755 36.2428ZM28.9572 10.1976H24.0169C21.8749 10.1976 21.7453 8.29969 21.7424 7.92417V2.95307L28.9572 10.1976ZM31.9447 36.2428V11.1157L21.7424 0.871022V0.823357H21.6936L20.8742 0H3.74491C2.44954 0 0 0.785336 0 3.75711V36.2435C0 37.5427 0.782956 40 3.74491 40H28.2001C29.4952 39.9997 31.9447 39.2143 31.9447 36.2428Z" fill="#EB5757"/>
</Icon>
}

const BASE_URL = "https://cotizacionapi.azurewebsites.net/Api/";

interface DecodedToken {
  userId: String;
  role: String;
  nbf: number;
  exp: number;
  iat: number;
}

function CreateCotizaciones() {
  return (
    <VStack bg="#ffff" borderRadius={10}>
      {/* <Total /> */}
      {/* <Oferta /> */}
    </VStack>
  );
}
export function Oferta() {
  const [value, setValue] = React.useState("1");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  // const [token, setToken] = useState("");


  // useEffect(() => {
  //   const tokenLocal = localStorage.getItem("token");
  //   if (tokenLocal) {
  //     setToken(tokenLocal);
  //   }
  // }, []);

  const dateStringHandler = () => {
    const dateString =
      selectedDate.getDate() +
      " de " +
      monthNames[selectedDate.getMonth()] +
      " de " +
      selectedDate.getFullYear();
    return dateString;
  };
  const dateString: string = dateStringHandler();

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref) => (
    <Button
      w="full"
      colorScheme="whatsapp"
      className="example-custom-input"
      onClick={onClick}
    >
      {value ? value : "I have been cleared!"}
    </Button>
  ));

  const [items, setItems] = useState<Item[]>([
    { codigo: "", producto: "", cantidad: "", precio: "", oferta: "" },
  ]);

  type Item = {
    codigo: string;
    producto: string;
    cantidad: string;
    precio: string;
    oferta: string;
  };

  const handleItemChange = (
    index: number,
    field: keyof Item,
    newValue: string
  ) => {
    const newItems = [...items];
    newItems[index][field] = newValue;
    setItems(newItems);
  };
  const addNewItem = () => {
    const newItems = [...items];
    newItems.push({
      codigo: "",
      producto: "",
      cantidad: "",
      precio: "",
      oferta: "",
    });
    setItems(newItems);
  };

  const price = new Array();
  const oferta = new Array();
  const code = new Array();
  const quantity = new Array();
  const product = new Array();

  const totalCotizacion = new Array();

  for (let j = 0; j < items.length; j++) {
    price.push(items[j].precio);
    oferta.push(items[j].oferta);
    code.push(items[j].codigo);
    quantity.push(items[j].cantidad);
    product.push(items[j].producto);

    const a = parseFloat(items[j].oferta);
    totalCotizacion.push(a);
  }

  const jprice = price.join("~");
  const joferta = oferta.join("~");
  const jcode = code.join("~");
  const jquantity = quantity.join("~");
  const jproduct = product.join("~");

  const handleTotalCotizacion = () => {
    let retorno = 0;
    for (let i = 0; i < oferta.length; i++) {
      const num = parseFloat(oferta[i]);
      retorno = retorno + num;
    }
    return parseFloat(retorno.toFixed(2));
  };

  const handleDeleteItem = (index: any) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [deliveryEta, setDeliveryEta] = useState("");
  const [offerDuration, setOfferDuration] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState("");
  const [cotizacionIsCreated, setCotizacionIsCreated] = useState(false);

  const config = {
    headers: {
      // "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const [userId,setUserId] = useState()

  const handleClickSubmit = () => {
    // const decodedToken = jwtDecode(token) as DecodedToken;
    // const role = decodedToken.role.toString();

    axios.get("https://cotizacionapi.azurewebsites.net/Api/User/GetCurrentUserInfo",config)
    .then(res=>{
      setUserId(res.data.userId)
      console.log(res.data)
    })
    .catch(err=>console.log(err))


    const data = {
      userId: userId,
      company: company,
      name: name,
      date: dateString,
      quantity: jquantity,
      price: jprice,
      code: jcode,
      product: jproduct,
      offPrice: joferta,
      deliveryETA: deliveryEta,
      offerDuration: offerDuration,
      paymentDetails: paymentDetails,
      org: value,
    };

    axios
      .post(BASE_URL + "CotizacionesOferta/Create", data, config)
      .then((res) => {
        console.log(res);
        setCotizacionIsCreated(true);
        console.log(dateString);
      })
      .catch((err) => console.log(err));
  };
  const handlePDF = () => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "arraybuffer", // set the responseType to arraybuffer to receive the PDF file data
    };
    axios
      .get(BASE_URL + "CotizacionesOferta/GetLast", config)
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
  };

  return (
      <Grid
        py={10}
        m={10}
        // w="full"
        templateRows="repeat(1, 1fr)"
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        gap={4}
        bg="#ffff"
        h="auto"
        borderRadius={10}
      >
      <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>

        <Grid
        my={2}
        w="full"
        templateRows="repeat(1, 1fr)"
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        gap={4}
        bg="#003459"
        h="auto"
        py={5}
        borderRadius={10}
      >
        <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
          <VStack>
            <RadioGroup my={10} onChange={setValue} value={value}>
              <HStack p={2} borderRadius={5} bg='#FFFFFF'>
                <Radio colorScheme='red' value="Total">Myers</Radio>
                <Radio colorScheme='blue' value="Oferta">Alfa y Omega</Radio>
              </HStack>
            </RadioGroup>
          </VStack>
        </GridItem>

        <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
          <FormControl>
            <FormLabel color="#FFFFFF">Sres.</FormLabel>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              bg="#FFFFFF"
            />
          </FormControl>
        </GridItem>

        <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
          <FormControl>
            <FormLabel color="#FFFFFF">Atencion</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} bg="#FFFFFF" />
          </FormControl>
        </GridItem>

        <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
          <FormControl>
            <FormLabel color="#FFFFFF">Fecha</FormLabel>
            <HStack>
              <DatePicker
                showPopperArrow={false}
                customInput={<ExampleCustomInput />}
                closeOnScroll={true}
                todayButton="Fecha de Hoy"
                isClearable
                selected={selectedDate}
                onChange={handleDateChange}
              />
            </HStack>
          </FormControl>
        </GridItem>
        </Grid>
        </GridItem>
        <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
        {items.map((item, index) => (
        <Grid key={index}
            my={2}
            w="full"
            templateRows="repeat(1, 1fr)"
            templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
            gap={4}
            bg="#003459"
            h="auto"
            py={5}
            borderRadius={10}
          >
          <Fragment key={index}>
            <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
              <FormControl>
                <FormLabel color="#FFFFFF">Codigo</FormLabel>
                <Input
                  value={item.codigo}
                  onChange={(event) =>
                    handleItemChange(index, "codigo", event.target.value)
                  }
                  bg="#FFFFFF"
                />
              </FormControl>
            </GridItem>

            <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
              <FormControl>
                <FormLabel color="#FFFFFF">Producto/Servicio</FormLabel>
                <Input
                  value={item.producto}
                  onChange={(event) =>
                    handleItemChange(index, "producto", event.target.value)
                  }
                  bg="#FFFFFF"
                  maxLength={41}
                />
              </FormControl>
            </GridItem>

            <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
              <FormControl>
                <FormLabel color="#FFFFFF">Cantidad</FormLabel>
                <Input
                  value={item.cantidad}
                  onChange={(event) =>
                    handleItemChange(index, "cantidad", event.target.value)
                  }
                  bg="#FFFFFF"
                  type="number"
                />
              </FormControl>
            </GridItem>

            <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
              <FormControl>
                <FormLabel color="#FFFFFF">Precio</FormLabel>
                <InputGroup>
                  <InputLeftAddon bg="#FFFFFF" children="$" />
                  <Input
                    value={item.precio}
                    onChange={(event) =>
                      handleItemChange(index, "precio", event.target.value)
                    }
                    type="number"
                    bg="#FFFFFF"
                  />
                </InputGroup>
              </FormControl>
            </GridItem>

            <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
              <FormControl>
                <FormLabel color="#FFFFFF">Precio Oferta</FormLabel>
                <InputGroup>
                  <InputLeftAddon bg="#FFFFFF" children="$" />
                <Input
                  onChange={(event) =>
                    handleItemChange(index, "oferta", event.target.value)
                  }
                  type="number"
                  value={item.oferta}
                  bg="#FFFFFF"
                />
                </InputGroup>
              </FormControl>
            </GridItem>
            <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
              <FormLabel visibility="hidden">a</FormLabel>
              <IconButton
                w="full"
                icon={<DeleteIcon />}
                onClick={() => handleDeleteItem(index)}
                aria-label="Delete item"

                colorScheme="red"
              />
            </GridItem>
          </Fragment>
        </Grid>
        ))}
        </GridItem>
        <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
        <Grid
        my={2}
        w="full"
        templateRows="repeat(1, 1fr)"
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        gap={4}
        bg="#003459"
        h="auto"
        py={5}
        borderRadius={10}
      >
        <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
          <Button colorScheme="whatsapp" w="full" onClick={addNewItem}>
            Agregar
          </Button>
        </GridItem>
        <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
          {/* <FormLabel>Total</FormLabel>
          <Heading color="#FFFFFF">
            ${handleTotalCotizacion() ? handleTotalCotizacion() : 0}
          </Heading> */}
          <FormControl>
            <FormLabel color='#FFFFFF'>Total</FormLabel>
            <Heading textAlign='left' color='#FFFFFF'>${handleTotalCotizacion() ? handleTotalCotizacion().toFixed(2) : 0}</Heading>
          </FormControl>
        </GridItem>

        <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
          <FormControl>
            <FormLabel color="#FFFFFF">Tiempo de Entrega</FormLabel>
            <Input
              value={deliveryEta}
              onChange={(e) => setDeliveryEta(e.target.value)}
              bg="#FFFFFF"
            />
          </FormControl>
        </GridItem>

        <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
          <FormControl>
            <FormLabel color="#FFFFFF">Validez de la Oferta</FormLabel>
            <InputGroup>
              <Input
                value={offerDuration}
                onChange={(e) => setOfferDuration(parseInt(e.target.value))}
                type="number"
                bg="#FFFFFF"
              />
              <InputRightAddon children="Dias" />
            </InputGroup>
          </FormControl>
        </GridItem>

        <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
          <FormControl>
            <FormLabel color="#FFFFFF">Forma de Pago</FormLabel>
            <Input
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
              bg="#FFFFFF"
            />
          </FormControl>
        </GridItem>
        <GridItem mx={10} mb={10} colSpan={{ sm: 2, md: 4 }}>
          <Button onClick={handleClickSubmit} colorScheme="purple" w="full">
            Submit
          </Button>
        </GridItem>
        <GridItem mx={10} mb={10} colSpan={{ sm: 2, md: 4 }}>
          {cotizacionIsCreated ? (
            <Button onClick={handlePDF} colorScheme="purple" w="full" leftIcon={<PDFSvg />}>
              Get PDF
            </Button>
          ) : (
            <Button hidden></Button>
          )}
        </GridItem>
        </Grid></GridItem>
      </Grid>
  );
}
export function Total() {
  const [value, setValue] = React.useState("1");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  const dateStringHandler = () => {
    const dateString =
      selectedDate.getDate() +
      " de " +
      monthNames[selectedDate.getMonth()] +
      " de " +
      selectedDate.getFullYear();
    return dateString;
  };
  const dateString:string = dateStringHandler();

  const [fecha, setFecha] = React.useState("");
  // const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [deliveryETA, setDeliveryETA] = useState("");
  const [offerDuration, setOfferDuration] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState("");

  // let token = ""

  const token = localStorage.getItem("token")

  // useEffect(() => {
  //   const tokenLocal = localStorage.getItem("token");
  //   if (tokenLocal) {
  //     setToken(tokenLocal ? tokenLocal : "");
  //   }
  // }, []);

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref) => (
    <Button w="full" className="example-custom-input" onClick={onClick} colorScheme='whatsapp'>
      {value ? value : "I have been cleared!"}
    </Button>
  ));

  const [items, setItems] = useState<Item[]>([
    { codigo: "", producto: "", cantidad: "", precio: "", total: "" },
  ]);

  type Item = {
    codigo: string;
    producto: string;
    cantidad: string;
    precio: string;
    total: string;
  };

  const handleItemChange = (
    index: number,
    field: keyof Item,
    newValue: string
  ) => {
    const newItems = [...items];
    newItems[index][field] = newValue;
    if (field === "cantidad" || field === "precio") {
      const cantidad = parseFloat(newItems[index].cantidad);
      const precio = parseFloat(newItems[index].precio);
      const total = cantidad * precio;
      newItems[index].total = total.toFixed(2);
    }
    setItems(newItems);
  };
  const addNewItem = () => {
    const newItems = [...items];
    newItems.push({
      codigo: "",
      producto: "",
      cantidad: "",
      precio: "",
      total: "",
    });
    setItems(newItems);
  };
  const [cotizacionIsCreated, setCotizacionIsCreated] = useState(false);

  const handleTotal = () => {
    const precios = items.map((item) => parseFloat(item.precio));
    const cantidades = items.map((item) => parseFloat(item.cantidad));

    const totales = cantidades.map((cantidad, i) => cantidad * precios[i]);
    let ultima = 0;
    for (let i = 0; i < cantidades.length; i++) {
      ultima = ultima + totales[i];
    }
    return parseFloat(ultima.toFixed(2))
  };

  const price = new Array();
  const total = new Array();
  const code = new Array();
  const quantity = new Array();
  const product = new Array();

  for (let j = 0; j < items.length; j++) {
    price.push(items[j].precio);
    total.push(items[j].total);
    code.push(items[j].codigo);
    quantity.push(items[j].cantidad);
    product.push(items[j].producto);
  }

  const jprice = price.join("~");
  const jtotal = total.join("~");
  const jcode = code.join("~");
  const jquantity = quantity.join("~");
  const jproduct = product.join("~");

  const handleDeleteItem = (index: any) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleClickSubmit = () => {
    const config = {
      headers: {
        // "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    //usar la http para obtener user info
    // const decodedToken = jwtDecode(token) as DecodedToken;
    // const role = decodedToken.role.toString();
    const userId = localStorage.getItem("userId");

    const data = {
      userId: userId,
      company: company,
      name: name,
      date: dateString,
      quantity: jquantity,
      price: jprice,
      code: jcode,
      product: jproduct,
      offPrice: jtotal,
      deliveryETA: deliveryETA,
      offerDuration: offerDuration,
      paymentDetails: paymentDetails,
      org: value,
    };

    axios
      .post(BASE_URL + "CotizacionesTotal/Create", data, config)
      .then((res) => {
        console.log(res);
        setCotizacionIsCreated(true);
      })
      .catch((err) => console.log(err));
  };

  const handlePDF = () => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      responseType: "arraybuffer", // set the responseType to arraybuffer to receive the PDF file data
    };
    axios
      .get(BASE_URL + "CotizacionesTotal/GetLast", config)
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
  };

  const multiplyData =(firstNumber:any,secondNumber:any)=>
  {
    const number1 = parseFloat(firstNumber);
    const number2 = parseFloat(secondNumber);
    const result = number1 * number2;
    return result
  }

  return (
    <Grid
      py={10}
      m={10}
      templateRows="repeat(1, 1fr)"
      templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
      gap={4}
      bg="#ffff"
      h="auto"
      borderRadius={10}
    >
      <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
      <Grid
        my={2}
        w="full"
        templateRows="repeat(1, 1fr)"
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        gap={4}
        bg="#003459"
        h="auto"
        py={5}
        borderRadius={10}
      >
      <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
        <VStack>
          <RadioGroup my={10} onChange={setValue} value={value}>
            <HStack p={2} borderRadius={5} bg='#FFFFFF'>
              <Radio colorScheme='red' value="Total">Myers</Radio>
              <Radio colorScheme='blue' value="Oferta">Alfa y Omega</Radio>
            </HStack>
          </RadioGroup>
        </VStack>
      </GridItem>
      <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
        <FormControl>
          <FormLabel color='#FFFFFF'>Sres.</FormLabel>
          <Input bg="#FFFFFF" borderColor="#FFFFFF" value={company} onChange={(e) => setCompany(e.target.value)} />
        </FormControl>
      </GridItem>

      <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
        <FormControl>
          <FormLabel color='#FFFFFF'>Atencion</FormLabel>
          <Input bg="#FFFFFF" borderColor="#FFFFFF" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
      </GridItem>

      <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
        <FormControl>
          <FormLabel color='#FFFFFF'>Fecha</FormLabel>
          <HStack>
            <DatePicker
              showPopperArrow={false}
              customInput={<ExampleCustomInput />}
              closeOnScroll={true}
              todayButton="Fecha de Hoy"
              isClearable
              selected={selectedDate}
              onChange={handleDateChange}
            />
          </HStack>
        </FormControl>

      </GridItem>
        </Grid>
      </GridItem>
      <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
        {items.map((item, index) => (
          <Grid
          key={index}
            my={2}
            w="full"
            templateRows="repeat(1, 1fr)"
            templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
            gap={4}
            bg="#003459"
            h="auto"
            py={5}
            borderRadius={10}
          >
            <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
              <FormControl>
                <FormLabel color="#FFFFFF">Codigo</FormLabel>
                <Input
                  borderColor="#FFFFFF"
                  value={item.codigo}
                  onChange={(event) =>
                    handleItemChange(index, "codigo", event.target.value)
                  }
                  bg="#FFFFFF"
                />
              </FormControl>
            </GridItem>

            <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
              <FormControl>
                <FormLabel color="#FFFFFF">Producto/Servicio</FormLabel>
                <Input
                  bg="#FFFFFF"
                  borderColor="#FFFFFF"
                  value={item.producto}
                  onChange={(event) =>
                    handleItemChange(index, "producto", event.target.value)
                  }
                  maxLength={41}
                />
              </FormControl>
            </GridItem>

            <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
              <FormControl>
                <FormLabel color="#FFFFFF">Cantidad</FormLabel>
                <Input
                  bg="#FFFFFF"
                  borderColor="#FFFFFF"
                  value={item.cantidad}
                  onChange={(event) =>
                    handleItemChange(index, "cantidad", event.target.value)
                  }
                  type="number"
                />
              </FormControl>
            </GridItem>

            <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
              <FormControl>
                <FormLabel color="#FFFFFF">Precio</FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    borderColor="#FFFFFF"
                    bg="#FFFFFF"
                    children="$"
                  />
                  <Input
                    borderColor="#FFFFFF"
                    value={item.precio}
                    onChange={(event) =>
                      handleItemChange(index, "precio", event.target.value)
                    }
                    type="number"
                    bg="#FFFFFF"
                  />
                </InputGroup>
              </FormControl>
            </GridItem>

            <GridItem mx={10} colSpan={{ sm: 2, md: 3 }}>
              <FormControl>
                <FormLabel color="#FFFFFF">Total Producto</FormLabel>
                <Heading textAlign='left' color="#FFFFFF">
                  {/* ${handleTotal() ? handleTotal() : 0} */}
                  ${multiplyData(item.precio, item.cantidad) ? multiplyData(item.precio, item.cantidad).toFixed(2):0}
                </Heading>
              </FormControl>
            </GridItem>

            <GridItem mx={10} colSpan={{ sm: 2, md: 1 }}>
              <FormLabel visibility={"hidden"}>a</FormLabel>
              <IconButton
                w="full"
                icon={<DeleteIcon />}
                onClick={() => handleDeleteItem(index)}
                aria-label="Delete item"
                colorScheme="red"
              />
            </GridItem>
          </Grid>
        ))}
      </GridItem>
      <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
      <Grid
        my={2}
        w="full"
        templateRows="repeat(1, 1fr)"
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        gap={4}
        bg="#003459"
        h="auto"
        py={5}
        borderRadius={10}
      >
        <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
          <Button w="full" onClick={addNewItem} colorScheme="whatsapp">
            Agregar mas
          </Button>
        </GridItem>

        <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
          <FormControl>
            <FormLabel color='#FFFFFF'>Total</FormLabel>
            <Heading textAlign='left' color='#FFFFFF'>${handleTotal() ? handleTotal().toFixed(2) : 0}</Heading>
          </FormControl>
        </GridItem>

        <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
          <FormControl>
            <FormLabel color='#FFFFFF'>Tiempo de Entrega</FormLabel>
            <Input
              value={deliveryETA}
              onChange={(e) => setDeliveryETA(e.target.value)}
              bg="#FFFFFF"
            />
          </FormControl>
        </GridItem>

        <GridItem mx={10} colSpan={{ sm: 2, md: 2 }}>
          <FormControl>
            <FormLabel color='#FFFFFF'>Validez de la Oferta</FormLabel>
            <InputGroup>
              <Input
                value={offerDuration}
                onChange={(e) => setOfferDuration(parseInt(e.target.value))}
                type="number"
                bg="#FFFFFF"
              />
              <InputRightAddon bg='#FFFFFF' children="Dias" />
            </InputGroup>
          </FormControl>
        </GridItem>

        <GridItem mx={10} colSpan={{ sm: 2, md: 4 }}>
          <FormControl>
            <FormLabel color='#FFFFFF'>Forma de Pago</FormLabel>
            <Input
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
              bg="#FFFFFF"
            />
          </FormControl>
        </GridItem>
        <GridItem mx={10} mb={10} colSpan={{ sm: 2, md: 4 }}>
          <Button w="full" onClick={handleClickSubmit} colorScheme="purple">
            Procesar
          </Button>
        </GridItem>
        <GridItem>
          {cotizacionIsCreated ? (
            <GridItem mx={10} mb={10} colSpan={{ sm: 2, md: 4 }}>
              <Button onClick={handlePDF} colorScheme="purple" w="full" leftIcon={<PDFSvg />}>
                Descargar PDF
              </Button>
            </GridItem>
          ) : (
            <GridItem hidden mx={10} mb={10} colSpan={{ sm: 2, md: 4 }}>
              <Button
                onClick={() => console.log(selectedDate)}
                colorScheme="purple"
              >
                Submit
              </Button>
            </GridItem>
          )}
        </GridItem>
      </Grid>
      </GridItem>
    </Grid>
  );
}

export default CreateCotizaciones;
