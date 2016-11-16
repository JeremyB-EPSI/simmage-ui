export interface GroupJson {
  grp_id: number;
  grp_name: string;
}
export interface PortalJson {
  por_id: number;
  por_name: string;
}
export interface TopicJson {
  top_id: number;
  top_name: string;
  top_description: string;
  top_icon: string;
  top_color: string;
  ugt_rights: string[];
}
export interface OrganizationJson {
  org_id: number;
  org_name: string;
  org_description: string;
}
export interface UsergroupJson {
  ugr_id: number;
  ugr_name: string;
  ugr_rights: string[];
  ugr_statuses: string[];
  groups: GroupJson[];
  portals: PortalJson[];
  topics: TopicJson[];
}
export interface UserLoginJson {
  usr_token: number;
  usr_rights: string[];
  usergroup: UsergroupJson;
  participant: {
    par_id: number;
    par_firstname: string;
    par_lastname: string;
  };
}
export interface EventTypeJson {
  ety_id: number;
  ety_name: string;
  ety_category: string;
  ety_individual_name: boolean;
  topics: TopicJson[];
  organizations: OrganizationJson[];
}
export interface DocumentTypeJson {
  dty_id: number;
  dty_name: string;
  dty_individual_name: string;
  topics: TopicJson[];
  organizations: OrganizationJson[];
}