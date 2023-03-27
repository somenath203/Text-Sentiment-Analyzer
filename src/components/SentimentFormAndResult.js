import { Box, Button, Input, Spinner, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from '@chakra-ui/react'
import { useState } from "react";
import { Configuration, OpenAIApi } from 'openai';

import OpenAIImg from './../assets/openai.png';


const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);


const SentimentFormAndResult = () => {

  const [inputText, setInputText] = useState();

  const [result, setResult] = useState();

  const [storeInputTextToShowInResultDiv, setStoreInputTextToShowInResultDiv] = useState();

  const [sendDataToAPI, setSendDataToAPI] = useState();

  const [dispResultDiv, setDisResultDiv] = useState(false);

  const toast = useToast();


  const onSubmitForm = async (e) => {

    e.preventDefault();

    setDisResultDiv(false);

    try {

      setSendDataToAPI(true);

      setStoreInputTextToShowInResultDiv(inputText);

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: 'Sentiment analysis of the following text:\n\n' + inputText + '',
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.8,
        presence_penalty: 0.0
      });

      setResult(response.data.choices[0].text);

      toast({
        title: 'Success',
        description: 'Sentiment analyzed successfully.',
        status: 'success',
        duration: 4000,
        isClosable: false
      });

      setSendDataToAPI(false);

      setDisResultDiv(true);

    } catch (error) {

      setSendDataToAPI(false);

      setDisResultDiv(false);

      toast({
        title: 'Failure',
        description: 'Failed to analyze sentiment. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: false
      });

    }


  }

  return (
    <Box className="min-h-screen" bg="pink.900" display="flex" justifyContent="center">

      <Box className="w-10/12 lg:w-3/6" mt="44">

        <form onSubmit={onSubmitForm} className='text-white'>

          <FormControl isRequired>
            <FormLabel className="text-white">Text</FormLabel>
            <Input
              type='text'
              placeholder="enter the text whose sentiment you want to analyze"
              onChange={(e) => setInputText(e.target.value)}
            />
          </FormControl>

          {sendDataToAPI ? <Button className="w-full lg:w-3/5" alignItems="center" justifyContent="center" bg="pink.400" _hover={{ bg: 'pink.500' }} disabled cursor="not-allowed" color="white" colorScheme='teal' type="submit" variant='solid' display="block" mx="auto" marginTop={4}>
            <Spinner />
          </Button> : <Button bg="pink.400" className="w-full lg:w-3/5" _hover={{ bg: 'pink.500' }} colorScheme='teal' type="submit" variant='solid' display="block" mx="auto" marginTop={4}>
            Analyze Sentiment
          </Button>}

        </form>

        {dispResultDiv && <Box className="w-full" bg="purple.800" boxShadow='2xl' marginTop={14} textAlign="center" p={8} borderRadius={8} display="flex" alignItems="center" justifyContent="center" flexDirection="column" gap={5}>
          <Box className="text-xl lg:text-2xl text-white text-center">Input Text: {storeInputTextToShowInResultDiv}</Box>
          <Box className="text-xl lg:text-2xl text-white text-center">Sentiment: {result}</Box>
        </Box>}

        <Box display="flex" justifyContent="center" alignItems="center" mt="20" gap={1} marginBottom="12">

          <img src={OpenAIImg} alt="open ai img" />

          <Box color="pink.100">Powered by OpenAI</Box>

        </Box>

      </Box>

    </Box>
  )
};

export default SentimentFormAndResult;