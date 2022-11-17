import { Icon, Stack, Text } from '@chakra-ui/react';
import { usePrefetchTreatments } from '../treatments/hooks/useTreatments';
import { ReactElement } from 'react';
import { GiFlowerPot } from 'react-icons/gi';

import { BackgroundImage } from '../common/BackgroundImage';

export function Home(): ReactElement {
  // 동적인 컴포넌트가 아니여서 임시로 해둠
  usePrefetchTreatments();
  return (
    <Stack align="center" justify="center" height="84vh">
      <BackgroundImage />
      <Text textAlign="center" fontFamily="Forum, sans-serif" fontSize="6em">
        <Icon m={4} verticalAlign="top" as={GiFlowerPot} />
        Lazy Days Spa
      </Text>
      <Text>Hours: limited</Text>
      <Text>Address: nearby</Text>
    </Stack>
  );
}
