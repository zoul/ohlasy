import React from "react";
import Markdoc from "@markdoc/markdoc";
import { photo } from "src/markdoc-schema";

export type ArticleBodyProps = {
  /** Markdoc source */
  src: string;
};

export const ArticleContent = ({ src }: ArticleBodyProps) => {
  const syntaxTree = Markdoc.parse(src);
  const content = Markdoc.transform(syntaxTree, { tags: { photo } });
  const node = Markdoc.renderers.react(content, React, {
    components: { Photo },
  });
  return <>{node}</>;
};

type PhotoProps = {
  src: string;
  alt?: string;
  author?: string;
  caption?: string;
};

const Photo = ({ src, alt, author, caption }: PhotoProps) => (
  <div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={src}
      alt={alt ?? caption ?? ""}
      style={{ width: "400px", display: "block" }}
    />
    {author && <span>foto: {author}</span>}
  </div>
);
