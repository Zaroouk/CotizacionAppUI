import { VStack,Image, Text,Heading } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import Error401 from '../assets/401 Error Unauthorized-amico.svg'
import Error404 from '../assets/404 error with portals-amico.svg'
import Error500 from '../assets/500 Internal Server Error-amico.svg'
import lost from '../assets/Working from anywhere-amico.svg'


function ErrorRoute() {
    // const BASE_URL = 'https://cotizacionesback.azurewebsites.net/Api/User/'
    const[error,setError] = useState(0)
    const config = {
        headers: {
        // "Access-Control-Allow-Origin": "*",
        //   Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      };
    //   useEffect(() => {
    //       axios.get(BASE_URL + 'GetUsers',config)
    //       .then(response => {
    //         console.log(response)
    //       })
    //       .catch(err => {
    //         console.log(err)
    //           setError(err.response.status)
    //       })
    //   }, [])


  if (error>0) {
    if (error === 404) {
        return <NotFoundError />
    }

    if (error === 401) {
        return <UnAuthenticatedError />
    }

    if (error === 500) {
        return <ServerError />
    }

    if (error === 418) {
        return <TeaPotError />
    }
  }

  return <div style={{height:'65vh'}}>Something went wrong</div>;
}
export function UnAuthenticatedError()
{
    return(
        <VStack>
            <Image boxSize="65vh" src={Error401} />
            <Heading>Wait a minute, who are you?</Heading>
            <Text>Seems that you don't have permission to access this page. please authenticate and try again.</Text>
            <Link to='/Login'>Login</Link>
        </VStack>
    )
}
export function NotFoundError()
{
    return(
        <VStack>
            <Image boxSize="65vh" src={Error404} />
            <Heading>Ooops! Looks that We Hit a barrier!</Heading>
            <Text>Let's go back home!</Text>
            <Link to='/'>Home</Link>
        </VStack>
    )
}
export function ServerError()
{
    return(
        <VStack>
            <Image boxSize='65vh' src={Error500} />
            <Heading>Ooops! Something went wrong!</Heading>
            <Text>Please contact your administrator or IT technitian. While we resolve this, you can go and grab a cup of coffee.</Text>
            <Link to='/'>Home</Link>
        </VStack>
    )
}
export function TeaPotError()
{
    return(
        <VStack>
            <Image boxSize="65vh" src={lost} />
            <Heading>I'm a 🫖</Heading>
            <Text>Lost in the woods</Text>
        </VStack>
    )
}

export default ErrorRoute