import { useMemo, useState, useEffect, useRef } from 'react';
import { navigate, useLocation } from '@reach/router';
import cn from '@ably/ui/core/utils/cn';
import Accordion from '@ably/ui/core/Accordion';
import { AccordionData } from '@ably/ui/core/Accordion/types';
import Icon from '@ably/ui/core/Icon';
import { throttle } from 'lodash';

import { productData } from 'src/data';
import { NavProduct, NavProductContent, NavProductPages } from 'src/data/nav/types';
import {
  commonAccordionOptions,
  composeNavLinkId,
  hierarchicalKey,
  PageTreeNode,
  sidebarAlignmentClasses,
  sidebarAlignmentStyles,
} from './utils/nav';
import Link from '../Link';
import { useLayoutContext } from 'src/contexts/layout-context';

type ContentType = 'content' | 'api';

type LeftSidebarProps = {
  inHeader?: boolean;
};

const NavPage = ({
  depth,
  page,
  indices,
  type,
  indentLinks,
  inHeader,
}: {
  depth: number;
  page: NavProductPages;
  indices: number[];
  type: ContentType;
  inHeader: boolean;
  indentLinks?: boolean;
}) => {
  const location = useLocation();
  const linkId = 'link' in page ? composeNavLinkId(page.link) : undefined;
  const { activePage } = useLayoutContext();
  const treeMatch = indices.every((value, index) => value === activePage.tree[index]?.index);

  if ('link' in page) {
    const language = new URLSearchParams(location.search).get('lang');
    const pageActive = treeMatch && page.link === activePage.page.link;

    return (
      <Link
        key={hierarchicalKey(page.link, depth, activePage.tree)}
        id={linkId}
        className={cn({
          'block ui-text-label2 leading-relaxed md:leading-snug md:ui-text-label4 text-neutral-1000 dark:text-neutral-300 md:text-neutral-900 dark:md:text-neutral-400 transition-colors hover:text-neutral-1300 active:text-neutral-800 focus-base':
            true,
          '!font-semibold': !pageActive,
          'text-neutral-900': !pageActive && type === 'content',
          'text-neutral-1000': !pageActive && type === 'api',
          '!font-bold !text-neutral-1300': pageActive,
          'pl-3': indentLinks,
        })}
        target={page.external ? '_blank' : undefined}
        rel={page.external ? 'noopener noreferrer' : undefined}
        to={language ? `${page.link}?lang=${language}` : page.link}
      >
        {page.name}
        {page.external ? <Icon name="icon-gui-arrow-top-right-on-square-outline" additionalCSS="ml-1" /> : null}
      </Link>
    );
  } else {
    return (
      <Accordion
        key={hierarchicalKey(page.name, depth, activePage.tree)}
        data={[
          {
            name: page.name,
            content: page.pages.map((subPage, subPageIndex) => (
              <div className="mb-2 first:mt-2" key={subPage.name}>
                <NavPage
                  page={subPage}
                  indentLinks
                  indices={[...indices, subPageIndex]}
                  type={type}
                  depth={depth + 1}
                  inHeader={inHeader}
                />
              </div>
            )),
          },
        ]}
        {...commonAccordionOptions(page, treeMatch ? 0 : undefined, false, inHeader)}
      />
    );
  }
};

const renderProductContent = (
  content: NavProductContent[],
  type: ContentType,
  inHeader: boolean,
  productIndex: number,
) =>
  content.map((productContent, productContentIndex) => (
    <div className="flex flex-col gap-2.5 md:gap-2" key={productContent.name}>
      <div className="ui-text-overline2 text-neutral-700">{productContent.name}</div>
      {productContent.pages.map((page, pageIndex) => (
        <NavPage
          key={'name' in page ? page.name : `page-group-${pageIndex}`}
          page={page}
          indices={[productIndex, productContentIndex, pageIndex]}
          type={type}
          depth={2}
          inHeader={inHeader}
        />
      ))}
    </div>
  ));

const constructProductNavData = (activePageTree: PageTreeNode[], inHeader: boolean): AccordionData[] => {
  const navData: AccordionData[] = Object.entries(productData).map(([productKey, productObj], index) => {
    const product = productObj.nav as NavProduct;
    const apiReferencesId = `${productKey}-api-references`;

    return {
      name: product.name,
      icon:
        activePageTree[0]?.page.name === product.name
          ? { name: product.icon.open, css: 'text-orange-600' }
          : { name: product.icon.closed },
      onClick: () => {
        // When a product is clicked, find and scroll to any open accordion element
        if (typeof document !== 'undefined') {
          // Use setTimeout to ensure the DOM has updated after the click and animation has completed
          setTimeout(() => {
            const targetAccordion = window.innerWidth >= 1040 ? 'left-nav' : 'mobile-nav';
            const menuContainer = document.getElementById(targetAccordion);
            const openAccordion: HTMLElement | null = menuContainer
              ? menuContainer.querySelector('[data-state="open"] > button')
              : null;

            if (openAccordion) {
              menuContainer?.scrollTo({
                top: openAccordion.offsetTop,
                behavior: 'smooth',
              });
            }
          }, 200);
        }
      },
      content: (
        <div key={product.name} className="flex flex-col gap-5 px-4 pt-3">
          {product.showJumpLink ? (
            <a
              href="#"
              className="text-gui-blue-default-light text-[11px]"
              onClick={(e) => {
                e.preventDefault();
                if (typeof document !== 'undefined') {
                  const element = document.getElementById(apiReferencesId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                }
              }}
            >
              Jump to API references
            </a>
          ) : null}
          {renderProductContent(product.content, 'content', inHeader, index)}
          {product.api.length > 0 ? (
            <div
              id={apiReferencesId}
              className="flex flex-col gap-2.5 md:gap-2 rounded-lg bg-neutral-100 border border-neutral-300 p-4 mb-6 md:-mx-4"
            >
              {renderProductContent(product.api, 'api', inHeader, index)}
            </div>
          ) : null}
        </div>
      ),
    };
  });

  // Add a Home entry at the start of navData if inHeader is true
  if (inHeader) {
    navData.unshift({
      name: 'Home',
      content: null,
      onClick: () => {
        navigate('/docs');
      },
      interactive: false,
    });
  }

  return navData;
};

const LeftSidebar = ({ inHeader = false }: LeftSidebarProps) => {
  const { activePage } = useLayoutContext();
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScrollbar = throttle(() => {
      if (sidebarRef.current) {
        setHasScrollbar(sidebarRef.current.offsetWidth > sidebarRef.current.clientWidth);
      }
    }, 150);

    checkScrollbar();
    window.addEventListener('resize', checkScrollbar);

    return () => {
      window.removeEventListener('resize', checkScrollbar);
    };
  }, []);

  const productNavData = useMemo(() => constructProductNavData(activePage.tree, inHeader), [activePage.tree, inHeader]);

  return (
    <Accordion
      ref={sidebarRef}
      className={cn(
        !inHeader && [sidebarAlignmentClasses, 'hidden md:block md:-mx-4'],
        'overflow-y-auto',
        hasScrollbar ? 'md:pr-2' : 'md:pr-4',
      )}
      style={sidebarAlignmentStyles}
      id={inHeader ? 'mobile-nav' : 'left-nav'}
      data={productNavData}
      {...commonAccordionOptions(null, activePage.tree[0]?.index, true, inHeader)}
    />
  );
};

export default LeftSidebar;
