import styled from 'styled-components';
import { COLORS } from '../colors';
import { Story } from '@storybook/react/types-6-0';
import {
  GrowthGraph,
  Account,
  AngleDown,
  Clipboard,
  Eye,
  House,
  Logout,
  Multiply,
  Photo,
  HiddenEye,
  TickInCircle,
  Close,
  Info,
  Warning,
} from './components';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'atoms/Icons',
  argTypes: {
    fill: { control: 'color', defaultValue: COLORS.primary500 },
    width: { control: 'number', defaultValue: 24 },
  },
};

export const Default: Story = args => {
  const components = [
    GrowthGraph,
    Account,
    AngleDown,
    Clipboard,
    Eye,
    House,
    Logout,
    Multiply,
    Photo,
    HiddenEye,
    TickInCircle,
    Close,
    Info,
    Warning,
  ];
  return (
    <Wrapper>
      {components.map(Comp => (
        <div
          key={Comp.name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '128px',
          }}
        >
          <Comp {...args} />
          <p>{Comp.name.slice(3)}</p>
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;
