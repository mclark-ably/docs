import { ReactElement, useState } from 'react';
import cn from '@ably/ui/core/utils/cn';
import Icon from '@ably/ui/core/Icon';
import Html from '../Html';
import LocalLanguageAlternatives from '../wrappers/LocalLanguageAlternatives';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_PREFERRED_INTERFACE,
  DEFAULT_PREFERRED_LANGUAGE,
  REALTIME_SDK_INTERFACE,
  REST_SDK_INTERFACE,
} from '../../../../data/createPages/constants';
import { HtmlComponentProps, ValidReactElement } from '../../html-component-props';
import HtmlDataTypes from '../../../../data/types/html';
import { isString, every, reduce } from 'lodash/fp';
import { MultilineCodeContent } from './Code/MultilineCodeContent';
import { isArray, isEmpty } from 'lodash';
import { getTrimmedLanguage } from 'src/components/common';
import { languageLabel } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';
import { useLayoutContext } from 'src/contexts/layout-context';

type PreProps = HtmlComponentProps<'pre'> & {
  language: string;
  languages?: string[];
  altData?: Record<string, string | HtmlComponentProps<ValidReactElement>[] | null>;
  isSDKInterface?: boolean;
  realtimeAltData?: Record<string, string | HtmlComponentProps<ValidReactElement>[] | null>;
  restAltData?: Record<string, string | HtmlComponentProps<ValidReactElement>[] | null>;
};

const getLanguageLabel = (lang: string) => {
  const label = languageLabel(lang as LanguageKey);
  let labelPart: string | string[] = '';

  if (label) {
    labelPart = label.split(' ');
    if (Array.isArray(labelPart) && labelPart.length > 1) {
      return labelPart.slice(0, -1).join(' ');
    } else {
      return labelPart;
    }
  }
  return languageLabel();
};

