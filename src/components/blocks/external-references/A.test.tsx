import { render, screen } from '@testing-library/react';
import { A } from '.';

const gatsbyRootElement = {
  data: 'Lorem ipsum',
  attribs: { href: 'https://ably.com/docs/lorem' },
};
const normalRootElement = {
  data: 'Lorem ipsum',
  attribs: { href: 'https://www.example.com' },
};
const linkWithImageElement = {
  data: [
    {
      attribs: {
        alt: 'Presence representation',
        src: '/images/diagrams/Channels-Presence.gif',
      },
      data: [],
      name: 'img',
      type: 'tag',
    },
  ],
  attribs: { href: '/images/diagrams/Channels-Presence.gif', target: '_blank' },
};

describe('Different data provided to link elements results in different components', () => {
  it('Successfully renders Gatsby links', () => {
    render(<A {...gatsbyRootElement} />);

    expect(screen.getByTestId('link-internal')).toBeInTheDocument();
  });

  it('Successfully renders normal links', () => {
    const { container } = render(<A {...normalRootElement} />);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <a
        class="ui-link"
        data-testid="link-external"
        href="https://www.example.com"
      >
        Lorem ipsum
      </a>
    `);
  });

  it('Successfully renders image without <a> element', () => {
    render(<A {...linkWithImageElement} />);
    expect(screen.getByAltText('Presence representation')).toBeInTheDocument();
  });
});
