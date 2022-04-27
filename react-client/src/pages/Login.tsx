import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import statisticIllutration from '../assets/statistic_illutration.png';
import { Button, COLORS, Input, Notification } from '../atoms';
import { LOGO } from '../constants';
import { useForm, SubmitHandler } from 'react-hook-form';
import { userApi } from '../apis';
import { useLocation, useNavigate } from 'react-router';
import { useCurrentUser, useToken } from '../hooks';

type FormValues = {
  username: string;
  password: string;
};

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const [showNoti, setShowNoti] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as any;
  const { setToken, removeToken } = useToken();
  const { setUser, removeUser } = useCurrentUser();

  useEffect(() => {
    removeToken();
    removeUser();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    userApi
      .login(data)
      .then(userInfo => {
        setToken && setToken(userInfo.token);
        setUser({ username: data.username, avatar: userInfo.avatar });

        if (location?.state?.from) navigate(location.state.from);
        else navigate('/user/recommend');
      })
      .catch(error => {
        console.log(error);
        setShowNoti(true);
      });
  };

  return (
    <Wrapper>
      <Main>
        <Image src={statisticIllutration} />
        <Right>
          <Head>
            <img src={LOGO} alt="logo" width={48} />
            <Title>{t('Login')}</Title>
            <SubTitle>
              {t('WelcomeBack.PleaseEnterAllInformationBelow.')}
            </SubTitle>
          </Head>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <StyledInput
              label={t('Username')}
              type="text"
              variant="box"
              {...register('username', { required: true })}
              errorMessage={
                errors?.username?.type === 'required'
                  ? t('ThisIsRequiredField')
                  : undefined
              }
            />
            <StyledInput
              label={t('Password')}
              type="password"
              variant="box"
              {...register('password', { required: true })}
              errorMessage={
                errors?.password?.type === 'required'
                  ? t('ThisIsRequiredField')
                  : undefined
              }
            />
            <div style={{ padding: '12px 0 32px 0' }}>
              <Button block type="submit">
                {t('Login')}
              </Button>
            </div>
          </Form>
        </Right>
      </Main>
      <Notification
        type="error"
        show={showNoti}
        onClose={() => setShowNoti(false)}
        title={t('Error')}
        message={t('IncorrectUsernameOrPassword')}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${COLORS.primary100};
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  width: 80%;
  height: 85%;
  max-width: 1000px;
  min-width: 700px;
  display: flex;
`;

const Right = styled.div`
  background: white;
  width: 100%;
  height: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0;
`;

const Image = styled.img`
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Head = styled.div`
  text-align: center;
`;

const Title = styled.h3`
  color: ${COLORS.textPrimary};
  margin: 12px 0 6px 0;
`;

const SubTitle = styled.p`
  font-size: 12px;
  color: ${COLORS.textSecondary};
  font-weight: 200;
`;

const Form = styled.form`
  width: 65%;
  margin-top: 48px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 32px;
`;
