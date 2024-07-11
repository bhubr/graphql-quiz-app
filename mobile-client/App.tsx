import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";

import Quiz from "./src/components/Quiz";
import { questions } from "./src/questions";

const GET_QUIZZES = gql`
  query QuizzesQuery {
    quizzes {
      id
      title
      questions {
        id
        title
        answers {
          id
          text
          correct
        }
      }
    }
  }
`;

const client = new ApolloClient({
  uri: "http://192.168.1.183:4000/",
  cache: new InMemoryCache(),
});

function App() {
  const { loading, error, data } = useQuery(GET_QUIZZES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error! {error.message}</Text>;

  // console.log(data.quizzes[0]);
  return (
    <View style={styles.container}>
      <Quiz questions={data.quizzes[0].questions} />
      <StatusBar style="auto" />
    </View>
  );
}

export default function WrappedApp() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
