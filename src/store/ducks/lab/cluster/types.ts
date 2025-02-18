import { Quota } from '../types';

// Action Types
export enum ClusterTypes {
  DELETE_REQUEST = '@cluster/DELETE_REQUEST',
  DELETE_SUCCESS = '@cluster/DELETE_SUCCESS',
  DELETE_FAILURE = '@cluster/DELETE_FAILURE',
  LOAD_REQUEST = '@cluster/LOAD_REQUEST',
  LOAD_SUCCESS = '@cluster/LOAD_SUCCESS',
  LOAD_FAILURE = '@cluster/LOAD_FAILURE',
  LOAD_HOST_REQUEST = '@cluster/LOAD_HOST_REQUEST',
  LOAD_HOST_SUCCESS = '@cluster/LOAD_HOST_SUCCESS',
  LOAD_HOST_FAILURE = '@cluster/LOAD_HOST_FAILURE',
  LOAD_EVENTS_REQUEST = '@cluster/LOAD_EVENTS_REQUEST',
  LOAD_EVENTS_SUCCESS = '@cluster/LOAD_EVENTS_SUCCESS',
  LOAD_EVENTS_FAILURE = '@cluster/LOAD_EVENTS_FAILURE',
  LOAD_STDOUT_REQUEST = '@cluster/LOAD_STDOUT_REQUEST',
  LOAD_STDOUT_SUCCESS = '@cluster/LOAD_STDOUT_SUCCESS',
  LOAD_STDOUT_FAILURE = '@cluster/LOAD_STDOUT_FAILURE',
  CREATE_REQUEST = '@cluster/CREATE_REQUEST',
  CREATE_SUCCESS = '@cluster/CREATE_SUCCESS',
  CREATE_FAILURE = '@cluster/CREATE_FAILURE',
  UPDATE_REQUEST = '@cluster/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@cluster/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@cluster/UPDATE_FAILURE',
}
// Data Tyoes
export interface ClusterData {
  id: number;
  user_id: number;
  created: string;
  template_id: number;
  region_id: number;
  status: string;
  hosts?: ClusterHost[];
  quota?: Quota;
  group_id: number | null;
  name: string;
  description: string;
  reservation_expiration: string | null;
  lifespan_expiration: string | null;
  templateName: string;
  group_name: string | null;
  region_name: string;
  user_name: string;
}

export enum ClusterEventType {
  TOWER_JOB = 'tower_job',
  RESERVATION_CHANGE = 'reservation_change',
  LIFESPAN_CHANGE = 'lifespan_change',
}

export interface ClusterEventData {
  id: string;
  date: string;
  user_id: string;
  cluster_id: string;
  type:
    | ClusterEventType.TOWER_JOB
    | ClusterEventType.RESERVATION_CHANGE
    | ClusterEventType.LIFESPAN_CHANGE;
  tower_id?: number;
  tower_job_id?: number;
  status?: string;
  old_value?: string;
  new_value?: string;
}
// Model Types
export interface Cluster {
  id: number;
  created: string;
  template_id: number;
  hosts: ClusterHost[];
  quota: Quota;
  status: string;
  name: string;
  description: string;
  reservation_expiration: Date | null;
  lifespan_expiration: Date | null;
  templateName: string;
  group_name: string | null;
  region_name: string;
  user_name: string;
}

export interface ClusterHost {
  // Tower types
  id: string;
  cluster_id: string;
  fqdn: string;
  ipaddr: string[];
  num_vcpus: number;
  ram_mb: number;
  num_volumes: number;
  volumes_gb: number;
}

export interface ClusterEvent {
  id: string;
  date: string;
  cluster_id: string;
  tower_id?: number | null;
  tower_job_id?: number | null;
  status?: string | null;
  user_id: string;
}

export interface ClusterCreateData {
  name: string;
  region_id?: number;
  template_id?: number;
  extraVars: Record<string, string | number>;
  owner?: number;
  reservationDays: string;
}

export interface ClusterUpdateData {
  reservation_expiration?: string | null;
  lifespan_expiration?: string | null;
}

//  State Type
export interface ClusterState {
  readonly data: { [key: number]: Cluster };
  readonly stdOutput: string | null;
  // readonly hosts: ClusterHost[];
  readonly events: ClusterEvent[];
  readonly loading: boolean;
  readonly error: boolean;
}
