import * as React from 'react';
import styles from './HubPermissions.module.scss';
import { IHubPermissionsProps } from './IHubPermissionsProps';
import { PeoplePicker, Person, ViewType } from '@microsoft/mgt-react';
import { ActionButton, CommandBar, DefaultPalette, DetailsList, DetailsListLayoutMode, Dialog, DialogFooter, DialogType, IColumn, ICommandBarItemProps, IIconProps, IPivotStyles, ISearchBoxStyles, IStackItemStyles, IStackTokens, IStyleSet, Link, Panel, Pivot, PivotItem, PivotLinkSize, PrimaryButton, SearchBox, SelectionMode, Stack } from 'office-ui-fabric-react';
import * as strings from 'HubPermissionsWebPartStrings';


//#region Site Wise Permission
export interface ISiteWisePermissionItems {
  Key: string;
  Email: string;
  Permission: string;
  Action: string;
}
const PeopleColumns: IColumn[] = [{ key: 'username', name: 'User', fieldName: 'Email', minWidth: 100, maxWidth: 200, isResizable: true, onRender: (item: ISiteWisePermissionItems) => (<Person personQuery={item.Email} view={ViewType.oneline} ></Person>) },
{ key: 'Permission', name: 'Permission Type', fieldName: 'Permission', minWidth: 100, maxWidth: 200, isResizable: true },
{ key: 'action', name: 'Hub Permission Scan', fieldName: 'Action', minWidth: 100, maxWidth: 200, isResizable: true, onRender: (item: ISiteWisePermissionItems) => (<ActionButton iconProps={scanIcon} allowDisabledFocus>{item.Action} </ActionButton>) }];

const PeopleItems: ISiteWisePermissionItems[] = [{ Key: '1', Email: 'ajit@onrocks.onmicrosoft.com', Permission: 'Owner', Action: 'Scan' },
{ Key: '2', Email: 'jitendra@onrocks.onmicrosoft.com', Permission: 'Visitor', Action: 'Scan' },
{ Key: '3', Email: 'sadak@onrocks.onmicrosoft.com', Permission: 'Member', Action: 'Scan' },
{ Key: '4', Email: 'Torsten@onrocks.onmicrosoft.com', Permission: 'member', Action: 'Scan' },
{ Key: '5', Email: 'martin@onrocks.onmicrosoft.com', Permission: 'Member', Action: 'Scan' },
];

//#endregion
//#region User Wise Permission
export interface IUserWisePermissionItems {
  Key: string;
  SiteTitle: string;
  SiteUrl: string;
  PermissionType: string;
  PermissionName: string;
}
const UserWiseColumns: IColumn[] = [{ key: 'SiteTitle', name: 'Site Title', fieldName: 'SiteTitle', minWidth: 100, maxWidth: 200, isResizable: true },
{ key: 'PermissionType', name: 'Permission Type', fieldName: 'PermissionType', minWidth: 100, maxWidth: 200, isResizable: true },
{ key: 'PermissionName', name: 'Permission Name', fieldName: 'PermissionName', minWidth: 100, maxWidth: 200, isResizable: true },
{ key: 'action', name: 'Action', fieldName: 'SiteUrl', minWidth: 100, maxWidth: 200, isResizable: true, onRender: (item: IUserWisePermissionItems) => (<Link href={item.SiteUrl} target=' _blank' >{'View Site'}</Link>) }];

const UserWiseItems: IUserWisePermissionItems[] = [{ Key: '1', SiteTitle: 'Site 1', SiteUrl: 'https://onrocks.sharepoint.com/sites/site1', PermissionType: 'M365 Group', PermissionName: 'Owner' },
{ Key: '2', SiteTitle: 'Site 2', SiteUrl: 'https://onrocks.sharepoint.com/sites/site2', PermissionType: 'Unique Permission', PermissionName: 'Editor' },
{ Key: '3', SiteTitle: 'Site 3', SiteUrl: 'https://onrocks.sharepoint.com/sites/site3', PermissionType: 'SharePoint Group', PermissionName: 'Contributor' },
{ Key: '4', SiteTitle: 'Site 4', SiteUrl: 'https://onrocks.sharepoint.com/sites/site4', PermissionType: 'SharePoint Group', PermissionName: 'Visitor' },
{ Key: '5', SiteTitle: 'Site 5', SiteUrl: 'https://onrocks.sharepoint.com/sites/site5', PermissionType: 'M365 Group', PermissionName: 'Owner' },
];


