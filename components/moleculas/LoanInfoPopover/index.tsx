import { Avatar, Group, GroupProps, Popover } from '@mantine/core';
import { useState } from 'react';
import InfoCircle from '@assets/info-circle.svg';
import { Text } from '@components/base';
import BigNumber from 'bignumber.js';
import { formatAmount } from 'utils/bn';

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
        target={
          <Avatar
            size={16}
            mt={5}
            src={InfoCircle.src}
            onMouseEnter={() => setOpened(true)}
            onMouseLeave={() => setOpened(false)}
            sx={{ '&:hover': { cursor: 'pointer' } }}
          />
        }
        width={260}
        position="right"
        styles={{
          body: {
            pointerEvents: 'none',
            background: '#242940',
            borderRadius: 10,
            border: '1px solid',
          },
        }}
      >
        <Group direction="column" align="stretch">
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
        </Group>
      </Popover>
    </Group>
  );
};

export default LoanInfoPopover;
