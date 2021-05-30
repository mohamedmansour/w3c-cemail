import React, { useState } from 'react';
import { fromString, toString } from 'uint8arrays';
import {
  Box,
  Button,
  Text,
  Input,
  Heading,
  HStack,
  Flex,
  Spacer,
  Code,
  VStack,
  Alert,
  AlertIcon,
  CloseButton,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { randomBytes } from '@stablelib/random';
import { AuthState } from 'contexts/State';
import { CgLock } from 'react-icons/cg';
import { LogoIcon } from 'components/branding/Logo';

type AuthenticateProps = {
  authenticate: (seed: Uint8Array) => void;
  state: AuthState;
};

function AuthenticateScreen(props: AuthenticateProps) {
  const [nav, setNav] = useState<'default' | 'login' | 'create'>('default');
  const [seed, setSeed] = useState<string>();
  const [error, setError] = useState<string>();
  const { authenticate, state } = props;
  const isLoading = state.status === 'loading';

  if (state.status === 'done') {
    return (
      <Box>
        <Text>Authenticated with ID {state.status}</Text>
        <Button onClick={() => {}}>Log out</Button>
      </Box>
    );
  }

  const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(e.target.value);
  };

  const handleCreateAccount = () => {
    setSeed(toString(randomBytes(32), 'base16'));
    setNav('create');
  };

  const handleCopySeed = async () => {
    await navigator.clipboard.writeText(seed || '');
  };

  const handleLogin = () => {
    if (seed) {
      try {
        authenticate(fromString(seed, 'base16'));
      } catch (e) {
        setError('Seed should be base16-encoded string of 32 bytes length.');
      }
    }
  };

  return (
    <Box>
      <Flex
        align="center"
        justify="space-between"
        padding="0.5rem"
        bg="whiteAlpha.100"
        color="black"
        boxShadow="md"
      >
        <HStack cursor="pointer" onClick={() => setNav('default')}>
          <LogoIcon fontSize={24} color="#8E54A2" />
          <Text fontSize={20}>cemail</Text>
        </HStack>
        <Spacer />
        <Button
          disabled={seed === '' || isLoading}
          onClick={() => setNav('login')}
          variant="contained"
        >
          Login
        </Button>
        <Button
          disabled={isLoading}
          colorScheme="gray"
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
      </Flex>
      <Flex
        padding={4}
        align="center"
        textAlign="center"
        justifyContent="center"
      >
        {nav === 'default' && (
          <VStack align="center" w="940px" gridGap={10}>
            <VStack gridGap={4}>
              <LogoIcon fontSize={200} color="#8E54A2" />
              <Text>
                Welcome to the first ever Decentralized Email Service!
              </Text>
            </VStack>
            <HStack margin={10}>
              <VStack flex={1}>
                <Heading size="sm">Decentralized</Heading>
                <Text>
                  There is no central server relaying messages. Messages are sent Peer-to-Peer with data stored on IPFS.
                </Text>
                <svg
                  width="203"
                  height="218"
                  viewBox="0 0 203 218"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M92.1 103.6C88.4 101.9 85.2 99.3001 82.7 96.2001C82.4 96.4001 82.1 96.6001 81.9 96.7001C78.2 99.0001 74.2 100.8 69.9 101.9C66.2 102.9 62.3 103.4 58.3 103.4C54.3 103.4 50.4 102.9 46.7 101.9C45.7 103.8 45.1 106 45.1 108.3C45.1 110.9 45.9 113.4 47.2 115.4C50.8 116.1 54.5 116.5 58.4 116.5C62.3 116.5 65.9 116.1 69.6 115.4C74.9 114.4 80 112.6 84.7 110.2C88 108.5 91.1 106.5 94 104.2C93.2 104.1 92.7 103.8 92.1 103.6Z"
                    fill="#DC7C32"
                  />
                  <path
                    d="M69.4 115.5C67 119.2 62.9 121.6 58.2 121.6C53.5 121.6 49.4 119.2 47 115.5C45.7 113.4 44.9 111 44.9 108.4C44.9 106.1 45.5 103.9 46.5 102C48.8 97.9 53.1 95.1 58.1 95.1C63.1 95.1 67.4 97.9 69.7 102C74 100.8 78 99.1 81.7 96.8C77.4 88.1 68.4 82.1 58.1 82.1C47.8 82.1 38.8 88.1 34.5 96.8C32.8 100.3 31.8 104.3 31.8 108.4C31.8 109 31.8 109.7 31.9 110.3C32.7 121.7 40.8 131.1 51.6 133.9V179H38.3C34.7 179 31.8 181.9 31.8 185.5C31.8 189.1 34.7 192 38.3 192H51.6V204.1H38.3C34.7 204.1 31.8 207 31.8 210.6C31.8 214.2 34.7 217.1 38.3 217.1H58.1C61.7 217.1 64.6 214.2 64.6 210.6V133.8C75.4 131 83.5 121.6 84.3 110.2C79.8 112.7 74.7 114.5 69.4 115.5Z"
                    fill="#3D91CE"
                  />
                  <path
                    d="M200.3 118.1C199.8 117.7 199.3 117.3 198.7 117L129.1 84.5001C130 79.9001 129.6 75.1001 128 70.6001C125.8 64.6001 121.6 59.7001 116.1 56.6001C116.1 57.3001 116.1 57.9001 116.1 58.6001C116.1 63.4001 115.5 68.0001 114.4 72.5001C114.9 73.3001 115.3 74.2001 115.7 75.1001C116.9 78.4001 116.8 82.0001 115.3 85.2001C113.8 88.4001 111.1 90.8001 107.8 92.1001C106.9 92.4001 105.9 92.7 105 92.8C102.5 93.1 100 92.7001 97.7 91.7001C95.6 90.7001 93.9 89.3001 92.6 87.5001C91.9 86.5001 91.3 85.4001 90.9 84.2001C89.7 80.9001 89.8 77.3001 91.3 74.1001C92.8 70.9001 95.5 68.5001 98.8 67.2001C100 66.8001 101.2 66.5001 102.4 66.4001C102.8 63.9001 103.1 61.3001 103.1 58.6001C103.1 56.8001 103 55.0001 102.8 53.2001C99.9 53.3001 97.1 53.8 94.3 54.8C87.7 57.2 82.4 62.0001 79.4 68.4001C76.4 74.8001 76.1 81.9001 78.5 88.5001C79.5 91.3001 80.9 93.8001 82.7 96.0001C85.2 99.1001 88.4 101.6 92.1 103.4C92.7 103.7 93.3 103.9 93.8 104.1C96.8 105.3 100 105.9 103.2 105.9C106.2 105.9 109.3 105.4 112.2 104.3C116.7 102.7 120.6 99.9 123.6 96.3L164.5 115.4L158.9 127.4C157.4 130.7 158.8 134.6 162.1 136.1C163 136.5 163.9 136.7 164.9 136.7C167.4 136.7 169.7 135.3 170.8 132.9L176.4 120.9L187.3 126L181.7 138C180.2 141.3 181.6 145.2 184.9 146.7C185.8 147.1 186.7 147.3 187.7 147.3C190.2 147.3 192.5 145.9 193.6 143.5L202 125.6C203.1 123.1 202.4 120 200.3 118.1Z"
                    fill="#3D91CE"
                  />
                  <path
                    d="M116 56.7001C114.9 25.7001 89.4 0.800049 58.2 0.800049C26.3 0.800049 0.299988 26.8001 0.299988 58.7001C0.299988 81.2001 13.2 100.7 31.9 110.3C31.9 109.7 31.8 109 31.8 108.4C31.8 104.2 32.8 100.3 34.5 96.8C21.8 88.9 13.3 74.8 13.3 58.8C13.3 34.1 33.4 14 58.1 14C81 14 99.9 31.3 102.6 53.4C102.8 55.2 102.9 56.9 102.9 58.8C102.9 61.4 102.7 64.0001 102.2 66.6001C100.8 74.5001 97.3 81.7001 92.4 87.6001C93.7 89.4001 95.4 90.8 97.5 91.8C99.8 92.9 102.3 93.3 104.8 92.9C109.2 86.9 112.4 80.1001 114.3 72.6001C115.4 68.2001 116 63.5001 116 58.7001C116.1 58.1001 116.1 57.4001 116 56.7001Z"
                    fill="#DC7C32"
                  />
                  <path
                    d="M60.9 173.1C60.2 173.1 59.6 172.5 59.6 171.8V144.9C59.6 144.2 60.2 143.6 60.9 143.6C61.6 143.6 62.2 144.2 62.2 144.9V171.8C62.3 172.5 61.7 173.1 60.9 173.1Z"
                    fill="#95CDF0"
                  />
                  <path
                    d="M60.9 187.8C60.2 187.8 59.6 187.2 59.6 186.5V180.8C59.6 180.1 60.2 179.5 60.9 179.5C61.6 179.5 62.2 180.1 62.2 180.8V186.5C62.3 187.2 61.7 187.8 60.9 187.8Z"
                    fill="#95CDF0"
                  />
                  <path
                    d="M165.5 107.2C165.3 107.2 165.1 107.2 164.9 107.1L140.5 95.7001C139.8 95.4001 139.5 94.6001 139.8 93.9001C140.1 93.2001 140.9 92.9001 141.6 93.2001L166 104.6C166.7 104.9 167 105.7 166.7 106.4C166.5 106.9 166 107.2 165.5 107.2Z"
                    fill="#95CDF0"
                  />
                  <path
                    d="M178.9 113.4C178.7 113.4 178.5 113.4 178.3 113.3L173.1 110.9C172.4 110.6 172.1 109.8 172.4 109.1C172.7 108.4 173.5 108.1 174.2 108.4L179.4 110.8C180.1 111.1 180.4 111.9 180.1 112.6C179.9 113.2 179.4 113.4 178.9 113.4Z"
                    fill="#95CDF0"
                  />
                </svg>
              </VStack>
              <VStack flex={1}>
                <Heading size="sm">Trustless</Heading>
                <Text>Our identity system is built on Decentralized Identifiers (DID's) https://w3c.github.io/did-core/. You own your own idenity, not an Identity Provider.</Text>
                <svg
                  width="157"
                  height="217"
                  viewBox="0 0 157 217"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M109.34 127.66L94.2715 136.36L104.772 154.546L119.84 145.846L109.34 127.66Z"
                    fill="#FFCF62"
                  />
                  <path
                    d="M109.384 127.636L104.015 130.736L114.515 148.922L119.884 145.822L109.384 127.636Z"
                    fill="#CB9937"
                  />
                  <path
                    d="M131.4 210.5L103.2 161.7C101.7 159.1 102.6 155.9 105.2 154.4L119.6 146.1C122.2 144.6 125.4 145.5 126.9 148.1L155.1 196.9C158.1 202.2 156.3 208.9 151.1 211.9L146.5 214.6C141.1 217.6 134.4 215.7 131.4 210.5Z"
                    fill="#16ACC6"
                  />
                  <path
                    d="M119.6 146.1L115.4 148.5C116.5 147.9 118.5 149.5 120 152L148.2 200.8C151.2 206.1 151.9 211.3 149.8 212.6L151.2 211.8C156.5 208.8 158.3 202 155.2 196.8L126.9 148C125.4 145.5 122.1 144.6 119.6 146.1Z"
                    fill="#108491"
                  />
                  <path
                    d="M109.7 158.6C108.6 159.2 108.3 160.6 108.9 161.7L132.3 202.3C132.9 203.4 134.3 203.7 135.4 203.1C136.5 202.5 136.8 201.1 136.2 200L112.8 159.4C112.2 158.3 110.8 158 109.7 158.6Z"
                    fill="#89D3DD"
                  />
                  <path
                    d="M58 56.1001C34.1 69.9001 25.9 100.5 39.7 124.4C53.5 148.3 84.1 156.5 108 142.7C131.9 128.9 140.1 98.3001 126.3 74.4001C112.5 50.5001 81.9 42.3001 58 56.1001ZM102 132.3C83.8 142.8 60.6 136.6 50.1 118.4C39.6 100.2 45.8 77.0001 64 66.5001C82.2 56.0001 105.4 62.2001 115.9 80.4001C126.4 98.6001 120.2 121.8 102 132.3Z"
                    fill="#F16162"
                  />
                  <path
                    d="M101.974 132.31C120.148 121.817 126.375 98.5767 115.882 80.4021C105.388 62.2275 82.1484 56.0007 63.9738 66.4941C45.7992 76.9875 39.5724 100.227 50.0658 118.402C60.5592 136.577 83.7992 142.803 101.974 132.31Z"
                    fill="#C2E9FB"
                  />
                  <path
                    d="M105.1 68.4001C102.5 66.6001 99.7 65.1001 96.8 63.9001V97.6001C96.8 112.6 91.5 124.3 81 132.4C79 134 76.9 135.3 74.7 136.5C79.2 137.5 83.9 137.7 88.5 137C96.6 129.9 105.1 117.6 105.1 97.6001V68.4001Z"
                    fill="#4A4D5C"
                  />
                  <path
                    d="M119.1 87.4001C118.4 85.3001 117.5 83.2001 116.3 81.1001C115.9 80.9001 115.4 80.8 114.9 80.8C112.6 80.8 110.7 82.7001 110.7 85.0001V96.3C110.7 111.4 106.6 123.8 100.2 133.3C100.8 133 101.4 132.7 102 132.3C108.3 128.7 113.2 123.5 116.4 117.6C118.2 111 119.1 103.8 119.1 96.3V87.4001Z"
                    fill="#4A4D5C"
                  />
                  <path
                    d="M59.6 69.5001C59.1 75.6001 57.3 81.6001 54.2 86.9001C53.1 88.9001 53.8 91.4001 55.7 92.6001C57.7 93.7001 60.2 93.1001 61.4 91.1001C66 83.1001 68.2 73.8001 68 64.6001C66.6 65.2001 65.3 65.9001 64 66.6001C62.4 67.4001 60.9 68.4001 59.6 69.5001Z"
                    fill="#4A4D5C"
                  />
                  <path
                    d="M46.6 91.5001C46.6 90.7001 46.5 89.8001 46.5 89.0001C46 90.9001 45.6 92.8001 45.3 94.7001C46.1 93.9001 46.6 92.7001 46.6 91.5001Z"
                    fill="#4A4D5C"
                  />
                  <path
                    d="M75.1 102.5C79.3 94.2001 80 81.2001 80.1 61.5001C77.3 61.7001 74.5 62.2001 71.8 63.1001C71.7 79.9001 71 92.2001 67.7 98.7001C64.8 104.5 59.2 106.5 45.7 106.6C46.2 109.4 47.1 112.2 48.3 114.9C61.2 114.6 70.2 112.1 75.1 102.5Z"
                    fill="#4A4D5C"
                  />
                  <path
                    d="M93 96.3001V62.7001C90.3 62.0001 87.5 61.5001 84.7 61.4001V96.3001C84.7 113.6 69.3 121.5 59 122.6C57.3 122.8 55.9 124 55.4 125.6C57.2 127.5 59.2 129.2 61.4 130.7C68.7 129.6 75.9 126.3 81.5 121.5C89 115 93 106.3 93 96.3001Z"
                    fill="#4A4D5C"
                  />
                  <path
                    d="M59.5 13.6001C49.4 13.5001 39.9 16.7 31.9 22.8C24.1 28.7 18.3999 37 15.5999 46.3C14.9999 48.4 16.2 50.7 18.3 51.3C18.7 51.4 19.1 51.5 19.4 51.5C21.1 51.5 22.7 50.4001 23.3 48.6001C28 32.8001 42.7 21.7 59.2 21.7C59.3 21.7 59.3 21.7 59.4 21.7C68.6 21.8 77.4 25.2 84.3 31.5C85.9 33 88.5 32.9 90 31.3C91.5 29.7 91.4 27.1001 89.8 25.6001C81.5 17.9001 70.7 13.7001 59.5 13.6001Z"
                    fill="#6A7898"
                  />
                  <path
                    d="M94.3 42.2001C91.5 42.2001 88.9 43.4001 87.1 45.5001C86.8 45.8001 86.5 46.2001 86.3 46.6001C92.4 47.0001 98.4 48.4 104 50.8C103.9 50.5 103.9 50.1 103.8 49.8C102.8 45.4 98.8 42.2001 94.3 42.2001Z"
                    fill="#6A7898"
                  />
                  <path
                    d="M48.4 59.4001C48.6 55.8001 48.9 52.2001 50.9 50.2001C52 49.1001 53.7 48.7001 55 49.2001C56.1 49.7001 57.1 50.9001 58.1 52.8001C60.5 51.5001 62.9 50.4001 65.4 49.5001C63.6 45.5001 61.1 43.0001 58 41.7001C53.8 40.0001 48.6 41.1001 45.2 44.5001C41.3 48.5001 40.7 54.0001 40.4 58.9001C40.2 62.1001 40.1 65.4001 40 68.6001C42.4 65.3001 45.2 62.2001 48.4 59.4001Z"
                    fill="#6A7898"
                  />
                  <path
                    d="M67.4 8.80009C90.4 12.5001 107.6 31.0001 109.9 53.8001C112.8 55.5001 115.6 57.6001 118.2 59.9001V59.1001C118.2 45.0001 113.1 31.3001 104 20.7001C94.9 10.1001 82.4 3.10008 68.7 0.900081C66.5 0.500081 64.4 2.00008 64.1 4.20008C63.8 6.40008 65.2 8.40009 67.4 8.80009Z"
                    fill="#6A7898"
                  />
                  <path
                    d="M54.3 36.5001C62.9 36.5001 68.7 40.4001 71.2 47.8001C73.9 47.2001 76.6 46.8001 79.3 46.6001C78 42.1001 75.9 38.3001 72.8 35.4001C68.2 30.9001 61.8 28.5001 54.3 28.5001C46.7 28.5001 39.6 31.2001 34.3 36.2001C30 40.2001 24.9 47.7001 24.9 60.4001V103.5C24.9 105.7 26.7 107.5 28.9 107.5C29.6 107.5 30.2 107.3 30.7 107.1C29.5 98.8001 30.3 90.5001 32.9 82.7001V60.4001C32.9 42.8001 44.4 36.5001 54.3 36.5001Z"
                    fill="#6A7898"
                  />
                  <path
                    d="M21.8 107.5V65.7001C21.8 63.5001 20 61.7001 17.8 61.7001C15.6 61.7001 13.8 63.5001 13.8 65.7001V107.5C13.8 109 12.6 110.2 11.1 110.2C9.59998 110.2 8.40002 109 8.40002 107.5V59.1001C8.40002 34.7001 25.7 13.7001 49.6 9.10008C52.8 8.50008 56.1 8.20007 59.4 8.20007C61.6 8.20007 63.4 6.40007 63.4 4.20007C63.4 2.00007 61.6 0.200073 59.4 0.200073C55.6 0.200073 51.8 0.600079 48.1 1.30008C20.5 6.70008 0.400024 31.0001 0.400024 59.2001V107.6C0.400024 113.5 5.20001 118.4 11.2 118.4C17 118.2 21.8 113.4 21.8 107.5Z"
                    fill="#6A7898"
                  />
                  <path
                    d="M76.8 152C73.2 153.3 69.6 154.2 66 154.5C63.8 154.7 62.2 156.7 62.4 158.9C62.6 161 64.4 162.5 66.4 162.5C66.5 162.5 66.7 162.5 66.8 162.5C76.7 161.5 86.3999 157.5 94.5999 151.1C88.6999 152.4 82.7 152.7 76.8 152Z"
                    fill="#6A7898"
                  />
                  <path
                    d="M54.3 154.9H31.5C29.3 154.9 27.5 156.7 27.5 158.9C27.5 161.1 29.3 162.9 31.5 162.9H54.3C56.5 162.9 58.3 161.1 58.3 158.9C58.3 156.7 56.5 154.9 54.3 154.9Z"
                    fill="#6A7898"
                  />
                  <path
                    d="M40.8 131.3C39.5 129.6 38.3 127.8 37.2 125.9C36.7 125 36.2 124.2 35.8 123.3C28.9 123.5 19.1 125.1 10.8 129.2C8.79996 130.2 7.99997 132.6 8.99997 134.6C9.69997 136 11.0999 136.8 12.5999 136.8C13.1999 136.8 13.8 136.7 14.4 136.4C21.9 132.7 31.2 131.3 36.9 131.3H40.8V131.3Z"
                    fill="#6A7898"
                  />
                  <path
                    d="M57.5 149.4C59.4 149.4 61.5999 149.2 64.0999 148.8C59.3999 147 54.9 144.5 50.9 141.4H37C31.8 141.4 24.9 141.8 17.8 145.3C15.8 146.3 15 148.7 15.9 150.7C16.6 152.1 18 153 19.5 153C20.1 153 20.7 152.9 21.3 152.6C27.7 149.5 34.2 149.5 37 149.5H57.5V149.4Z"
                    fill="#6A7898"
                  />
                </svg>
              </VStack>
              <VStack flex={1}>
                <Heading size="sm">Easy to Use!/Heading>
                <Text>You can send and receive emails using our web3 ui or with a lecgay email client with our local SMTP and IMAP proxy.</Text>
                <svg
                  width="194"
                  height="216"
                  viewBox="0 0 194 216"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M184.8 81.8H67.2C62.5 81.8 58.6 85.6001 58.6 90.4001V145.9L61.8 142.7C62.6 141.9 63.6 141.3 64.7 141L67.7 140.1L70.6 130.5C71.3 128.3 73 126.5 75.2 125.9L84.8 123L87.7 113.4C88.4 111.2 90.1 109.4 92.3 108.8L105.5 104.8C106.1 104.6 106.8 104.5 107.5 104.5C110.5 104.5 113.3 106.5 114.1 109.4C114.6 111.2 114.4 113 113.6 114.7C112.7 116.3 111.3 117.5 109.5 118L99.9001 120.9L97 130.5C96.3 132.7 94.6001 134.5 92.4001 135.1L82.8 138L79.9001 147.6C79.2001 149.8 77.5 151.6 75.3 152.2L70.4001 153.7L64.9001 159.2C67.5001 165.2 66.2 172.3 61.5 177L58.7 179.8V197.5C58.7 202.2 62.5 206.1 67.3 206.1H184.9C189.6 206.1 193.5 202.3 193.5 197.5V90.3C193.4 85.6 189.6 81.8 184.8 81.8Z"
                    fill="#4A4D5C"
                  />
                  <path
                    d="M84 60.1V58.8C84 35.7 102.5 16.5 125.6 16.2C149 16 168 34.9 168 58.2V95.2001H184.3V59C184.3 26.8 158.5 0.200035 126.3 3.45457e-05C94 -0.199965 67.6 26.1001 67.6 58.4001V60.2C67.6 63 69.9 65.3 72.7 65.3H78.9C81.7 65.2 84 62.9 84 60.1Z"
                    fill="#DC7C32"
                  />
                  <path
                    d="M184.8 81.8H158.8C163.5 81.8 167.4 85.6001 167.4 90.4001V197.6C167.4 202.3 163.6 206.2 158.8 206.2H184.8C189.5 206.2 193.4 202.4 193.4 197.6V90.3C193.4 85.6 189.6 81.8 184.8 81.8Z"
                    fill="#373A47"
                  />
                  <path
                    d="M143 143.2C143 133.8 135.4 126.3 126.1 126.3C116.7 126.3 109.2 133.9 109.2 143.2C109.2 150.6 113.9 156.8 120.4 159.2V174C120.4 177.1 123 179.7 126.1 179.7C129.2 179.7 131.8 177.1 131.8 174V159.1C138.3 156.8 143 150.5 143 143.2Z"
                    fill="#E1DFEA"
                  />
                  <path
                    d="M109.1 89.8C109.1 87.6 107.3 85.9001 105.2 85.9001H73.5C71.3 85.9001 69.6 87.7 69.6 89.8C69.6 92 71.4 93.7001 73.5 93.7001H105.2C107.3 93.7001 109.1 91.9 109.1 89.8Z"
                    fill="#757989"
                  />
                  <path
                    d="M33.6 180.7C32.3 179.4 32.3 177.4 33.6 176.1L64.5 145.2C64.9 144.8 65.4 144.5 65.9 144.4L70.8 142.9L74.3 131.4C74.6 130.3 75.4 129.5 76.5 129.2L88 125.7L91.5 114.2C91.8 113.1 92.6 112.3 93.7 112L106.9 108C108.6 107.5 110.5 108.5 111 110.2C111.5 111.9 110.5 113.7 108.8 114.3L97.3 117.8L93.8 129.3C93.5 130.4 92.7 131.2 91.6 131.5L80.1 135L76.6 146.5C76.3 147.6 75.5 148.4 74.4 148.7L68.6 150.4L38.3 180.7C36.9 181.9 34.9 181.9 33.6 180.7Z"
                    fill="#F16162"
                  />
                  <path
                    d="M58.9 156.6C54 151.7 46.1001 151.7 41.2001 156.6L4.10005 193.7C-0.799951 198.6 -0.799951 206.5 4.10005 211.4C9.00005 216.3 16.9 216.3 21.8 211.4L58.9 174.3C63.8 169.5 63.8 161.5 58.9 156.6Z"
                    fill="#16ACC6"
                  />
                  <path
                    d="M58.9 156.6C61.4 159.1 59.4 165.1 54.5 170L17.4 207.1C12.5 212 6.5 213.9 4 211.5C8.9 216.4 16.8 216.4 21.7 211.5L58.8 174.4C63.8 169.5 63.8 161.5 58.9 156.6Z"
                    fill="#108491"
                  />
                </svg>
              </VStack>
            </HStack>
          </VStack>
        )}
        {nav === 'login' && (
          <VStack align="flex-start" gridGap={4}>
            <Heading size="md">
              <Flex align="center">
                <CgLock />
                Account Login
              </Flex>
            </Heading>
            {error && (
              <Alert status="error" marginBottom={4}>
                <AlertIcon />
                <AlertTitle mr={2}>Invalid Seed!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                <CloseButton
                  position="absolute"
                  right="8px"
                  top="8px"
                  onClick={() => setError(undefined)}
                />
              </Alert>
            )}
            <Text>
              You need to your private seed to get access to your mailbox!
            </Text>
            <Input
              autoFocus
              disabled={isLoading}
              isInvalid={!!error}
              errorBorderColor="crimson"
              id="seed"
              label="Seed"
              onChange={handleSeedChange}
              placeholder="base16-encoded string of 32 bytes length"
              type="text"
              value={seed}
            />
            <HStack>
              <Button colorScheme="purple" onClick={handleLogin}>
                Enter
              </Button>
            </HStack>
          </VStack>
        )}
        {nav === 'create' && (
          <VStack align="flex-start" gridGap={4}>
            <Heading size="md">
              <Flex align="center">
                <CgLock />
                Account Creation
              </Flex>
            </Heading>
            <Text>Keep this private key secure, you need this to login!</Text>
            <Box marginTop={4} marginBottom={4}>
              <Code padding={4}>{seed}</Code>
            </Box>
            <HStack>
              <Button colorScheme="purple" onClick={handleLogin}>
                Create
              </Button>
              <Button variant="contained" onClick={handleCopySeed}>
                Copy Seed
              </Button>
            </HStack>
          </VStack>
        )}
      </Flex>
    </Box>
  );
}

export default AuthenticateScreen;
