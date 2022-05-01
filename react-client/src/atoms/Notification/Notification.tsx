import React, { useEffect } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { COLORS } from '../colors';
import { Close, Info, Multiply, TickInCircle, Warning } from '../Icons';

export interface NotificationProps {
  message: string;
  title?: string;
  duration?: number;
  type?: 'success' | 'info' | 'warning' | 'error';
  show: boolean;
  onClose: () => void;
  closeable?: boolean;
  style?: CSSProperties;
}

const getIconByType = (type: NotificationProps['type']) => {
  switch (type) {
    case 'error':
      return <Close fill="white" width={24} />;
    case 'info':
      return <Info fill="white" width={24} />;
    case 'success':
      return <TickInCircle fill="white" width={20} />;
    case 'warning':
      return <Warning fill="white" width={24} />;
  }
};

export const Notification: React.FC<NotificationProps> = ({
  title,
  message,
  duration = 4000,
  type = 'info',
  show,
  onClose,
  closeable = true,
  style,
}: NotificationProps) => {
  useEffect(() => {
    let handle: any;
    if (duration && show) {
      handle = setTimeout(() => onClose(), duration);
    }
    return () => {
      if (handle) {
        clearTimeout(handle);
      }
    };
  }, [show]);

  return (
    <Wrapper className={show ? 'show-noti' : ''} style={{...style, background: COLORS?.[type]}}>
      <div>{getIconByType(type)}</div>
      {closeable && (
        <CloseIcon onClick={!!onClose && onClose}>
          <Multiply fill="white" width={18} />
        </CloseIcon>
      )}
      <div>
        {title && <Title>{title}</Title>}
        <Message>{message}</Message>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 320px;
  padding: 12px;
  position: fixed;
  transition: right 0.5s;
  top: 12px;
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 12px;
  right: -320px;
  &.show-noti {
    right: 0;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 8px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Message = styled.div``;
