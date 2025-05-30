import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import { ActivePage, determineActivePage } from 'src/components/Layout/utils/nav';
import { productData } from 'src/data';
import { LanguageKey } from 'src/data/languages/types';
import { languageData, languageInfo } from 'src/data/languages';
import { PageContextType } from 'src/components/Layout/Layout';

/**
 * LayoutContext
 *
 * activePage - The navigation tree that leads to the current page, and a list of languages referenced on the page.
 * setLanguage - Set the active language for the current page.
 */

export const DEFAULT_LANGUAGE = 'javascript';

const LayoutContext = createContext<{
  activePage: ActivePage;
  setLanguage: (language: LanguageKey) => void;
}>({
  activePage: {
    tree: [],
    page: { name: '', link: '' },
    languages: [],
    language: DEFAULT_LANGUAGE,
    product: null,
  },
  setLanguage: (language) => {
    console.warn('setLanguage called without a provider', language);
  },
});

export const LayoutProvider: React.FC<PropsWithChildren<{ pageContext: PageContextType }>> = ({
  children,
  pageContext,
}) => {
  const location = useLocation();
  const [languages, setLanguages] = useState<LanguageKey[]>(pageContext?.languages ?? []);
  const [language, setLanguage] = useState<LanguageKey>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const languageBlocks = document.querySelectorAll('.docs-language-navigation');

    if (languageBlocks.length > 0) {
      const languagesSet = new Set<LanguageKey>();

      document.querySelectorAll('.docs-language-navigation').forEach((element) => {
        const languages = element.getAttribute('data-languages');
        if (languages) {
          languages.split(',').forEach((language) => languagesSet.add(language as LanguageKey));
        }
      });

      setLanguages(Array.from(languagesSet));
    }
  }, [location.pathname]);

  const activePage = useMemo(() => {
    const activePageData = determineActivePage(productData, location.pathname);
    return activePageData
      ? {
          ...activePageData,
          languages: activePageData.page.languages ?? languages,
          language,
        }
      : {
          tree: [],
          page: { name: '', link: '' },
          languages: [],
          language,
          product: null,
        };
  }, [location.pathname, languages, language]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const langParam = params.get('lang') as LanguageKey;

    if (langParam && Object.keys(languageInfo).includes(langParam)) {
      setLanguage(langParam);
    } else if (activePage.product && activePage.languages.length > 0) {
      const productLanguages = languageData[activePage.product];
      const defaultLanguage =
        Object.keys(productLanguages ?? []).filter((lang) => activePage.languages.includes(lang))[0] ??
        DEFAULT_LANGUAGE;

      setLanguage(defaultLanguage);
    }
  }, [location.search, activePage.product, activePage.languages]);

  return (
    <LayoutContext.Provider
      value={{
        activePage,
        setLanguage,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};
