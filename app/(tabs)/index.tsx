import React, { useState } from 'react';
import { Image, StyleSheet, Platform, TextInput, Button, FlatList, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Task = {
  id: number;
  title: string;
  date: string;
  priority: string;
  status: string;
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('low');

  const addTask = () => {
    if (title && date) {  
      const newTask: Task = {
        id: tasks.length + 1,
        title,
        date,
        priority,
        status: 'to-do',
      };
      setTasks((prevTasks) => [...prevTasks, newTask]); 
      setTitle('');
      setDate('');
      setPriority('low');
    } else {
      console.log("Please fill in all fields");
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <ThemedText type="title">{item.title}</ThemedText>
      <ThemedText>Дата: {item.date}</ThemedText>
      <ThemedText>Пріоритет: {item.priority}</ThemedText>
      <ThemedText>Статус: {item.status}</ThemedText>
    </View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>


      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle">Create New Task</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
        />
        <ThemedText type="subtitle">Priority</ThemedText>
        <View style={styles.pickerContainer}>
          <Button title="Low" onPress={() => setPriority('low')} />
          <Button title="Medium" onPress={() => setPriority('medium')} />
          <Button title="High" onPress={() => setPriority('high')} />
        </View>
        <Button title="Add Task" onPress={addTask} />
      </ThemedView>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()} 
        style={styles.taskList}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  formContainer: {
    gap: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  taskContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  taskList: {
    marginTop: 20,
  },
});
