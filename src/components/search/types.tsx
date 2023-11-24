import { Option } from '../select/types';

export interface Payload {
  selectedOption: Option;
  prevOption?: Option;
}

export interface SettingsPanelProps {
  onItemsChange: (payload: Payload) => void;
}
