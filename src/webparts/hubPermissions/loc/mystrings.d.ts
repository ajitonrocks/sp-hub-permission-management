declare interface IHubPermissionsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  RemovePermissionTitle: string;
  RemovePermissionMessage: string;
  Cancel: string;
  RemovePermissionButton: string;
}

declare module 'HubPermissionsWebPartStrings' {
  const strings: IHubPermissionsWebPartStrings;
  export = strings;
}
