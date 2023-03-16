// import React from 'react'
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
  Card,
  Flex,
  Box,
  Icon,
} from "@chakra-ui/react";
import axios, { AxiosRequestConfig, ResponseType } from "axios";
import jwtDecode from "jwt-decode";
import React, { forwardRef, Fragment, useEffect, useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ShowCotizaciones() {
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

export default ShowCotizaciones