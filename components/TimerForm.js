import React,{useState} from 'react'
import {Text, View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import TimerButton from './TimerButton'
import uuidv4 from 'uuid/v4'
export default function TimerForm(props){
    const submitText=props.id?'Update':'Create'
    const [title, setTitle]=useState(props.id?props.title:'')
    const [project, setProject]=useState(props.id?props.project:'')
    const handleTitleChange=title=>{
        setTitle(title)
    }
    const handleProjectChange=project=>{
        setProject(project)
    }
    const handleSubmit=()=>{
        props.onFormSubmit({
            id:props.id?props.id:'',
            title:title,
            project:project,
            isRunning:false
          })
    }
    return(
        <View style={styles.formContainer}>
            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Title</Text>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} onChangeText={handleTitleChange.bind(this)} underlineColorAndroid="transparent" value={title}/>
                </View>
            </View>
            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Project</Text>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput}onChangeText={handleProjectChange.bind(this)} underlineColorAndroid="transparent" value={project}/>
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <TimerButton small color="#21BA45" title={submitText} onPress={handleSubmit}/>
                <TimerButton small color="#DB2828" title="Cancel" onPress={props.onFormClose}/>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    formContainer:{
         backgroundColor: 'white',
         borderColor:'#D6D7DA',
         borderWidth:2,
         borderRadius:10,
         padding:15,
         margin:15,
         marginBottom:0
    },
    attributeContainer:{
        marginVertical:8
    },
    textInputContainer:{
        borderColor:'#D6D7DA',
        borderRadius:2,
        borderWidth:1,
        marginBottom:5
    },
    textInput:{
        height:30,
        padding:5,
        fontSize:12
    },
    textInputTitle:{
        fontSize:14,
        fontWeight:'bold',
        marginBottom:5
    },
    buttonGroup:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
})