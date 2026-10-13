import type { AnchorHTMLAttributes } from 'react';
import { navigate } from '../Root';
import { pagePath } from '../utils/urls';

export default function SiteLink({ href = '/', onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const internal = href.startsWith('/') && !href.startsWith('//');
  const url = internal && !/[?#]/.test(href) ? pagePath(href) : href;
  return <a {...props} href={url} onClick={(event) => {
    onClick?.(event);
    if (!internal || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target || props.download) return;
    event.preventDefault();
    navigate(url);
  }} />;
}
