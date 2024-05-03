declare module '*.png' {
    const value: any;
    export = value;
  }
  
  declare module '*.jpg' {
    const value: any;
    export = value;
  }
  
  declare module '*.jpeg' {
    const value: any;
    export = value;
  }
  
  declare module '*.gif' {
    const value: any;
    export = value;
  }
  
  declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
    const src: string;
    export default src;
  }
  // emoji-mart.d.ts
declare module 'emoji-mart/dist-es/utils/emoji-index/nimble-emoji-index' {
  import { EmojiData, BaseEmoji, EmojiSkin } from 'emoji-mart';
  export { EmojiData, BaseEmoji, EmojiSkin };
}
