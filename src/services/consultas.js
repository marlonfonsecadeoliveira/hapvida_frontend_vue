import { http } from './config'


export default	{

	salvar:(consulta)=>{
		return http.post('consulta',consulta);
  },
    
	atualizar:(consulta)=>{
		return http.put('consulta',consulta);
  },

  listar:()=>{
		return http.get('consultas')
  },
    
	apagar:(consulta)=>{
		return http.delete('consulta', { data: consulta })
	}
}