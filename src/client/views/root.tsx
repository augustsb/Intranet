import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '@oliasoft-open-source/react-ui-library/dist/global.css';
import WithRuntimeConfig from 'client/views/hoc/with-runtime-config';
import App from './app';

const Root = () => {
  return (
    <WithRuntimeConfig>
      <App />
    </WithRuntimeConfig>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
