<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Consulta Front</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>


      <form @submit.prevent="salvar">

          <label>Data da Consulta</label>
          <input type="text" placeholder="Data" v-model="consulta.data" >
          <label>Status</label>
          <input type="number" placeholder="Status" v-model="consulta.status" >
          

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>DATA</th>
            <th>STATUS</th>
           
          </tr>

        </thead>

        <tbody>

          <tr v-for="consulta of consultas" :key="consulta.id">

            <td>{{ consulta.dataConsulta }}</td>
            <td>{{ consulta.status }}</td>
          
            <td>
              <button @click="editar(consulta)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(consulta)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Consulta from './services/consultas'

export default {
  name: 'app',
  data () {
    return {
      consulta:{
        id: '',
        dataConsulta: '',
        status: ''
       
      },
      consultas: [],
      errors: []
    }
  },

  mounted(){
    this.listar()
  },

  methods:{
    
    listar(){
      Consulta.listar().then(resposta => {
        this.consultas = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar(){

      if(!this.consulta.id){

        Consulta.salvar(this.consulta).then(resposta => {
          this.consulta = {}
          alert('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }else{

        Consulta.atualizar(this.consulta).then(resposta => {
          this.consulta = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }
      

    },

    editar(consulta){
      this.consulta = consulta
    },

    remover(consulta){

      if(confirm('Deseja excluir a consulta?')){

        Consulta.apagar(consulta).then(resposta => {
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }

    }
  }

}
</script>

<style>



</style>
