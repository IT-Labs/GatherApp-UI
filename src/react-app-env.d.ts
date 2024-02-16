/// <reference types="react-scripts" />
import type {} from "react-select/base";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly REACT_APP_CLIENT_ID: string;
      readonly REACT_APP_AUTHORITY: string;
      readonly REACT_APP_REDIRECT_URL: string;
      readonly REACT_APP_API_BASE_URL: string;
      readonly REACT_APP_TILE_LAYER_URL: string;
      readonly REACT_APP_NOMINATIM_BASE_URL: string;
      readonly REACT_APP_RAPID_API_URL: string;
      readonly REACT_APP_PLACEHOLDER_EVENT_BANNER_URL: string;
      readonly REACT_APP_PLACEHOLDER_PROFILE_IMAGE_URL: string;
    }
  }
}

// This import is necessary for module augmentation.
// It allows us to extend the 'Props' interface in the 'react-select/base' module
// and add our custom properties 'width' and "label" to it.

declare module "react-select/base" {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    width?: string;
    label?: string;
  }
}

export {};
