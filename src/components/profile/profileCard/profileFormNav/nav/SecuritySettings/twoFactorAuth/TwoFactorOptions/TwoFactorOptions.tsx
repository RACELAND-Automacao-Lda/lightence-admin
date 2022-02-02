import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RadioChangeEvent } from 'antd';
import { RadioGroup } from '@app/components/common/Radio/Radio';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { TwoFactorAuthOptionState } from '../TwoFactorAuth';
import * as S from './TwoFactorOptions.styles';

interface TwoFactorOptionsProps {
  selectedOption: TwoFactorAuthOptionState;
  setSelectedOption: (state: TwoFactorAuthOptionState) => void;
}

export const TwoFactorOptions: React.FC<TwoFactorOptionsProps> = ({ selectedOption, setSelectedOption }) => {
  const user = useAppSelector((state) => state.user.user);

  const { t } = useTranslation();

  const { isEmailActive, isPhoneActive } = useMemo(
    () => ({
      isPhoneActive: selectedOption === 'phone',
      isEmailActive: selectedOption === 'email',
    }),
    [selectedOption],
  );

  const handleRadio = user?.twoFactorAuth.enabled
    ? () => null
    : (e: RadioChangeEvent) => setSelectedOption(e.target.value);

  return (
    <>
      <RadioGroup value={selectedOption} onChange={handleRadio}>
        <S.RadioBtn value="phone" $isActive={isPhoneActive}>
          {t('common.phone')}
        </S.RadioBtn>
        <S.RadioBtn value="email" $isActive={isEmailActive}>
          {t('common.email')}
        </S.RadioBtn>
      </RadioGroup>
    </>
  );
};
