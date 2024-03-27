import React from "react";
import { Fragment, ReactNode } from "react";

/**
 * Analyzes the components in the given React element and returns an array of component information.
 *
 * @param element - The React element to analyze.
 * @param level - The nesting level of the current element (default: 0).
 * @returns An array of component information objects.
 */
export function analyzeComponents({
  element,
  level = 0,
}: {
  element: ReactNode;
  level?: number;
}): {
  type: string;
  key: string;
  id: string;
  level: number;
  children: {
    key: string;
    id: string;
    level: number;
    type: string;
  }[];
}[] {
  const components: {
    type: string;
    key: string;
    id: string;
    level: number;
    children: {
      key: string;
      id: string;
      level: number;
      type: string;
    }[];
  }[] = [];

  React.Children.forEach(element, (child, index) => {
    if (React.isValidElement(child)) {
      const id = child.props.id || `element-${index}`;
      const newChild = React.cloneElement(child, {
        id: id,
      } as React.Attributes);

      if (child.type === Fragment) {
        components.push(
          ...analyzeComponents({
            element: (newChild.props as React.PropsWithChildren<any>).children,
            level,
          })
        );
      } else if (newChild.key) {
        components.push({
          key: newChild.key as string,
          id: id,
          level: level,
          children: [
            ...analyzeComponents({
              element: (newChild.props as React.PropsWithChildren<any>)
                .children,
              level: level + 1,
            }),
          ],
          type: newChild.type as string,
        });
      }
    }
  });
  return components;
}

/**
 * Renders a component recursively.
 *
 * @param component - The component object to render.
 * @returns The rendered JSX element.
 */
export function renderComponent({
  component,
}: {
  component: {
    key: string;
    id: string;
    level: number;
    type: string;
    children: { key: string; id: string; level: number; type: string }[];
  };
}): React.JSX.Element {
  return (
    <li
      key={component.key}
      id={component.id}
      className={`flex flex-col justify-between items-center w-auto p-2`}
      style={{ marginLeft: `${Number(component.level) * 1}rem` }}
    >
      <p className={`text-lg font-bold w-[100%] `}>
        {component.type + " " + component.id.split("-")[0]}{" "}
      </p>
      <div className={`flex flex-row gap-2`}></div>
      {component.children.length > 0 && (
        <ul className="flex flex-col gap-1 w-[100%]">
          {component.children.map((child: any, index: any) =>
            renderComponent({ component: child })
          )}
        </ul>
      )}
    </li>
  );
}

/**
 * Renders a component tree based on the provided components array.
 *
 * @param components - An array of components to render.
 * @returns The rendered component tree as a JSX element.
 */
export function renderComponentTree({
  components,
}: {
  components: {
    key: string;
    id: string;
    level: number;
    type: string;
    children: { key: string; id: string; level: number; type: string }[];
  }[];
}): React.JSX.Element {
  return (
    <ul className="flex flex-col h-10 gap-1">
      {components.map((component) => renderComponent({ component }))}
    </ul>
  );
}
