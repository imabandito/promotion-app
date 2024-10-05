/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ArticlePreview } from './ArticlePreview';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useDeleteArticleMutation } from '../../store/api/articlesApi';
import { format, formatDistanceToNow } from 'date-fns';
import { IArticle } from '../../store/reducers/articlesSlice';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: ()=>mockedUsedNavigate,
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('../../store/api/articlesApi', () => ({
  useDeleteArticleMutation: jest.fn(),
}));


jest.mock('date-fns', () => {
  const original = jest.requireActual('date-fns');
  return {
    ...jest.requireActual('date-fns'),
    format: jest.fn(original.format),
    formatDistanceToNow: jest.fn(original.formatDistanceToNow),
  };
});

const mockStore = configureStore([]);

describe('ArticlePreview Component', () => {
  let store: any;
  let mockDeleteArticle: jest.Mock;

  const article: IArticle = {
    id: 'articleId',
    image: 'image.png',
    category: { id: 'media', name: 'media' },
    date: new Date().toISOString(),
    title: 'Test Article',
    text: 'Article Text',
    author: {
      id: 'vasya',
      name: 'Vasya',
      lastName: 'Stecenko',
      avatar: 'avatar.png',
      email: 'vasya@mail.com',
    },
  };

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: { id: 'vasya' },
      },
    });

    mockDeleteArticle = jest.fn().mockResolvedValue({});
    (useDeleteArticleMutation as jest.Mock).mockReturnValue([
      mockDeleteArticle,
    ]);
  });

  const renderComponent = (articleProp = article) => {
    return render(
      <Provider store={store}>
        <Router>
          <ArticlePreview article={articleProp} />
        </Router>
      </Provider>
    );
  };

  test('renders ArticlePreview', () => {
    renderComponent();

    const article = screen.getByTestId('article-preview')
    expect(article).toBeInTheDocument();
  });

  test('renders all article details correctly', () => {
    renderComponent();

    const image = screen.getByAltText('article') as HTMLImageElement;
    expect(image.src).toContain('image.png');

    expect(screen.getByText('media')).toBeInTheDocument();
    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Article Text')).toBeInTheDocument();
    expect(screen.getByText('Vasya Stecenko')).toBeInTheDocument();

    const readMoreLink = screen.getByText('Read more');
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink.closest('a')).toHaveAttribute('href', '/articles/articleId');
  });

  test('renders ArticleMenu when user is the author', () => {
    renderComponent();

    const articleMenu = screen.getByTestId('article-menu');
    expect(articleMenu).toBeInTheDocument();
    fireEvent.click(articleMenu.querySelector('button')!);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('does not render ArticleMenu when user is not the author', () => {
    store = mockStore({
      auth: {
        user: { id: 'impostor' },
      },
    });

    renderComponent();

    const articleMenu = screen.queryByTestId('article-menu');
    expect(articleMenu).not.toBeInTheDocument();
  });

  test('navigates to edit page when Edit is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByTestId('article-menu').querySelector('button')!);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/editarticle/articleId');
  });

  test('calls deleteArticle mutation when Delete is clicked', async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId('article-menu').querySelector('button')!);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteArticle).toHaveBeenCalledWith('articleId');
    });
  });

  test('formats date correctly if within one month', () => {
    const recentDate = new Date();
    (formatDistanceToNow as jest.Mock).mockReturnValue('2 days ago');
    renderComponent({ ...article, date: recentDate.toISOString() });

    expect(screen.getByText('2 days ago')).toBeInTheDocument();
  });

  test('formats date correctly if older than one month', () => {
    const oldDate = new Date();
    oldDate.setMonth(oldDate.getMonth() - 2);
    (format as jest.Mock).mockReturnValue('20 September 2024');
    renderComponent({ ...article, date: oldDate.toISOString() });

    expect(screen.getByText('20 September 2024')).toBeInTheDocument();
  });

  test('uses author avatar', () => {
    renderComponent();

    const authorImage = screen.getByAltText('author') as HTMLImageElement;
    expect(authorImage.src).toContain('avatar.png');
  });

  test('navigates to author page when author link is clicked', () => {
    renderComponent();

    const authorLink = screen.getByText('Vasya Stecenko').closest('a');
    expect(authorLink).toHaveAttribute('href', '/author/vasya');
  });
});
