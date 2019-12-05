import {HCPEntry} from './HCPEntry';

export interface HCPDirectory {
  entries: HCPEntry[];
  path: string;
}
