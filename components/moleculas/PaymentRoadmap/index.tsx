import { Text } from '@components/base';
import { Box, Group, GroupProps } from '@mantine/core';
import * as React from 'react';

type IPaymentRoadmapProps = GroupProps;

const PaymentRoadmap: React.FunctionComponent<IPaymentRoadmapProps> = (
  props
) => {
  return (
    <Group direction="column" spacing={8} align="stretch" {...props}>
      <Group grow spacing={0}>
        {[1, 2, 3].map((_, index) => (
          <Group direction="column" align="end" spacing={0} key={index}>
            <Text size="sm" type="accent">
              Payment #1 Due
            </Text>
            <Text size="sm">1 Jul 2022</Text>
            <Box
              mt={8}
              sx={(theme) => ({
                height: 28,
                borderRadius:
                  index === 0
                    ? '10px 0 0 10px'
                    : index === 2
                    ? '0 10px 10px 0'
                    : undefined,
                borderRight: index < 2 ? '1px solid' : undefined,
                borderRightColor: theme.fn.rgba('#fff', 0.35),
                background: theme.fn.rgba('#fff', 0.1),
                color: '#fff',
                textAlign: 'center',
                width: '100%',
              })}
            >
              30D
            </Box>
            <Text size="sm" mt={8}>
              <strong>100,000</strong> TUS
            </Text>
          </Group>
        ))}
      </Group>
    </Group>
  );
};

export default PaymentRoadmap;
