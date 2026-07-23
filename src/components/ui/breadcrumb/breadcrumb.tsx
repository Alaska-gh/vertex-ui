import { ChevronRight } from "lucide-react";
import {
  forwardRef,
  useMemo,
} from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  BREADCRUMB_DEFAULTS,
} from "./breadcrumb.constants";

import {
  breadcrumbItemVariants,
  breadcrumbListVariants,
} from "./breadcrumb.styles";

import type {
  BreadcrumbItem,
  BreadcrumbProps,
} from "./breadcrumb.types";


const DEFAULT_SEPARATOR = (
  <ChevronRight
    className="h-4 w-4 text-muted-foreground"
    aria-hidden="true"
  />
);


type VisibleItem = BreadcrumbItem | "collapsed";


export const VBreadcrumb = forwardRef<
  HTMLElement,
  BreadcrumbProps
>(
  (
    {
      items,
      separator,
      maxItems,
      collapsedLabel = BREADCRUMB_DEFAULTS.collapsedLabel,
      ariaLabel = BREADCRUMB_DEFAULTS.ariaLabel,
      size = BREADCRUMB_DEFAULTS.size,
      className,
    },
    ref,
  ) => {

    const visibleItems = useMemo<VisibleItem[]>(
      () => {
        if (
          !maxItems ||
          items.length <= maxItems
        ) {
          return items;
        }

        return [
          items[0],
          "collapsed",
          ...items.slice(-(maxItems - 1)),
        ];
      },
      [
        items,
        maxItems,
      ],
    );


    if (!items.length) {
      return null;
    }


    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          "w-full",
          className,
        )}
      >
        <ol
          className={breadcrumbListVariants({
            size,
          })}
        >
          {visibleItems.map(
            (
              item,
              index,
            ) => {
              const isLast =
                index === visibleItems.length - 1;


              return (
                <li
                  key={
                    item === "collapsed"
                      ? "collapsed"
                      : item.key
                  }
                  className="flex items-center gap-1.5"
                >
                  {item === "collapsed" ? (
                    <CollapsedItem
                      label={collapsedLabel}
                    />
                  ) : (
                    <BreadcrumbItemRenderer
                      item={item}
                    />
                  )}


                  <BreadcrumbSeparator
                    visible={!isLast}
                    separator={separator}
                  />
                </li>
              );
            },
          )}
        </ol>
      </nav>
    );
  },
);


function CollapsedItem({
  label,
}: {
  label: ReactNode;
}) {
  return (
    <span
      className={breadcrumbItemVariants({
        type: "current",
      })}
      aria-label="Additional breadcrumb items"
    >
      {label}
    </span>
  );
}


function BreadcrumbSeparator({
  visible,
  separator,
}: {
  visible: boolean;
  separator?: ReactNode;
}) {
  if (!visible) {
    return null;
  }


  return (
    <span
      aria-hidden="true"
      className="flex items-center"
    >
      {separator ?? DEFAULT_SEPARATOR}
    </span>
  );
}


function BreadcrumbItemRenderer({
  item,
}: {
  item: BreadcrumbItem;
}) {
  const icon = item.icon ? (
    <span
      className="shrink-0"
      aria-hidden="true"
    >
      {item.icon}
    </span>
  ) : null;


  switch (item.type) {
    case "link":
      return (
        <a
          href={item.href}
          aria-disabled={item.disabled || undefined}
          onClick={(event) => {
            if (item.disabled) {
              event.preventDefault();
            }
          }}
          className={breadcrumbItemVariants({
            type: "link",
            disabled: item.disabled,
          })}
        >
          {icon}
          {item.label}
        </a>
      );


    case "action":
      return (
        <button
          type="button"
          disabled={item.disabled}
          onClick={item.onClick}
          className={breadcrumbItemVariants({
            type: "action",
            disabled: item.disabled,
          })}
        >
          {icon}
          {item.label}
        </button>
      );


    case "current":
      return (
        <span
          aria-current="page"
          className={breadcrumbItemVariants({
            type: "current",
          })}
        >
          {icon}
          {item.label}
        </span>
      );


    default:
      return null;
  }
}


VBreadcrumb.displayName = "VBreadcrumb";