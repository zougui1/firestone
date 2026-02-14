"use client";

import { useMemo } from "react";

import { useIsMobile } from "~/ui/hooks";

import { Select } from "../primitives";

export interface ZSelectItem extends Omit<Select.ItemProps, "value" | "label"> {
  label: React.ReactNode;
  value: string;
}

export interface ZSelectGroup extends Omit<Select.GroupProps, "label"> {
  label?: React.ReactNode;
  items: ZSelectItem[];
}

export interface ZSelectProps<
  Value,
  Multiple extends boolean | undefined = false,
> extends Omit<Select.RootProps<Value, Multiple>, "items"> {
  items: Record<string, React.ReactNode> | ZSelectItem[] | ZSelectGroup[];
}

const normalizeItems = (items: ZSelectProps<unknown>["items"]) => {
  if (Array.isArray(items)) {
    const groups: ZSelectGroup[] = [];
    const list: ZSelectItem[] = [];

    for (const item of items) {
      if ("items" in item) {
        groups.push(item);
      } else {
        list.push(item);
      }
    }

    return list.length ? [{ items: list }] : groups;
  }

  const list: ZSelectItem[] = [];

  for (const [value, label] of Object.entries(items)) {
    list.push({ value, label });
  }

  return [{ items: list }];
};

const useItems = (items: ZSelectProps<unknown>["items"]) => {
  const groups = useMemo(() => {
    return normalizeItems(items);
  }, [items]);

  const itemMap = useMemo(() => {
    const map: Record<string, React.ReactNode> = {};

    for (const group of groups) {
      for (const item of group.items) {
        map[item.value] = item.label;
      }
    }

    return map;
  }, [groups]);

  return { groups, itemMap };
};

function ZSelectMobile<Value, Multiple extends boolean | undefined = false>({
  items,
  ...props
}: ZSelectProps<Value, Multiple>) {
  const { groups, itemMap } = useItems(items);
  return null;
}

function ZSelectDesktop<Value, Multiple extends boolean | undefined = false>({
  items,
  ...props
}: ZSelectProps<Value, Multiple>) {
  const { groups, itemMap } = useItems(items);

  const renderItems = (items: ZSelectItem[]) => {
    return items.map(({ label, ...item }) => (
      <Select.Item {...item} key={item.value}>
        {item.children ?? label}
      </Select.Item>
    ));
  };

  const renderGroupContent = (group: ZSelectGroup) => {
    if (group.children) return group.children;

    return (
      <>
        {group.label && <Select.GroupLabel>{group.label}</Select.GroupLabel>}
        {renderItems(group.items)}
      </>
    );
  };

  const renderContent = () => {
    const [firstGroup] = groups;

    if (groups.length === 1 && !firstGroup?.label) {
      return renderItems(firstGroup?.items ?? []);
    }

    return groups.map(({ children, items, ...group }, index) => (
      <Select.Group key={index} {...props}>
        {renderGroupContent({ children, items, ...group })}
      </Select.Group>
    ));
  };

  return (
    <Select.Root items={itemMap}>
      <Select.Trigger>
        <Select.Value />
      </Select.Trigger>

      <Select.Content sideOffset={8}>{renderContent()}</Select.Content>
    </Select.Root>
  );
}

export function ZSelect<Value, Multiple extends boolean | undefined = false>(
  props: ZSelectProps<Value, Multiple>,
) {
  const isMobile = useIsMobile();

  if (isMobile) return <ZSelectMobile {...props} />;
  return <ZSelectDesktop {...props} />;
}
