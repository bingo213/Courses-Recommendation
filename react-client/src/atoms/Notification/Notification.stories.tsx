import { Notification } from './Notification';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';

export default {
  title: 'atoms/Notification',
  component: Notification,
  argTypes: {
    title: { defaultValue: 'Default title' },
    message: { defaultValue: 'This is a default message.' },
    type: {
      control: 'radio',
      options: ['info', 'warning', 'success', 'error'],
    },
  },
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = args => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)}>Click to open notification</Button>
      <Notification {...args} show={show} onClose={() => setShow(false)} />
    </>
  );
};

export const Default = Template.bind({});

export const Example = () => {
  const message =
    'This is the content of the notification. This is the content of the notification.';
  const title = 'Notification title';
  const handleClose = () => console.log('Close');
  return (
    <>
      <Notification
        show
        message={message}
        title={title}
        type="error"
        onClose={handleClose}
      />
      <Notification
        show
        message={message}
        title={title}
        type="info"
        onClose={handleClose}
        style={{ top: 140 }}
      />
      <Notification
        show
        message={message}
        title={title}
        type="warning"
        onClose={handleClose}
        style={{ top: 270 }}
      />
      <Notification
        show
        message={message}
        title={title}
        type="success"
        onClose={handleClose}
        style={{ top: 400 }}
      />
    </>
  );
};
