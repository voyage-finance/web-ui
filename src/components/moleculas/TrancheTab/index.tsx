import { Text } from '@components/base';
import { Box, Group } from '@mantine/core';
import { TrancheTextMap, TrancheType } from '@types';

type IProps = {
  trancheType: TrancheType;
  onClick: () => void;
};

const TrancheTab: React.FC<IProps> = ({ trancheType }) => {
  return (
    <Group position="apart" px={24} py={20}>
      <Text
        size="lg"
        weight={700}
        sx={{ fontSize: '20px', lineHeight: '24px' }}
      >
        {`${TrancheTextMap[trancheType]} Tranche`}
      </Text>
      <Box
        sx={(theme) => ({
          background:
            trancheType === TrancheType.Senior
              ? theme.colors['accent-blue'][5]
              : theme.colors['accent-pink'][6],
          borderRadius: 4,
          padding: '6px 10px',
        })}
      >
        <Text size="sm" weight="bold">
          {trancheType === TrancheType.Senior ? 'Lower Risk' : 'Higher risk'}
        </Text>
      </Box>
    </Group>
  );
};

export default TrancheTab;
