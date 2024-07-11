import { useCallback, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";

const getAnswerBgColor = (pressed, active) => {
  if (pressed) {
    return "rgb(210, 230, 255)";
  }
  return active ? "rgb(210, 255, 230)" : "white";
};

const createBlankAnswers = (question) =>
  new Array(question.answers.length).fill(null);

function Question({ question, answers, toggleAnswer }) {
  // const toggleAnswer = (index) => {
  //   console.log("toggle", index);
  //   setAnswers((prev) => prev.map((a, i) => (i === index ? !a : a)));
  // };
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
                backgroundColor: getAnswerBgColor(pressed, answers[index]),
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

export default function Quiz({ questions }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(questions.map(createBlankAnswers));
  const toggleQuestionAnswer = useCallback(
    (ansIndex) =>
      setAnswers((prevAnswers) =>
        prevAnswers.map((ans, queIndex) =>
          queIndex !== questionIndex
            ? ans
            : ans.map((a, ai) => (ai !== ansIndex ? a : !a)),
        ),
      ),
    [questionIndex],
  );

  const onPressPrev = () => setQuestionIndex((i) => i - 1);
  const onPressNext = () => setQuestionIndex((i) => i + 1);
  return (
    <View style={styles.container}>
      {/* NOW NEED CHANGING SETANSWERS */}
      <Question
        question={questions[questionIndex]}
        answers={answers[questionIndex]}
        toggleAnswer={toggleQuestionAnswer}
      />

      <View style={styles.navButtons}>
        <Button
          title="prev"
          onPress={onPressPrev}
          disabled={questionIndex === 0}
        />
        <Button
          title="next"
          onPress={onPressNext}
          disabled={questionIndex === questions.length - 1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  question: {
    height: "80%",
  },
  questionTitle: {
    fontWeight: "bold",
  },
  navButtons: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
