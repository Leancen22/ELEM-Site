import * as React from 'react';
import { Link as IntlLink } from '@/i18n/navigation';

type IntlLinkProps = React.ComponentProps<typeof IntlLink>;
type IntlHref = IntlLinkProps['href'];

export type LinkProps = Omit<IntlLinkProps, 'href'> & { href: string };

export function Link({ href, ...props }: LinkProps) {
  const hashIndex = href.indexOf('#');
  const target: IntlHref =
    hashIndex === -1
      ? (href as IntlHref)
      : ({
          pathname: href.slice(0, hashIndex),
          hash: href.slice(hashIndex),
        } as unknown as IntlHref);

  return <IntlLink href={target} {...props} />;
}
