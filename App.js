import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [editingTask, setEditingTask] = useState("");

  const handleAddTask = () => {
    if (task) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask("");
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const editTask = (index) => {
    setCurrentTaskIndex(index);
    setEditingTask(taskItems[index]);
    setModalVisible(true);
  };

  const saveTask = () => {
    if (currentTaskIndex !== null) {
      let itemsCopy = [...taskItems];
      itemsCopy[currentTaskIndex] = editingTask;
      setTaskItems(itemsCopy);
      setModalVisible(false);
      setCurrentTaskIndex(null);
      setEditingTask("");
    }
  };

  const filteredTasks = taskItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>To Do List</Text>

          {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search tasks..."
            placeholderTextColor="#B0B0B0"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />

          {/* Task List */}
          <View style={styles.items}>
            {filteredTasks.map((item, index) => (
              <Task
                key={index}
                text={item}
                onDelete={() => completeTask(taskItems.indexOf(item))}
                onEdit={() => editTask(taskItems.indexOf(item))}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Task Input Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Modal for Editing */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              value={editingTask}
              onChangeText={(text) => setEditingTask(text)}
            />
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={saveTask} color="#4A90E2" />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Space for the input field and button
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  items: {
    marginTop: 20,
  },
  searchBar: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginVertical: 10,
    fontSize: 16,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#E8EAED",
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginRight: 10,
    fontSize: 16,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#4A90E2",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    elevation: 5,
  },
  modalInput: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
