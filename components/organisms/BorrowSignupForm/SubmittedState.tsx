// noinspection HtmlUnknownTarget
import { Group } from '@mantine/core';
import { Text } from '@components/base';
import SkullsImg from 'assets/skulls.png';
import Image from 'next/image';

const SubmittedState: React.FC = () => {
  return (
    <>
      <Group direction="column" align="center" position="center" mt={160}>
        <Image
          src={SkullsImg.src}
          height={106}
          width={106}
          objectFit="contain"
          alt="skulls"
        />
        <Text type="gradient" weight="bold" sx={{ fontSize: 24 }}>
          Application Submitted
        </Text>
        <Text>Sit tight! A crew member will reach out to you shortly.</Text>
      </Group>
    </>
  );
};

export default SubmittedState;
