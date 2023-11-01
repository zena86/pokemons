import ErrorButton from '../errorButton/';
import Select from '../select/';
import { Option } from '../select/types';
import style from './style.module.scss';
import { SettingsPanelProps } from './types';

const data = [
  { label: '12 per page', value: 12 },
  { label: '24 per page', value: 24 },
  { label: '48 per page', value: 48 },
];

const SettingsPanel = ({ onItemsChange }: SettingsPanelProps) => {
  const handleChange = (selectedOption: Option, prevOption = {} as Option) => {
    onItemsChange({ selectedOption, prevOption });
  };

  return (
    <div className={style.panel}>
      <ErrorButton />
      <div>
        <Select options={data} onChange={handleChange} />
      </div>
    </div>
  );
};

export default SettingsPanel;
