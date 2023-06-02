import { HistoryRouter } from 'redux-first-history/rr6';
import { Provider } from 'react-redux';
import {
  AuthenticationProvider,
  AuthenticationSecure,
} from '@oliasoft/authentication/pkce';
import { useRoutes } from 'react-router-dom';
import '../internationalisation/i18n';
import { store, history } from 'client/store/configureStore';
import { routes } from 'client/views/navigation/routes/routes';
import { TopBar } from 'client/views/navigation/top-bar/top-bar';
import { ProjectSideBar } from 'client/views/navigation/project-side-bar/project-side-bar';
import { Overview } from 'client/views/overview/overview';
import { Example } from 'client/views/example/example';
import '@oliasoft-open-source/react-ui-library/dist/global.css';
import ClientConfig from '../config';

const Views = () =>
  useRoutes([
    ...[routes.root.pattern.path, routes.overview.pattern.path].map((path) => ({
      path,
      element: <Overview />,
    })),
    { path: routes.example.pattern.path, element: <Example /> },
  ]);

const App = () => {
  return (
    <Provider store={store}>
      <AuthenticationProvider
        history={history}
        idpServerUrl={ClientConfig.config.idpServerUrl}
        hostBaseUrl={ClientConfig.config.hostBaseUrl}
        clientId={ClientConfig.config.applicationId}
        userManagerSettings={{
          checkSessionIntervalInSeconds: 5,
          monitorSession: false,
          scope: 'openid profile intranet-api',
        }}
      >
        <HistoryRouter history={history}>
          <AuthenticationSecure>
            <TopBar />
            <ProjectSideBar />
            <Views />
          </AuthenticationSecure>
        </HistoryRouter>
      </AuthenticationProvider>
    </Provider>
  );
};

export default App;
