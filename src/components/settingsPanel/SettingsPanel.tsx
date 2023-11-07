import { settings } from '../../constants';
import ErrorButton from '../errorButton/';
import Select from '../select/';
import { Option } from '../select/types';
import style from './style.module.scss';
import { SettingsPanelProps } from './types';

const SettingsPanel = ({ onItemsChange }: SettingsPanelProps) => {
  const handleChange = (selectedOption: Option, prevOption = {} as Option) => {
    onItemsChange({ selectedOption, prevOption });
  };

  return (
    <div className={style.panel}>
      <ErrorButton />
      <div>
        <Select options={settings} onChange={handleChange} />
      </div>
    </div>
  );
};

export default SettingsPanel;
