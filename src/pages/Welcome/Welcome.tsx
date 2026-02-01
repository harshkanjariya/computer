import {useEffect} from 'react';
import Header from '../../components/Header/Header';
import Typing from '../../components/Welcome/Typing/Typing';
import {useLocation, useNavigate} from 'react-router-dom';
import {routes} from '../../core/router';

const messageList = [
  'Hello!',
  'I\'m Harsh Kanjariya.',
  'Welcome to my portfolio.',
];


function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash.length) {
      // Always navigate to Windows by default
      navigate(routes.windows);
    }
  }, []);

  let CenterComponent;
  if (location.hash === '') {
    // Navigate directly to Windows
    navigate(routes.windows);
    return null;
  } else if (location.hash == '#typing') {
    CenterComponent = <Typing
      messageList={location.state?.messageList || ['Here\'s my life,\n if it was windows.']}
      onEnd={() => navigate(location.state?.navigate || routes.windows)}
    />;
  } else if (location.hash == '#welcome') {
    CenterComponent = <Typing
      messageList={messageList}
      onEnd={() => navigate(routes.windows)}
    />;
  }

  return <>
    <Header/>
    {CenterComponent}
  </>;
}

export default Welcome;
