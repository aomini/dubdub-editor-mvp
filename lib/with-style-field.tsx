"use client";

import React from "react";
import { generateCSS, type ResponsiveStyle } from "./responsive-style";
import { StyleField } from "../components/style-field/style-field";

const STYLE_FIELD_KEY = "style";

function StyledOutput({
  rs,
  children,
  direct,
}: {
  rs: ResponsiveStyle | undefined;
  children: React.ReactNode;
  direct?: boolean;
}) {
  const reactId = React.useId();
  const id = reactId.replace(/:/g, "");
  const css = rs ? generateCSS(rs, id) : "";

  const styleTag = css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null;

  if (direct && React.isValidElement(children)) {
    return (
      <>
        {styleTag}
        {React.cloneElement(children as React.ReactElement<any>, { "data-rs": id })}
      </>
    );
  }

  return (
    <>
      {styleTag}
      <div data-rs={id}>{children}</div>
    </>
  );
}

export function withStyleField(
  config: any,
  opts?: { applyStyleDirect?: boolean },
): any {
  const originalRender = config.render;
  const originalFields = config.fields ?? {};
  const originalDefaults = config.defaultProps ?? {};
  const direct = opts?.applyStyleDirect ?? false;

  return {
    ...config,
    fields: {
      ...originalFields,
      [STYLE_FIELD_KEY]: {
        type: "custom",
        render: ({ value, onChange }: { value: any; onChange: (v: any) => void }) => (
          <StyleField
            value={(value ?? {}) as ResponsiveStyle}
            onChange={(next) => onChange(next)}
          />
        ),
      },
    },
    defaultProps: {
      ...originalDefaults,
      [STYLE_FIELD_KEY]: {},
    },
    render: (props: any) => {
      const { style: rs, ...rest } = props;
      return (
        <StyledOutput rs={rs as ResponsiveStyle | undefined} direct={direct}>
          {originalRender(rest)}
        </StyledOutput>
      );
    },
  };
}
