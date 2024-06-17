import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { supabase } from './conexaoSupabase';

export default function App() {
  const [tituloDigitado, setTituloDigitado] = useState("");
  const [autorDigitado, setAutorDigitado] = useState("");
  const [quantidadeDigitada, setQuantidadeDigitado] = useState("");
  const [categoriaDigitada, setCategoriaDigitado] = useState("");
  const [dados, setDados] = useState([]);


  // função para consultar os dados no Banco de Dados
  const consultarDados  = async() =>{
    const{data, error} = await supabase.from('tb_livros').select('*')

    if(error){
        alert('Falha ao consultar os dados!')
    }else{
        setDados(data);

    }
  }


  // Criar uma função para inserir no Banco de dados
  const cadastrarConta = async(desc, au, qtd, cat)=>{
    if(desc == '' || au ==  '' || qtd == '' || cat == '' ){
        alert('Preeencha todos os campos')
    }else{

      const {error} = await supabase.from("tb_livros")
      .insert({coluna_titulo: desc, coluna_autor: au, coluna_quantidade: qtd, coluna_categoria: cat});

      if(error){
        alert("Falha ao cadastrar!")
      }else{
        alert("Cadastrado com sucesso!")
        consultarDados()
      }
  }

  }
  
  useEffect(() => {
    consultarDados();
  }, []);



  return (
    <View style={styles.container}>
      
      <Text style={{fontSize: 35, fontWeight: 700}}>Livros</Text>
      <TextInput
        style={styles.caixaDeTexto}
        placeholder='Titulo'
        onChangeText={(texto)=>setTituloDigitado(texto)}
      />
      <TextInput
        style={styles.caixaDeTexto}
        placeholder='Autor'
        onChangeText={(texto)=>setAutorDigitado(texto)}
      />

        <TextInput
        style={styles.caixaDeTexto}
        placeholder='Quantidade do produto'
        onChangeText={(texto)=>setQuantidadeDigitado(texto)}
      />
        <TextInput
        style={styles.caixaDeTexto}
        placeholder='Categoria'
        onChangeText={(texto)=>setCategoriaDigitado(texto)}
      />
      <Button
        title="Cadastrar"
        onPress={()=>{cadastrarConta(tituloDigitado, autorDigitado, quantidadeDigitada, categoriaDigitada)}}
      />
      <ScrollView style={{width: "100%"}}>
        
          {dados.map((item)=>(
          <View style={styles.caixaContas}>
            <Text>Titulo: {item.coluna_titulo}</Text>
            <Text>Autor: {item.coluna_autor}</Text>
            <Text>Quantidade: {item.coluna_quantidade}</Text>
            <Text>Categoria: {item.coluna_categoria}</Text>

          </View> 
          ))}
      </ScrollView>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  caixaDeTexto:{
    borderWidth: 1,
    width: "90%",
    padding: 10,
    margin: 15,
    borderRadius: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
  },
  caixaContas:{
    width: '90%',
    minHeight: 70,
    borderWidth: 1,
    borderCoor: '#b2b2b2',
    droderRadius: 8,
    margin: 30,
    padding: 10


  }
});