import { useState } from "react";
import { FlatList, Pressable, Text, View, StyleSheet } from "react-native";

const questions = [
  {
    title: "How to create a new branch with Git?",
    answers: [
      {
        text: "git checkout -b <branch>",
        correct: true,
      },
      {
        text: "git create <branch>",
        correct: false,
      },
      {
        text: "git branch <branch>",
        correct: true,
      },
      {
        text: "git switch -c <branch>",
        correct: true,
      },
    ],
  },
  {
    title: "How to rename a branch?",
    answers: [
      {
        text: "git rename <oldbranch> <newbranch>",
        correct: false,
      },
      {
        text: "git branch -m <newbranch>",
        correct: true,
      },
    ],
  },
];

const createBlankAnswers = (question) =>
  new Array(question.answers.length).fill(null);

function Question({ question }) {
  const [answers, setAnswers] = useState(createBlankAnswers(question));

  const toggleAnswer = (index) => {
    console.log("toggle", index);
    setAnswers((prev) => prev.map((a, i) => (i === index ? !a : a)));
  };
  return (
    <View style={styles.question}>
      <Text style={styles.questionTitle}>{question.title}</Text>
      <Text>{JSON.stringify(answers)}</Text>
      <FlatList
        data={question.answers}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => toggleAnswer(index)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
              },
            ]}
          >
            <Text>{item.text}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.text}
      />
    </View>
  );
}

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  return (
    <View style={styles.container}>
      <Question question={questions[questionIndex]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  questionTitle: {
    fontWeight: "bold",
  },
});
