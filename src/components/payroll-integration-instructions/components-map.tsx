import ApiKeyInput from './api-input';
import DomainInput from './domain-input';
import VideoTutorial from './video-tutorial';
import React from 'react';

export const formComponentsMap: Record<
  string,
  React.ForwardRefExoticComponent<any> // eslint-disable-line @typescript-eslint/no-explicit-any
> = {
  apiKey: ApiKeyInput,
  domain: DomainInput,
};

export const otherComponentsMap: Record<
  string,
  React.FunctionComponent<any> // eslint-disable-line @typescript-eslint/no-explicit-any
> = {
  VideoTutorial,
};
