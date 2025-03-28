import { SearchBar } from '../../../SearchBar';
import { ContentCardWithoutImage } from './types';

export const HeroCard = ({ title, content }: ContentCardWithoutImage) => (
  <div className="flex flex-col items-center mt-88">
    <div className="text-center">
      <h1 className="ui-text-h1">{title}</h1>
      <p className="ui-text-sub-header mt-24">{content}</p>
    </div>
    <SearchBar
      displayLocation="homepage"
      extraStyleOptions={{
        wrapperContainer: { width: '100%', maxWidth: '500px', marginTop: '2rem' },
        inputContainer: { width: '100%', maxWidth: '500px' },
      }}
    />
  </div>
);
