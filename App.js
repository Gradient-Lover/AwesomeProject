import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  ImageBackground,
} from "react-native";

export default function App() {
  const [clicked, setClicked] = useState(0);
  const [timer, setTimer] = useState(5);
  const [cps, setCps] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showGo, setShowGo] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);

  const increaseCount = () => {
    if (isRunning) {
      setClicked(clicked + 1);
    }
  };

  const startCountdown = () => {
    let count = 3;
    setCountdown(count);

    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);

      if (count === 0) {
        clearInterval(countdownInterval);
        setShowGo(true);
        setIsRunning(true);
        setTimer(5);
        setTimeout(() => {
          setShowGo(false);
        }, 1000);
      }
    }, 1000);
  };

  const handleStart = () => {
    setClicked(0);
    startCountdown();
  };

  const handleReset = () => {
    setClicked(0);
    setTimer(5);
    setCps(0);
    setIsRunning(false);
    setShowGo(false);
    setShowStartModal(true);
  };

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsRunning(false);
      setCps((clicked / 10).toFixed(2));
    }

    return () => clearInterval(interval);
  }, [timer, isRunning]);

  return (
    <View style={styles.container}>
      {cps > 0 ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Clicks: {clicked}</Text>
          <Text style={styles.resultText}>CPS: {cps}</Text>
          <Button onPress={handleReset} title="⬅Reset" style={styles.button} />
        </View>
      ) : (
        <>
          {countdown > 0 ? (
            <Text style={styles.countdown}>{countdown}</Text>
          ) : (
            <>
              {showGo ? (
                <Text style={styles.countdown}>GO!</Text>
              ) : (
                <>
                  <Text style={styles.title}>
                    🚀 Clicks Per Second Calculator 🚀
                  </Text>
                  {isRunning ? (
                    <View style={styles.gameContainer}>
                      <Text style={styles.timer}>
                        ⏳ Time left: {timer} seconds ⏳
                      </Text>
                      <Text style={styles.clicked}>Clicks: {clicked}</Text>
                      <Button
                        onPress={increaseCount}
                        title="Click Me"
                        style={styles.bigButton}
                      />
                    </View>
                  ) : (
                    <Modal isVisible={showStartModal}>
                      <View style={styles.startContainer}>
                        <Text style={styles.welcomeText}>
                          Welcome to Clicks Per Second Calculator!
                        </Text>
                        <Button
                          onPress={handleStart}
                          title="Start"
                          style={styles.button}
                        />
                      </View>
                    </Modal>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #FF00FF, #00FFFF)",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "purple",
  },
  gameContainer: {
    alignItems: "center",
    border: "5px dashed #FF00FF",
    padding: 20,
    borderRadius: 20,
    background: "linear-gradient(to right, #00FFFF, #FFFF00)",
  },
  startContainer: {
    marginBottom: 20,
  },
  timer: {
    fontSize: 24,
    marginBottom: 10,
    color: "#FF4500",
  },
  clicked: {
    fontSize: 24,
    marginBottom: 10,
    color: "green",
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF00FF",
  },
  countdown: {
    fontSize: 72,
    fontWeight: "bold",
    color: "red",
  },
  welcomeText: {
    fontSize: 18,
    marginTop: 300,
    margin: 1,
    color: "blue",
    textAlign: "center",
  },
  bigButton: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "pink",
    border: "5px solid black",
    padding: 10,
    borderRadius: 10,
  },
  button: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "green",
    border: "5px solid black",
    padding: 10,
    borderRadius: 10,
  },
});
