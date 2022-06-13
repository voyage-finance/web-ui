import {
  showNotification as showMantineNotification,
  NotificationProps,
} from '@mantine/notifications';

type IProps = NotificationProps & {
  type: 'success' | 'info' | 'error';
  link?: string;
};

const showNotification = ({ type, link, ...props }: IProps) => {
  showMantineNotification({ ...props, styles: () => ({}) });
};

export default showNotification;
