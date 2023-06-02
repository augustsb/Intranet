import { JSX, useEffect, useState } from 'react';
import axios from 'axios';

type WithRuntimeConfigProps = {
  children: JSX.Element;
};
const WithRuntimeConfig = (props: WithRuntimeConfigProps): JSX.Element => {
  const { children } = props;
  const [runtimeLoaded, setRuntimeLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/runtimeConfigStatic.js');
      window.__runtimeConfigStatic = data;
      setRuntimeLoaded(true);
    })();
  }, []);

  if (!runtimeLoaded) {
    return <div />;
  }

  return children;
};

export default WithRuntimeConfig;
