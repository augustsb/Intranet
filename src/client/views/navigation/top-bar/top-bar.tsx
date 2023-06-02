import {
  TopBar as TopBarBase,
  Button,
} from '@oliasoft-open-source/react-ui-library';
import { useAuth } from '@oliasoft/authentication/pkce';
import Logo from './logo.png';

export const TopBar = () => {
  const auth = useAuth();
  const handleLogout = async () => {
    await auth.signoutRedirect({
      id_token_hint: auth?.user?.id_token,
      state: {
        last_url: window.location.pathname,
      },
    });
  };
  return (
    <TopBarBase
      title={{
        logo: <img src={Logo} alt="logo" />,
        onClick: () => undefined,
      }}
      contentRight={[
        ...(auth?.isAuthenticated
          ? [
              {
                component: (
                  <Button pill label="Log out" onClick={handleLogout} />
                ),
                type: 'Component',
              },
            ]
          : []),
      ]}
    />
  );
};
