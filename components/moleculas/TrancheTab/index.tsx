import { Card, Text } from '@components/base';
import { Box, Group } from '@mantine/core';
import { TrancheTextMap, TrancheType } from 'types';

type IProps = {
  trancheType: TrancheType;
  isActive: boolean;
  onClick: () => void;
};

const TrancheTab: React.FC<IProps> = ({ trancheType, isActive, onClick }) => {
  return (
    <Card
      px={24}
      py={20}
      sx={{
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomWidth: isActive ? 0 : undefined,
        borderLeftWidth: !isActive ? 0 : undefined,
        borderRightWidth: !isActive ? 0 : undefined,
        flexGrow: 1,
        background: !isActive ? 'rgba(27, 29, 44, 0.6)' : undefined,
        boxSizing: 'border-box',
        cursor: !isActive ? 'pointer' : undefined,
      }}
      onClick={onClick}
    >
      <Group position="apart">
        <Text type="gradient" weight={700}>
          {TrancheTextMap[trancheType]} Tranche
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
    </Card>
  );
};

export default TrancheTab;
