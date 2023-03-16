import React, { useState } from 'react'
import { Button, useToast } from '@chakra-ui/react'

function ToastComponent({colorScheme,Label,Title,Description,Status,clicazo}:any) {
    const toast = useToast()


const handleClick = () => {
  toast({
    title: Title,
    description: Description,
    status: Status,
    duration: 5000,
    isClosable: true,
  });
  clicazo
}
    return (
      <Button
        onClick={handleClick}
        colorScheme={colorScheme} mr={3}
      >
        {Label}
      </Button>
      )
}

export default ToastComponent