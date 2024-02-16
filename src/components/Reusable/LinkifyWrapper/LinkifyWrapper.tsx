/* eslint-disable react/jsx-no-bind */

import Linkify from "react-linkify";

type Props = {
  children: React.ReactNode;
};

const LinkifyWrapper = ({ children }: Props) => {
  function blueLinkifyDecorator(href: any, text: any, key: any) {
    return (
      <a
        href={href}
        key={key}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--primary-color-green)" }}
      >
        {text}
      </a>
    );
  }
  return (
    <Linkify componentDecorator={blueLinkifyDecorator}>{children}</Linkify>
  );
};

export default LinkifyWrapper;
