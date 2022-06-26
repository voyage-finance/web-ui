import {
  showNotification as showMantineNotification,
  NotificationProps,
} from '@mantine/notifications';
import InfoSvg from '@assets/icons/info.svg';
import CheckSvg from '@assets/icons/check.svg';
import React from 'react';
import NotificationBody from '@components/moleculas/NotificationBody';

type IProps = NotificationProps & {
  type: 'success' | 'info' | 'error';
  link?: string;
};

export const showNotification = ({ type, link, ...props }: IProps) => {
  const icon = (function () {
    switch (type) {
      case 'success':
        return <CheckSvg size={24} />;
      case 'info':
        return <InfoSvg size={24} />;
      case 'error':
        return <InfoSvg className="redStroke" size={24} />;
    }
  })();

  showMantineNotification({
    ...props,
    message: <NotificationBody message={props.message} link={link} />,
    icon,
    styles: (theme) => ({
      icon: {
        backgroundColor: 'unset !important',
        '.redStroke': {
          path: {
            stroke: 'red',
          },
        },
        marginRight: 7,
        marginTop: -2,
      },
      root: {
        backgroundColor: '#242940',
        borderRadius: 5,
        borderWidth: 0,
        boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.5)',
        alignItems: 'start',
        padding: '16px 14px',
        position: 'relative',
      },
      title: {
        color: theme.white,
        fontSize: 16,
        fontWeight: 700,
      },
      description: {
        color: theme.white,
        fontSize: 14,
        marginTop: 6,
        '.expolerLink': {
          color: theme.fn.rgba('#fff', 0.35),
          ':hover': {
            color: '#fff',
            cursor: 'pointer',
            textDecoration: 'underline',
            userSelect: 'none',
            '.arrowIcon': {
              path: {
                stroke: 'white',
              },
            },
          },
        },
      },
    }),
  });
};

export default showNotification;
