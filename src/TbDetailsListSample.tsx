import * as React from "react";
import { TbGrid, CheckboxCell, TextCell } from "tubular-fabric";
import { columns } from "./ColumnsDefinition";
import { useGridRefresh } from "tubular-react-common/dist/useGridRefresh";
import { ColumnDataType } from "tubular-common";
import { ICommandBarItemProps } from "@fluentui/react/lib/CommandBar";
import { IColumn } from "@fluentui/react";
const dataSource = "https://tubular.azurewebsites.net/api/orders/paged";

const getRenderByDataType = (item: any, column: any): React.ReactNode => {
  switch (column.tb.dataType) {
    case ColumnDataType.Boolean:
      return <CheckboxCell checked={!!item[column.fieldName]} />;
    case ColumnDataType.Numeric:
      return <TextCell textAlign="Right" value={item[column.fieldName]} />;
    default:
      return <TextCell value={item[column.fieldName]} />;
  }
};

export const TbDetailsListSample: React.FunctionComponent = () => {
  const [refresh, forceRefresh] = useGridRefresh();
  const onForceRefresh = () => forceRefresh();

  const commandItems: ICommandBarItemProps[] = [
    {
      key: "newItem",
      text: "New",
      cacheKey: "myCacheKey", // changing this key will invalidate this item's cache
      iconProps: { iconName: "Add" },
      subMenuProps: {
        items: [
          {
            key: "emailMessage",
            text: "Email message",
            iconProps: { iconName: "Mail" }
          },
          {
            key: "calendarEvent",
            text: "Calendar event",
            iconProps: { iconName: "Calendar" }
          }
        ]
      }
    },
    {
      key: "forceRefresh",
      text: "Force Refresh",
      onClick: onForceRefresh
    }
  ];

  const onRenderItemColumn = (item: any, index: number, column: IColumn) => {
    if (column.key === "IsShipped") return <span>NO</span>;

    return getRenderByDataType(item, column);
  };

  return (
    <TbGrid
      columns={columns}
      source={dataSource}
      onRenderItemColumn={onRenderItemColumn}
      options={{
        deps: [refresh],
        filterable: true,
        toggleColumns: true,
        commandBarItems: commandItems,
        searchable: true,
        recordCounter: true,
        pagination: {
          itemsPerPage: 100
        }
      }}
    />
  );
};
