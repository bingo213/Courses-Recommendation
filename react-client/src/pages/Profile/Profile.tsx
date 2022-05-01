import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Avatar,
  Button,
  COLORS,
  Input,
  Photo,
  Notification,
  NotificationProps,
} from '../../atoms';
import { InformationForm } from './InformationForm';
import { PasswordForm } from './PasswordForm';

export const Profile: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [typeNoti, setTypeNoti] = useState<NotificationProps['type']>();
  const [showNoti, setShowNoti] = useState(false);
  const [msg, setMsg] = useState('');

  return (
    <Wrapper>
      <StyledAvatar
        image="https://chiase24.com/wp-content/uploads/2022/02/tang-hap-hanh-anh-avatar-hai-haeac-nhan-la-ba_t-caea_i-1.jpg"
        size="large"
        icon={<Photo width={25} fill={COLORS.textSecondary} />}
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

const Title = styled.p`
  font-size: 16px;
  color: ${COLORS.primary600};
  width: fit-content;
  margin: auto;
  padding: 0 18px;
  background: white;
  position: relative;
  z-index: 2;
`;

const Form = styled.form`
  margin-top: 42px;
  &.form-left {
    padding-right: 24px;
    border-right: 1px solid ${COLORS.line100};
  }
  &.form-right {
    padding-left: 24px;
  }
`;

const StyledInput = styled(Input)`
  margin-bottom: 32px;
`;