//#endregion
//#region Site Data
export interface ISiteItems {
  Key: string;
  SiteTitle: string;
  SiteUrl: string;
}
const SiteWiseColumns: IColumn[] = [{ key: 'title', name: 'Site Title', fieldName: 'SiteTitle', minWidth: 100, maxWidth: 200, isResizable: true, onRender: (item: ISiteItems) => (<Link href={item.SiteUrl} target=' _blank' >{item.SiteTitle}</Link>) }];
const SiteWiseItems: ISiteItems[] = [{ Key: '1', SiteTitle: 'Site 1', SiteUrl: 'https://onrocks.sharepoint.com/sites/site1' },
{ Key: '2', SiteTitle: 'Site 2', SiteUrl: 'https://onrocks.sharepoint.com/sites/site2' },
{ Key: '3', SiteTitle: 'Site 3', SiteUrl: 'https://onrocks.sharepoint.com/sites/site3' },
{ Key: '4', SiteTitle: 'Site 4', SiteUrl: 'https://onrocks.sharepoint.com/sites/site4' },
{ Key: '5', SiteTitle: 'Site 5', SiteUrl: 'https://onrocks.sharepoint.com/sites/site5' },
];

//#endregion
//#region Style Constants
const scanIcon: IIconProps = { iconName: 'ProfileSearch' };
const outerStackTokens: IStackTokens = { childrenGap: 5 };
const nonShrinkingStackItemStyles: IStackItemStyles = {
  root: {
    background: DefaultPalette.themeLighterAlt,
    color: DefaultPalette.white,
    display: 'flex',
    width: 300,
    padding: 12
  },
};
const pivotStyles: Partial<IStyleSet<IPivotStyles>> = {
  root: {
    marginBottom: 16,
  }
}
const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { marginBottom: 12 } };
const __Items: ICommandBarItemProps[] = [

  { key: 'message', text: '' }
]
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: strings.RemovePermissionTitle,
  closeButtonAriaLabel: strings.Cancel,
  subText: strings.RemovePermissionMessage,
};

//#endregion

interface IHubPermissionsState {
  ShowPanel: boolean;
  ShowDialog: boolean;
  SelectedUser: string;
}

export default class HubPermissions extends React.Component<IHubPermissionsProps, IHubPermissionsState> {
  private __farCommandItems: ICommandBarItemProps[] = [
    { key: 'grantPermission', text: 'Grant Permissions', iconProps: { iconName: 'UserSync' }, onClick: () => { this.setState({ ShowPanel: true }); } },
    { key: 'removePermission', text: 'Remove Permissions', iconProps: { iconName: 'UserRemove' }, onClick: () => { this.setState({ ShowDialog: true }); } }
  ]

  constructor(props: IHubPermissionsProps, state: IHubPermissionsState) {
    super(props,state);
    // Initialize the state of the component
    this.state = {
      ShowPanel: false,
      ShowDialog: false,
      SelectedUser: 'sadak@onrocks.onmicrosoft.com'
    };
  }
  public render(): React.ReactElement<IHubPermissionsProps> {
    return (
      <section className={`${styles.hubPermissions}`}>
        <Pivot linkSize={PivotLinkSize.large} styles={pivotStyles}>
          <PivotItem headerText="By Sites">
            <Stack horizontal tokens={outerStackTokens}>
              <Stack styles={nonShrinkingStackItemStyles}>
                <SearchBox placeholder="Search with site name" onSearch={newValue => console.log('value is ' + newValue)} styles={searchBoxStyles} />
                <DetailsList isHeaderVisible={false}
                  items={SiteWiseItems}
                  columns={SiteWiseColumns}
                  selectionMode={SelectionMode.single}
                  layoutMode={DetailsListLayoutMode.justified}
                />
              </Stack>
              <Stack>
                <CommandBar
                  items={__Items}
                  farItems={this.__farCommandItems}
                  ariaLabel="Permission actions"
                />
                <DetailsList
                  items={PeopleItems}
                  columns={PeopleColumns}
                  layoutMode={DetailsListLayoutMode.justified}
                />
              </Stack>
            </Stack>
          </PivotItem>
          <PivotItem headerText="By Users">
            <PeoplePicker showMax={1}  ></PeoplePicker>
            <CommandBar
              items={__Items}
              farItems={this.__farCommandItems}
              ariaLabel="Permission actions"
            />
            <DetailsList
              items={UserWiseItems}
              columns={UserWiseColumns}
              layoutMode={DetailsListLayoutMode.justified}
            />
          </PivotItem>
        </Pivot>
        <Panel
          isLightDismiss
          isOpen={this.state.ShowPanel} isHiddenOnDismiss={true}
          isFooterAtBottom={true}
          onDismiss={() => this.setState({ ShowPanel: false })}
          headerText="Sample panel"
          closeButtonAriaLabel="Close">
          <p>Content goes here.</p>
        </Panel>
        <Dialog
          hidden={!this.state.ShowDialog}
          onDismiss={() => this.setState({ ShowDialog: false })}
          dialogContentProps={dialogContentProps}
        >
          <DialogFooter>
          <Person personQuery={this.state.SelectedUser} view={ViewType.twolines} ></Person>
            <PrimaryButton onClick={() => this.setState({ ShowDialog: false })} text={strings.Cancel} />
            <ActionButton onClick={() => this.setState({ ShowDialog: false })} text={strings.RemovePermissionButton} />
          </DialogFooter>
        </Dialog>
      </section>
    );
  }
}