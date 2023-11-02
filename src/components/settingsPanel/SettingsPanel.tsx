import ErrorButton from '../errorButton/';
import Select from '../select/';
import { Option } from '../select/types';
import style from './style.module.scss';
import { SettingsPanelProps } from './types';

const data = [
  { label: '6 per page', value: 6 },
  { label: '12 per page', value: 12 },
  { label: '18 per page', value: 18 },
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
