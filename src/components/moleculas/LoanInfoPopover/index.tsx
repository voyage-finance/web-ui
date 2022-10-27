import InfoCircle from '@assets/info-circle.svg';
import { Text } from '@components/base';
import { Avatar, Group, GroupProps, Popover, Stack } from '@mantine/core';
import { formatAmount } from '@utils/bn';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

type IProps = GroupProps & {
  loan: BigNumber;
  interest: BigNumber;
};

const LoanInfoPopover: React.FC<IProps> = ({
  loan,
  interest,
  children,
  ...props
}) => {
  const [opened, setOpened] = useState(false);
  return (
    <Group align="start" spacing={8} {...props}>
      {children}
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        width={260}
        position="right"
        styles={{
          dropdown: {
            pointerEvents: 'none',
            background: '#242940',
            borderRadius: 10,
            border: '1px solid',
          },
        }}
      >
        <Popover.Target>
          <Avatar
            size={16}
            mt={5}
            src={InfoCircle.src}
            onMouseEnter={() => setOpened(true)}
            onMouseLeave={() => setOpened(false)}
            sx={{ '&:hover': { cursor: 'pointer' } }}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <Stack align="stretch">
            <Group position="apart">
              <Text>Loan Amount</Text>
              <Text>
                <strong>{formatAmount(loan)}</strong> TUS
              </Text>
            </Group>
            <Group position="apart">
              <Text>Interest</Text>
              <Text>
                <strong>{formatAmount(interest)}</strong> TUS
              </Text>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};

export default LoanInfoPopover;
