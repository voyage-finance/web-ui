import { useIsMounted } from '@utils/hooks';
import {
  Avatar,
  Box,
  createStyles,
  Group,
  Stack,
  Transition,
} from '@mantine/core';
import ArrowUpRightSvg from '@assets/icons/arrow-up-right.svg';

const scaleY = {
  in: { width: '0' },
  out: { width: '100%' },
  transitionProperty: 'width',
};

const useStyles = createStyles((theme) => ({
  progressBarContainer: {
    display: 'block',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: theme.fn.rgba('#1B1D2C99', 0.6),
  },
  progressBar: {
    height: 6,
    borderBottomLeftRadius: 5,
    background: 'linear-gradient(90deg, #FFA620 0%, #EF5B25 100%)',
  },
}));

const NotificationBody: React.FC<{
  message: React.ReactNode;
  link?: string;
}> = ({ message, link }) => {
  const isMounted = useIsMounted();
  const { classes } = useStyles();
  return (
    <Stack spacing={0}>
      <div> {message}</div>
      {link && (
        <Group
          spacing={0}
          className="expolerLink"
          onClick={() => {
            window.open(link, '_blank', 'noopener,noreferrer');
          }}
        >
          View on explorer
          <Avatar src={ArrowUpRightSvg.src} />
        </Group>
      )}
      <Transition
        mounted={isMounted}
        transition={scaleY}
        duration={4000}
        timingFunction="linear"
      >
        {(styles) => (
          <Box className={classes.progressBarContainer}>
            <div
              className={classes.progressBar}
              style={{
                ...styles,
              }}
            />
          </Box>
        )}
      </Transition>
    </Stack>
  );
};

export default NotificationBody;
