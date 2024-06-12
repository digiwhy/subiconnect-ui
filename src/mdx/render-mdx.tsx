import { evaluateSync, type EvaluateOptions } from '@mdx-js/mdx';
import React from 'react';
import * as runtime from 'react/jsx-runtime';

type RenderMDXProps = {
  mdxString: string;
  components?: {
    [x: string]: React.FC<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};

const jsxWrapper = (
  type: React.ElementType<unknown>,
  props: unknown,
  key?: React.Key,
): React.ReactElement<unknown> => runtime.jsx(type, props, key);

const jsxsWrapper = (
  type: React.ElementType<unknown>,
  props: unknown,
  key?: React.Key,
): React.ReactElement<unknown> => runtime.jsxs(type, props, key);

export const RenderMDX: React.FC<RenderMDXProps> = React.memo(
  ({ mdxString, components }) => {
    const { default: Content } = evaluateSync(mdxString, {
      ...runtime,
      jsx: jsxWrapper,
      jsxs: jsxsWrapper,
    } as EvaluateOptions);

    return <Content components={components} />;
  },
);

RenderMDX.displayName = 'RenderMDX';