const Pre = ({
  data,
  languages,
  altData,
  isSDKInterface = false,
  realtimeAltData,
  restAltData,
  attribs,
}: PreProps): ReactElement => {
  const { activePage } = useLayoutContext();
  const pageLanguage = activePage.language;

  /*  selectedInterfaceTab useState  */
  const [selectedSDKInterfaceTab, setSelectedSDKInterfaceTab] = useState(DEFAULT_PREFERRED_INTERFACE);
  const [previousSDKInterfaceTab, setPreviousSDKInterfaceTab] = useState('');

  /* only pass the languages that are SDK interface active */
  if (isSDKInterface && languages) {
    languages = getLanguagesSDKInterface(languages, selectedSDKInterfaceTab);
  }

  const codeClassName = 'bg-cool-black text-white p-0 rounded-lg relative max-w-[calc(100vw-48px)] sm:max-w-full';

  const hasCode =
    languages?.some((lang) => getTrimmedLanguage(lang) === pageLanguage) || pageLanguage === DEFAULT_LANGUAGE;
  const shouldDisplayTip = !hasCode && languages?.length !== undefined;
  const withModifiedClassname = {
    ...attribs,
    className: codeClassName,
  };

  const dataTreatedAsCode = data && !isString(data) && every((element) => element.type === HtmlDataTypes.text, data);

  if (dataTreatedAsCode) {
    // We know that the first child's data is a string because we've confirmed the element type in dataTreatedAsCode
    const stringToRender = reduce((acc, curr) => acc.concat((curr.data as string) ?? ''), '', data);

    return (
      <pre {...attribs} className={codeClassName}>
        <div className="overflow-auto relative p-4">
          <MultilineCodeContent
            dataContainsKey={false}
            contentWithObfuscatedKey={stringToRender}
            contentWithKey={stringToRender}
            content={stringToRender}
            language={'plaintext'}
          />
        </div>
      </pre>
    );
  }
  // This fixes an issue where paragraphs are added into <pre> elements, which resets the font stylings to black
  // rendering the data unreadable.

  /* When pageLoad and realtime is not present, then by default display Rest */
  if (altData) {
    /* we need to get all the realtime data, so we can check if there is realtime languages while being in the rest tab */
    const allRealtimeData = Object.entries(altData)
      .map(([language]) =>
        language && language.includes(`${REALTIME_SDK_INTERFACE}_`) ? language.split('_', 2)[1] : '',
      )
      .filter((n: string) => n);

    const ifDataHasRealtimeLangWithNoActiveLang = !isEmpty(allRealtimeData) && !allRealtimeData.includes(pageLanguage);

    const isNoRealtimeLangAndPrevNotRest =
      ifDataHasRealtimeLangWithNoActiveLang && previousSDKInterfaceTab != REST_SDK_INTERFACE;

    /* check is Realtime is not present at all but there are REST language when page loads first time, then the REST tab should be active */
    if (
      selectedSDKInterfaceTab === REALTIME_SDK_INTERFACE &&
      !isEmpty(altData) &&
      isEmpty(allRealtimeData) &&
      previousSDKInterfaceTab === ''
    ) {
      setSelectedSDKInterfaceTab(REST_SDK_INTERFACE);
    }

    /* check is Realtime has no language but there are REST language , then the REST tab should be active and Realtime tab can still be clicked */
    if (selectedSDKInterfaceTab === REALTIME_SDK_INTERFACE && !isEmpty(restAltData) && isNoRealtimeLangAndPrevNotRest) {
      setSelectedSDKInterfaceTab(REST_SDK_INTERFACE);
    }
  }

  /* In passing HTML selected data, make sure to pass realtimeAltData or restAltData  sdkInterfaceData if present, if not just pass data */
  const sdkInterfaceData = selectedSDKInterfaceTab === REALTIME_SDK_INTERFACE ? realtimeAltData : restAltData;
  const newDataWithSDKOrNot =
    isSDKInterface && isArray(sdkInterfaceData) && !isEmpty(sdkInterfaceData) ? sdkInterfaceData : data;
  let dataWithoutPTags = isArray(newDataWithSDKOrNot)
    ? newDataWithSDKOrNot.map((child) =>
        child.name === HtmlDataTypes.p ? { ...child, name: HtmlDataTypes.div } : child,
      )
    : newDataWithSDKOrNot;

  /* Cleanup if the language passed has realtime or rest, so it will highlight the code correctly */
  if (isSDKInterface && dataWithoutPTags && typeof dataWithoutPTags !== 'string') {
    dataWithoutPTags = dataWithoutPTags.map((child) => ({
      ...child,
      attribs: {
        ...child.attribs,
        lang: cleanIfLanguageHasSDKInterface(child.attribs.lang),
      },
    }));
  }

  const languageLabel = getLanguageLabel(pageLanguage);
  return (
    <div
      className={cn('my-8', {
        'p-4 bg-light-grey rounded-lg': shouldDisplayTip,
      })}
    >
      {shouldDisplayTip && (
        <aside className="mb-4 flex justify-between items-start">
          <div className="mt-0.5">
            <Icon name="icon-gui-information-circle-micro" size="1rem" />
          </div>
          <div className="ml-2 leading-tight">
            You&apos;re currently viewing the <span className="font-semibold">{languageLabel ?? pageLanguage}</span>{' '}
            docs. There either isn&apos;t a {languageLabel ?? pageLanguage} code sample for this example, or this
            feature isn&apos;t supported in {languageLabel ?? pageLanguage}. Switch language to view this example in a
            different language, or{' '}
            <a className="ui-link" href="/docs/sdks">
              check which SDKs support this feature.
            </a>
          </div>
        </aside>
      )}
      <pre {...withModifiedClassname}>
        {languages ? (
          <LocalLanguageAlternatives
            languages={languages}
            data={altData}
            initialData={dataWithoutPTags}
            isSDKInterface={isSDKInterface}
            selectedSDKInterfaceTab={selectedSDKInterfaceTab}
            setSelectedSDKInterfaceTab={setSelectedSDKInterfaceTab}
            setPreviousSDKInterfaceTab={setPreviousSDKInterfaceTab}
            selectedPageLanguage={pageLanguage || DEFAULT_PREFERRED_LANGUAGE}
          />
        ) : (
          <Html data={dataWithoutPTags} />
        )}
      </pre>
    </div>
  );
};

export default Pre;

export const cleanIfLanguageHasSDKInterface = (language: string) =>
  language.includes(`${REALTIME_SDK_INTERFACE}_`) || language.includes(`${REST_SDK_INTERFACE}_`)
    ? language.split('_', 2)[1]
    : language;

const getLanguagesSDKInterface = (allLanguage: string[], selectedSDKInterface: string) =>
  allLanguage.map((language) => (language.includes(`${selectedSDKInterface}_`) ? language : '')).filter((s) => s);
