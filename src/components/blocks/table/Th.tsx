import React from 'react';
import cn from '@ably/ui/core/utils/cn';
import { HtmlComponentProps } from 'src/components/html-component-props';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

import { theader } from './Th.module.css';

const Th = (props: HtmlComponentProps<'th'>) => {
  return <th className={cn('px-4 uppercase ui-text-label1 pt-10 pb-5 sticky top-0 bg-white', theader)} {...props} />;
};

export default GenericHtmlBlock(Th);
