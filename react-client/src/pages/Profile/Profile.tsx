import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, COLORS, Notification, NotificationProps } from '../../atoms';
import { DEFAULT_AVATAR } from '../../constants';
import { InformationForm } from './InformationForm';
import { PasswordForm } from './PasswordForm';

export const Profile: React.FC<{}> = () => {
  const [typeNoti, setTypeNoti] = useState<NotificationProps['type']>();
  const [showNoti, setShowNoti] = useState(false);
  const [msg, setMsg] = useState('');

  return (
    <Wrapper>
      <StyledAvatar
        image={DEFAULT_AVATAR}
        size="large"
        // icon={<Photo width={25} fill={COLORS.textSecondary} />}
      />
      <Line />
      <Part>
        <InformationForm
          setShowNoti={setShowNoti}
          setMsg={setMsg}
          setTypeNoti={setTypeNoti}
        />
      </Part>
      <Part>
        <PasswordForm
          setShowNoti={setShowNoti}
          setMsg={setMsg}
          setTypeNoti={setTypeNoti}
        />
      </Part>
      <Notification
        message={msg}
        show={showNoti}
        onClose={() => setShowNoti(false)}
        type={typeNoti}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const StyledAvatar = styled(Avatar)`
  position: absolute;
  left: calc(50% - 60px);
  top: -60px;
  z-index: 2;
`;

const Line = styled.div`
  position: absolute;
  top: 12px;
  width: calc(100vw - 250px);
  height: 1px;
  border-bottom: 1px solid ${COLORS.line100};
  margin: 0 -32px;
`;

const Part = styled.div`
  flex: 1;
`;
