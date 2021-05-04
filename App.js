import { StatusBar } from 'expo-status-bar';
import uuidv4 from 'uuid/v4'
import React,{useState,useEffect, useRef} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ToggleLableTimerForm from './components/ToggleLableTimerForm';
import EditableTimer from './components/EditableTimer'
import { newTimer } from './utils/TimerUtils';
export default function App() {
  let intervalRef=useRef()
  const update=()=>{
    let timersAar=timers
    setTimers(timersAar.map((timer)=>{
                const {elapsed, isRunning}=timer
                return {...timer, elapsed:isRunning?elapsed+1000:elapsed}
              }))
    }
  const [timers, setTimers]=useState([])
  useEffect(()=>{
    intervalRef.current=setInterval(update,1000)
    return ()=>clearInterval(intervalRef.current)
  },[timers])
  const handleCreateFormSubmit=timer=>{
    let timersAar=timers
    setTimers([newTimer(timer),...timersAar])
  }
  const handleFormSubmit=(attrs)=>{
    let timersAar=timers
    setTimers(
      timersAar.map(timer=>{
        if(timer.id===attrs.id){
          const {title, project}=attrs
          return {...timer, title, project}
        }
        return  timer
      })
    )
  }
  const handleRemovePress=(timerId)=>{
    setTimers(timers.filter(timer=>timer.id!==timerId))
  }
  const toggleTimer=timerId=>{
    let timersArr=timers
    setTimers(timersArr.map(timer=>{
      const {id, isRunning}=timer
      if(id===timerId)
       return {...timer, isRunning:!isRunning}
      return timer
    }))
  }
  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>
      <ScrollView style={styles.timerList}>
        <ToggleLableTimerForm onFormSubmit={handleCreateFormSubmit}></ToggleLableTimerForm>
        {
          timers.map(({title, project, id, elapsed, isRunning})=>(
            <EditableTimer key={id} id={id} title={title} project={project} elapsed={elapsed} isRunning={isRunning} onFormSubmit={handleFormSubmit} onRemovePress={handleRemovePress} onStartPress={toggleTimer} onStopPress={toggleTimer}/>
          ))
        }
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer:{
    flex:1
  },
  titleContainer:{
    paddingTop:35,
    paddingBottom:15,
    borderBottomWidth:1,
    borderBottomColor:'#D6D7DA'
  },
  title:{
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center'
  },
  timerList:{
    paddingBottom:15
  }
});
