import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Page,
  Card,
  Heading,
  Loader,
  Spinner,
  Text,
} from '@oliasoft-open-source/react-ui-library';
import { getExampleMessage } from 'client/store/entities/example/example';

type ConnectedExampleProps = {
  message: string;
  isLoading: boolean;
  getExampleMessage: Function;
};

export const ConnectedExample = ({
  message,
  isLoading,
  getExampleMessage,
}: ConnectedExampleProps) => {
  useEffect(() => {
    getExampleMessage();
  }, []);
  return (
    <Page scroll={false}>
      <Card
        heading={
          <Heading>Example page (loading message from database)</Heading>
        }
      >
        {isLoading ? (
          <Loader height="100%" text="Loading..." theme="light" width="100%">
            <Spinner dark />
          </Loader>
        ) : (
          <Text>Message from server database: {message}</Text>
        )}
      </Card>
    </Page>
  );
};

// @ts-ignore
const mapStateToProps = ({ entities }) => ({
  message: entities?.example?.message,
  isLoading: entities?.example?.isLoading,
});

const mapDispatchToProps = {
  getExampleMessage,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedExample);

export { Container as Example };
