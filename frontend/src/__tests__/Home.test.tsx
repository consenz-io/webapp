import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Home } from 'pages';
import { createContext } from 'react';
import { IDataContext } from 'types/contexts';

// const mocks = [
//   {
//     request: {
//       query: GET_DOG_QUERY,
//       variables: {
//         name: 'Buck',
//       },
//     },
//     result: {
//       data: {
//         dog: { id: '1', name: 'Buck', breed: 'bulldog' },
//       },
//     },
//   },
// ];

// import { IDataContext } from 'types/contexts';

const DataContext = createContext<IDataContext>({});

// function renderHome(user: IUser | null) {
//   return render(
//     <DataContext.Provider value={{ user }}>
//       <Home />
//     </DataContext.Provider>
//   );
// }
// jest.mock('react-i18next', () => ({
//   // this mock makes sure any components using the translate hook can use it without a warning being shown
//   useTranslation: () => {
//     return {
//       t: (str: string) => str,
//       i18n: {
//         changeLanguage: () => new Promise(() => {}),
//       },
//     };
//   },
// }));

// describe('<Home />', () => {
//   describe('no user found', () => {
it('should show loader', () => {
  render(
    <DataContext.Provider value={{ user: { id: 4, email: 'nadav@sofi.coop' } }}>
      <Home />
    </DataContext.Provider>
  );
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});
//   });

//   // it('should redirect to welcome route when existing user has no groups', () => {
//   //   render(
//   //     <DataContext.Provider value={{ user: { id: 4, email: 'nadav@sofi.coop' } }}>
//   //       <Home />
//   //     </DataContext.Provider>
//   //   );
//   //   expect(screen.getByText('ברוכים הבאים לקונסנז!')).toBeInTheDocument();
//   // });
// });
