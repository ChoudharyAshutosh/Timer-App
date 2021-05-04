import React,{useState} from 'react';
import TimerForm from './TimerForm';
import Timer from './Timer'
export default function EditableTimer({id, title, project, elapsed, isRunning, onFormSubmit, onRemovePress, onStartPress, onStopPress}){
    const [editFormOpen, setEditFormOpen]=useState(false)
//    const {id, title, project, elapsed, isRunning}=props;
    const handleEditPress=()=>{
        setEditFormOpen(true)
    }
    const handleFormClose=()=>{
        setEditFormOpen(false)
    }
    const handleSubmit=timer=>{
        onFormSubmit(timer)
        setEditFormOpen(false)
    }
    if(editFormOpen)
        return <TimerForm id={id} title={title} project={project} onFormSubmit={handleSubmit} onFormClose={handleFormClose}/>
    return <Timer id={id} title={title} project={project} elapsed={elapsed} isRunning={isRunning} onEditPress={handleEditPress} onRemovePress={onRemovePress} onStartPress={onStartPress} onStopPress={onStopPress}/>
}