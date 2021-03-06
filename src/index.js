import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import api from './services/api'
//View: container div do html, asider, header,footer
//Text: p, span, strong, h1,h2,h3
//Não possuem valor semantico
//Não possuem estilização propria
//
export default function App() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
            console.log(response.data)
        })
    }, [])

   async function handleAddProject(){
        const response = await api.post('projects',{
            title: `Novo projeto${Date.now()}`,
            owner: "Caio"
        })

        const project = response.data

        setProjects([...projects,project])
    }
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <SafeAreaView style={styles.container}>
                <FlatList data={projects} keyExtractor={project => project.id} renderItem={({ item: project }) => (
                    <Text style={styles.project}>{project.title}</Text>
                )} />
            <TouchableOpacity style={styles.button} onPress={handleAddProject}>
                <Text style={styles.buttonText}>Adicionar projeto</Text>
            </TouchableOpacity>
            </SafeAreaView>

            { /*<View style={styles.container}>
        {projects.map(project => (
        <Text key={project.id} style={styles.project}>{project.title}</Text>))}
        </View>*/}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',


    },
    title: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    project: {
        color: '#FFF',
        fontSize: 30
    },
    button:{
        backgroundColor:'#FFF',
        margin: 20,
        height: 50,
        borderRadius:4,
        justifyContent:"center",
        alignItems:'center'

    },
    buttonText:{
        fontWeight:'bold',
        fontSize:16
    }
})