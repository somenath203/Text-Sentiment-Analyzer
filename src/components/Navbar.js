/* eslint-disable react/jsx-no-target-blank */
import { Box } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="pink.900" px="16" py="10" display="flex" alignItems="center" justifyContent="space-between">

      <Box fontFamily="sans-serif" letterSpacing="wider" className="text-md lg:text-5xl" fontSize={{ sm: '2xl', lg: '3xl' }} color="red.200">Text Sentiment Analyzer</Box>

      <a href="https://github.com/somenath203/Text-Sentiment-Analyzer" target="_blank">
        <Box className="text-3xl lg:text-5xl text-white" cursor="pointer"><i className="ri-github-fill"></i></Box>
      </a>

    </Box>
  )
};

export default Navbar;